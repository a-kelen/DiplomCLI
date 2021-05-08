const inquirer = require('inquirer')
const { db, token } = require('../db')

module.exports = function () {
    if(token.value() != "")
        inquirer
            .prompt([
                {
                    name: 'confirm',
                    type: 'confirm',
                    message: 'Confirm logout:',
                },
            ]).then((answer) => {
                if(answer.confirm) {
                    db.set('token', '').write()
                    console.log('Logout successfully...')
                }
            });
            
    }