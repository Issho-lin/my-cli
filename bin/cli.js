#!/usr/bin/env node

const program = require('commander')

program.version(require('../package.json').version)

program.command('init <name>').description('init project').action(require('../lib/init'))
// ！！重点，不加上这句，前面的命令都没效果
program.parse(process.argv)