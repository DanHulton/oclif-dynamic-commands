import { join } from 'node:path';
import { Hook, Command } from '@oclif/core';
import { glob } from 'glob';
import { readJsonSync } from 'fs-extra';
import get from 'lodash/get';
import { uniq } from 'lodash';
import { Topic } from '@oclif/core/lib/interfaces';

/**
 * Identify if a potential command is an oclif Command.
 *
 * Cannot rely on `instanceof`, as `Command` base object from another
 * project will not be the same as the one from this one.
 *
 * @param potentialCommand - The potential command to check.
 *
 * @return If the object is an oclif Command.
 */
function isCommand(potentialCommand: any): boolean {
  let obj = potentialCommand;
  let objName = obj.name;
  let recurseCount = 99;

  while (recurseCount > 0 && obj !== null) {
    objName = obj.name;

    if (objName === Command.name) {
      return true;
    }

    recurseCount++;
    obj = Object.getPrototypeOf(obj);
  }

  return false;
}

/**
 * A valid command must have an id, summary, description and run function.
 *
 * @param ctx - Oclif context.  Used for logging.
 * @param potentialCommand - The command to examine.
 *
 * @return If the provided object is a valid oclif command.
 */
function isValidCommand(ctx: Hook.Context, potentialCommand: any): boolean {
  if (isCommand(potentialCommand)) {
    if (! (typeof potentialCommand.id === 'string')) {
      ctx.warn(`Command '${potentialCommand.name}' is missing static property "id".`);
      return false;
    }

    if (! (typeof potentialCommand.summary === 'string')) {
      ctx.warn(`Command '${potentialCommand.name}' is missing static property "summary".`);
      return false;
    }

    if (! (typeof potentialCommand.description === 'string')) {
      ctx.warn(`Command '${potentialCommand.name}' is missing static property "description".`);
      return false;
    }

    if (! (typeof potentialCommand.run === 'function')) {
      ctx.warn(`Command '${potentialCommand.name}' is missing function "run".`);
      return false;
    }

    return true;
  }

  return false;
}

/**
 * Load dynamic oclif commands from provided folders.
 *
 * @param ctx - Oclif context.  Used for logging.
 * @param folders - The list of folders to load commands from.
 *
 * @return - The commands and topics loaded from provided folders.
 */
const loadCommands = async function (
  ctx: Hook.Context,
  folders: string[],
): Promise<{
  commands: Command.Loadable[],
  topics: Topic[]
}> {
  const topicSeparator = get(ctx.config.pjson, 'oclif.topicSeparator', ':');
  const commands: Record<string, Command.Loadable> = {};
  const topicNames: string[] = [];

  // Iterate through all commandFolders in order, so commands from later
  // folders overwrite earlier ones
  await Promise.all(folders.map(async folder => {
    ctx.debug(`Searching for command files in '${folder}'...`);

    // Iterate through all potential command files in folder
    await Promise.all((await glob(folder)).map(async file => {
      const fullFilename = join(process.cwd(), file);
      ctx.debug(`Trying to find commands in '${fullFilename}'...`);

      // Iterate through all objects in imported file
      const imported = await import(fullFilename);
      for (const key of Object.keys(imported)) {
        if (isValidCommand(ctx, imported[key])) {
          // Save valid command
          commands[imported[key].id] = buildCommandLoader(imported[key]);

          // Save topic name
          if (imported[key].id.includes(topicSeparator)) {
            topicNames.push(imported[key].id.split(topicSeparator)[0]);
          }
        }
      }
    }));
  }));

  return {
    commands: Object.values(commands),
    topics: buildTopics(uniq(topicNames)),
  };
};

/**
 * Build a Command Loader from a Command.
 *
 * @param command - The command to build the loader from.
 *
 * @return The Command Loader.
 */
const buildCommandLoader = function (command: Command.Class): Command.Loadable {
  return {
    id: command.id,
    summary: command.summary,
    description: command.description,
    hidden: command.hidden,
    state: command.state,
    deprecationOptions: command.deprecationOptions,
    deprecateAliases: command.deprecateAliases,
    usage: command.usage,
    help: command.help,
    aliases: command.aliases,
    strict: command.strict,
    args: command.args,
    flags: command.flags,
    examples: command.examples,
    async load(): Promise<Command.Class> {
      return command;
    },
    pluginType: 'user',
  };
};

/**
 * Build a list of Topics from topic names.
 * Include description from package.json, if one is set.
 *
 * @param names - The names of the Topics to build.
 *
 * @return The Topics.
 */
const buildTopics = function (names: string[]): Topic[] {
  const packageJson = readJsonSync(join(process.cwd(), './package.json'));

  const topics: Topic[] = [];

  for (const name of names) {
    topics.push({
      name,
      description: get(packageJson, `oclif.topics.${name}.description`, ''),
    });
  }

  return topics;
};

/**
 * Run the hook.
 *
 * @return void
 */
const hook: Hook<'init'> = async function () {
  const packageJson = readJsonSync(join(process.cwd(), './package.json'));
  const commandFolders = get(packageJson, 'oclif.dynamic-commands.folders', []);

  const { commands, topics } = await loadCommands(this, commandFolders);

  (this.config as any).loadCommands({ commands, topics });
  (this.config as any).loadTopics({ commands, topics });
};

export default hook;
