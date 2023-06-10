oclif-dynamic-commands
======================

oclif plugin that loads commands dynamically on run.

The current folder's `package.json` is read to find the folders the dynamic commands can be found in.

## Installation

1) Install the library:

```bash
npm i oclif-dynamic-commands
```

2) Add it to your oclif plugins in `pacakge.json`:

```json
  "oclif": {
    "plugins": [
      "oclif-dynamic-commands"
      ...
    ],
    ...
  }
```

## Writing Commands

Commands should be standard oclif commands, with one exception - command IDs are not defined by folder location, but manually and statically defined in the class itself:

```typescript
import { Command } from '@oclif/core';

export default class Example extends Command {
  static id = 'example';
  static summary = 'An example command.';
  static description = 'A longer description of your example command.';
  static examples = [
    '$ your-cli-command example',
  ];

  async run(): Promise<void> {
    this.log('Example command has been run!');
  }
}
```

## Configuration

In the folder that is to container your dynamic commands, ensure the `package.json` file has the following setting:

```json
"oclif": {
  "dynamic-commands": {
    "folders": [
      "./lib/commands/**/*.ts",
      "./src/commands/**/*.ts"
    ]
  }
}
```

Folders will be explored in the order defined, and any new commands loaded will overwrite any existing commands with the same ID.  In this way, you can allow for dynamic commands to override built-in commands, or allow for commands to be loaded from a common library, but still have project-specific commands overwrite them.  

Entries in the `folders` array can use glob patterns from [glob](https://www.npmjs.com/package/glob).

If you have commands separated into [topics](https://oclif.io/docs/topics), you can set topic descriptions here as well:

```json
"oclif": {
  "topics": {
    "your-dynamic-command-topic-name": {
      "description": "The description for your topic."
    }
  }
}
```

These topics and their descriptions will appear in the TOPICS section of your command help.

## Caveats & Cautions

### Typescript may be necessary!

If you are allowing users to write dynamic commands in Typescript, you will need to ensure your CLI is being run through Typescript, not running a pre-compiled Javascript binary!  Otherwise, you will get syntax errors when Node attempts to parse a Typescript file.

One way to (relatively) easily do that is to add `dev.sh` and `run.sh` shell files to your binary folder that look like this:

```bash
#!/usr/bin/env bash

DIR="$(dirname "$(readlink -f "$0")")"

"$DIR/../node_modules/tsx/dist/cli.js" --tsconfig ./tsconfig.json -- $DIR/dev.js "$@"
```

This requires installing [tsx](https://www.npmjs.com/package/tsx) in the dependencies of your CLI, which is a very quick Typescript interpreter, though [it has a few limitations](https://www.npmjs.com/package/tsx#does-it-have-any-limitations).

This script will run the `dev.js` Javascript file in your CLI's bin file, ensuring the `tsconfig.json` file from the current working directory is loaded.  Which leads us to...

### TsConfig differences between your CLI and your dynamic commands

With the above shell file, the `tsconfig.json` of the _current working directory_ is used to run your CLI.  This is not strictly necessary, but it can reduce issues with customised tsconfig values needed by your dynamic commands.  Specifically, if the project that your dynamic commands live within requires a special `paths` setting, you must use the `tsconfig.json` from the project's folder to ensure those paths are loaded and set correctly.  Otherwise, any includes from your dynamic commands that rely on those paths being set will _fail._

This raises an interesting question: How do you have combine a `paths` setting from your project's `tsconfig.json` with one from your CLI?  The short answer is that you _cannot._  So if you expect your dynamic commands to rely on custom `paths`, you cannot rely on them in your CLI.

You likely also want to both a) try to rely on as few custom TsConfig settings as you can and b) inform any developers of dynamic commands not to significantly modify their TsConfig settings or they could encounter unexpected failures when running the CLI.

## Changelog

1.0.0 - Initial release.
1.0.1 - More-reliable method of determining if an exported value is a Command; adds license file.
1.1.0 - Commands in topics properly have their topic added to the command help, and "root commands" (commands with no topic separator) are no longer required to get your commands in topics to show up in the command help.
