#!/usr/bin/env node

const inquirer = require('inquirer');
const axios = require('axios');
const { Command } = require('commander');
const { db, token } = require('./db')

const loginCommand = require('./src/Commands/loginCommand')
const logoutCommand = require('./src/Commands/logoutCommand')
const componentsCommand = require('./src/Commands/componentsCommand')
const librariesCommand = require('./src/Commands/librariesCommand')
const dependenciesCommand = require('./src/Commands/dependenciesCommand')
const installCommand = require('./src/Commands/installCommand')
//+ login
// logout
// lang (-set ua/en)
// libraries (-type vuejs, vuets, react, angular)
// components (-type vuejs, vuets, react, angular)

// install -l  @admin/LibName  path/libs/lib1 --dependencies

// dependencies -l @admin/libname -i


const program = new Command();
program.version('0.0.1');

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
  .arguments('<name>')
  .option('-t, --type <elementType>', 'Type of element')
  .option('-m, --my', 'My components')
  .description('List of components')
  .action(function () {
    componentsCommand()
  })

program
  .command('libraries')
  .alias('l')
  .arguments('<name>')
  .option('-t, --type <elementType>', 'Type of element')
  .option('-m, --my', 'My libraries')
  .description('List of libraries')
  .action(function () {
    librariesCommand()
  })

program
  .command('dependencies')
  .alias('d')
  .arguments('<name>')
  .option('-l, --library', 'Type of element')
  .option('-c, --component', 'Type of element')
  .option('-i, --install', 'Install dependencies')
  .description('List of dependencies for element')
  .action(function () {
    dependenciesCommand()
  })

program
  .command('install')
  .alias('i')
  .arguments('<name> [path]')
  .option('-l, --library', 'Type of element')
  .option('-c, --component', 'Type of element')
  .option('-d, --dependencies', 'Install dependencies for element')
  .description('Command for install a element')
  .action(function () {
    installCommand()
  })  

program
  .command('lang')
  .option('-s, --set', 'Set language ua/en ')
  .description('Command for language setting')
  .action(function () {

  }) 

program.parse(process.argv);