import {
  Hook,
  Command,
} from '@oclif/core';

class DefCommand extends Command {
  static id = 'def'

  static summary = 'Def Command summary';
  static description = 'Def Command description';

  async run() {
    this.log('Def command output');
  }
}

class TestCommand extends Command {
  static id = 'def:testcommand'

  static summary = 'Test Command summary';
  static description = 'Test Command description';

  async run() {
    this.log('Test command output');
  }
}

const testCommandLoader: Command.Loadable = {
  id: TestCommand.id,
  summary: TestCommand.summary,
  description: TestCommand.description,
  hidden: TestCommand.hidden,
  state: TestCommand.state,
  deprecationOptions: TestCommand.deprecationOptions,
  deprecateAliases: TestCommand.deprecateAliases,
  usage: TestCommand.usage,
  help: TestCommand.help,
  aliases: TestCommand.aliases,
  strict: TestCommand.strict,
  args: TestCommand.args,
  flags: TestCommand.flags,
  examples: TestCommand.examples,
  async load(): Promise<Command.Class> {
    return TestCommand;
  },
  pluginType: 'user',
};

const defCommandLoader: Command.Loadable = {
  id: DefCommand.id,
  summary: DefCommand.summary,
  description: DefCommand.description,
  hidden: DefCommand.hidden,
  state: DefCommand.state,
  deprecationOptions: DefCommand.deprecationOptions,
  deprecateAliases: DefCommand.deprecateAliases,
  usage: DefCommand.usage,
  help: DefCommand.help,
  aliases: DefCommand.aliases,
  strict: DefCommand.strict,
  args: DefCommand.args,
  flags: DefCommand.flags,
  examples: DefCommand.examples,
  async load(): Promise<Command.Class> {
    return DefCommand;
  },
  pluginType: 'user',
};

const hook: Hook<'init'> = async function () {
  const commands: Command[] = [];
  const loaders: Command.Loadable[] = [];

  // Get a list of all files matching ./(wood|app)/**/cli/commands/**/*.ts
  // Iterate through each file
  // Import all
  // Iterate through all imports
  // If command, add to list of commands/loaders

  // Check commands for "child" commands without parents
  // (split on ":", make sure full path of command is present in root/sub commands)
  // Log.warn if any aren't set.

  loaders.push(testCommandLoader, defCommandLoader);

  (this.config as any).loadCommands({
    commands: loaders,
    topics: [],
  });

  // Afterwards, move `dev` to project
};

export default hook;
