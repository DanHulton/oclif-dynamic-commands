oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g oclif-dynamic-commands
$ oclif-dynamic-commands COMMAND
running command...
$ oclif-dynamic-commands (--version)
oclif-dynamic-commands/0.0.0 darwin-x64 node-v17.3.0
$ oclif-dynamic-commands --help [COMMAND]
USAGE
  $ oclif-dynamic-commands COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`oclif-dynamic-commands hello PERSON`](#oclif-dynamic-commands-hello-person)
* [`oclif-dynamic-commands hello world`](#oclif-dynamic-commands-hello-world)
* [`oclif-dynamic-commands help [COMMANDS]`](#oclif-dynamic-commands-help-commands)
* [`oclif-dynamic-commands plugins`](#oclif-dynamic-commands-plugins)
* [`oclif-dynamic-commands plugins:install PLUGIN...`](#oclif-dynamic-commands-pluginsinstall-plugin)
* [`oclif-dynamic-commands plugins:inspect PLUGIN...`](#oclif-dynamic-commands-pluginsinspect-plugin)
* [`oclif-dynamic-commands plugins:install PLUGIN...`](#oclif-dynamic-commands-pluginsinstall-plugin-1)
* [`oclif-dynamic-commands plugins:link PLUGIN`](#oclif-dynamic-commands-pluginslink-plugin)
* [`oclif-dynamic-commands plugins:uninstall PLUGIN...`](#oclif-dynamic-commands-pluginsuninstall-plugin)
* [`oclif-dynamic-commands plugins:uninstall PLUGIN...`](#oclif-dynamic-commands-pluginsuninstall-plugin-1)
* [`oclif-dynamic-commands plugins:uninstall PLUGIN...`](#oclif-dynamic-commands-pluginsuninstall-plugin-2)
* [`oclif-dynamic-commands plugins update`](#oclif-dynamic-commands-plugins-update)

## `oclif-dynamic-commands hello PERSON`

Say hello

```
USAGE
  $ oclif-dynamic-commands hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/DanHulton/oclif-dynamic-commands/blob/v0.0.0/dist/commands/hello/index.ts)_

## `oclif-dynamic-commands hello world`

Say hello world

```
USAGE
  $ oclif-dynamic-commands hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oclif-dynamic-commands hello world
  hello world! (./src/commands/hello/world.ts)
```

## `oclif-dynamic-commands help [COMMANDS]`

Display help for oclif-dynamic-commands.

```
USAGE
  $ oclif-dynamic-commands help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for oclif-dynamic-commands.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.9/src/commands/help.ts)_

## `oclif-dynamic-commands plugins`

List installed plugins.

```
USAGE
  $ oclif-dynamic-commands plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ oclif-dynamic-commands plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/index.ts)_

## `oclif-dynamic-commands plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ oclif-dynamic-commands plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ oclif-dynamic-commands plugins add

EXAMPLES
  $ oclif-dynamic-commands plugins:install myplugin 

  $ oclif-dynamic-commands plugins:install https://github.com/someuser/someplugin

  $ oclif-dynamic-commands plugins:install someuser/someplugin
```

## `oclif-dynamic-commands plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ oclif-dynamic-commands plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ oclif-dynamic-commands plugins:inspect myplugin
```

## `oclif-dynamic-commands plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ oclif-dynamic-commands plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ oclif-dynamic-commands plugins add

EXAMPLES
  $ oclif-dynamic-commands plugins:install myplugin 

  $ oclif-dynamic-commands plugins:install https://github.com/someuser/someplugin

  $ oclif-dynamic-commands plugins:install someuser/someplugin
```

## `oclif-dynamic-commands plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ oclif-dynamic-commands plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ oclif-dynamic-commands plugins:link myplugin
```

## `oclif-dynamic-commands plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ oclif-dynamic-commands plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ oclif-dynamic-commands plugins unlink
  $ oclif-dynamic-commands plugins remove
```

## `oclif-dynamic-commands plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ oclif-dynamic-commands plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ oclif-dynamic-commands plugins unlink
  $ oclif-dynamic-commands plugins remove
```

## `oclif-dynamic-commands plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ oclif-dynamic-commands plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ oclif-dynamic-commands plugins unlink
  $ oclif-dynamic-commands plugins remove
```

## `oclif-dynamic-commands plugins update`

Update installed plugins.

```
USAGE
  $ oclif-dynamic-commands plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
