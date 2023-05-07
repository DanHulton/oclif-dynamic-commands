import { join } from 'node:path';
import { Hook, Command } from '@oclif/core';
import { glob } from 'glob';
import { readJsonSync } from 'fs-extra';
import get from 'lodash/get';

/**
 * A valid command must have an id, summary, description and run function.
 *
 * @param ctx - Oclif context.  Used for logging.
 * @param potentialCommand - The command to examine.
 *
 * @return If the provided object is a valid oclif command.
 */
function isValidCommand(ctx: Hook.Context, potentialCommand: any): boolean {
  // Cannot rely on `instanceof`, as `Command` base object from another
  // project will not be the same as the one from this one.
  if (Object.getPrototypeOf(potentialCommand).name === Command.name) {
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
 * Check all command IDs and ensure it is either a "root" command (has no topic
 * separator), or a root command exists for it.
 *
 * @param ctx - Oclif context.  Used for logging.
 * @param roots - The command roots to check against.
 * @param ids - The command IDs to check.
 *
 * @return void
 */
function checkIdRoots(ctx: Hook.Context, roots: string[], ids: string[]): void {
  const topicSeparator = get(ctx.config.pjson, 'oclif.topicSeparator', ':');

  ids.filter(id => id.includes(topicSeparator))
  .filter(id => ! roots.includes(id.split(topicSeparator)[0]))
  .forEach(id => ctx.warn(`Could not find root command for '${id}'.`));
}

/**
 * Load dynamic oclif commands from provided folders.
 *
 * @param ctx - Oclif context.  Used for logging.
 * @param folders - The list of folders to load commands from.
 *
 * @return - The list of commands loaded from provided folders.
 */
const loadCommands = async function (ctx: Hook.Context, folders: string[]): Promise<Command.Class[]> {
  const topicSeparator = get(ctx.config.pjson, 'oclif.topicSeparator', ':');
  const commands: Record<string, Command.Class> = {};
  const foundRoots: string[] = [];

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
          commands[imported[key].id] = imported[key];

          // If root command, save for root ID verification
          if (! imported[key].id.includes(topicSeparator)) {
            foundRoots.push(imported[key].id);
          }
        }
      }
    }));
  }));

  checkIdRoots(ctx, foundRoots, Object.keys(commands));

  return Object.values(commands);
};

const buildLoaders = async function (ctx: Hook.Context, commands: Command.Class[]): Promise<Command.Loadable[]> {
  const loaders: Command.Loadable[] = [];

  for (const command of commands) {
    loaders.push({
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
    });
  }

  return loaders;
};

const hook: Hook<'init'> = async function () {
  const packageJson = readJsonSync(join(process.cwd(), './package.json'));
  const commandFolders = get(packageJson, 'oclif.dynamic-commands.folders', []);

  const commands = await loadCommands(this, commandFolders);
  const loaders = await buildLoaders(this, commands);

  (this.config as any).loadCommands({
    commands: loaders,
    topics: [],
  });
};

export default hook;
