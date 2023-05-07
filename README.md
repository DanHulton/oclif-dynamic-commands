oclif-dynamic-commands
======================

oclif plugin that loads commands dynamically from a directory.

Uses glob patterns from [glob](https://www.npmjs.com/package/glob) to load commands dynamically.

Example: `./{project-a,project-b}/commands/**/*.ts` will load all commands found anywhere under the `commands` folder for the `project-a` or `project-b` folder from the current working directory. 
