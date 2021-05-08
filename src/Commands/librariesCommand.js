const inquirer = require('inquirer')
const axios = require('axios');
const { db, token } = require('../db')
module.exports = function () {
    inquirer
        .prompt([
            {
            name: "email",
            type: "input",
            message: "Enter email:",
            },
            {
            name: "password",
            type: "password",
            message: "Enter password:",
            mask: true
            },
        ]).then((answer) => {
            
        });
    }