const { promisify } = require('util')
const figlet = promisify(require('figlet'))
const clear  = require('clear')
const chalk = require('chalk')
const { clone }  = require('./download')

const log = content => console.log(chalk.green(content));

module.exports = async name => {
  clear()
  const data = await figlet(`Welcome ${name}`)
  log(data)
  await clone('github:Issho-lin/my-webpack-config-spa', name)
}