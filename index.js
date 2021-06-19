#!/usr/bin/env node

const inquirer = require('inquirer')
const axios = require('axios')
const { Command } = require('commander')
const chalk = require('chalk')
const styles = require('ansi-styles')


const loginCommand = require('./src/Commands/loginCommand')
const logoutCommand = require('./src/Commands/logoutCommand')
const componentsCommand = require('./src/Commands/componentsCommand')
const librariesCommand = require('./src/Commands/librariesCommand')
const dependenciesCommand = require('./src/Commands/dependenciesCommand')
const installCommand = require('./src/Commands/installCommand')
const langCommand = require('./src/Commands/langCommand')

const program = new Command();
program.version('1.1.1');

program
  .command('login')
  .description('Command for login', {
    username: 'user to login',
    password: 'password for user'
  })
  .action(function () {
    loginCommand()
  })

program
  .command('logout')
  .description('Command for logout')
  .action(function () {
    logoutCommand()
  })

program
  .command('components')
  .alias('c')
  .option('-t, --type <elementType>', 'Type of element')
  .option('-m, --my', 'My components')
  .description('List of components')
  .action(function (options) {
    componentsCommand(options)
  })

program
  .command('libraries')
  .alias('l')
  .option('-t, --type <elementType>', 'Type of element')
  .option('-m, --my', 'My libraries')
  .description('List of libraries')
  .action(function (options) {
    librariesCommand(options)
  })

program
  .command('dependencies')
  .alias('d')
  .arguments('[name]')
  .option('-l, --library', 'Type of element')
  .option('-c, --component', 'Type of element')
  .option('-i, --install', 'Install dependencies')
  .description('List of dependencies for element')
  .action(function (name, options) {
    dependenciesCommand(name, options)
  })

program
  .command('install')
  .alias('i')
  .arguments('[name] [path]')
  .option('-l, --library', 'Type of element')
  .option('-c, --component', 'Type of element')
  .option('-d, --dependencies', 'Install dependencies for element')
  .description('Command for install a element')
  .action(function (name, path, options) {
    installCommand(name, path, options)
  })  

  program
  .command('test')
  .description('Command for install a element')
  .action(function () {
    const error = chalk.red
    const success = chalk.green
    console.log(success('asd'))
    console.log(error('asd'))
  })  


program.parse(process.argv)