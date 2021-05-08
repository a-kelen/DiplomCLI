const inquirer = require('inquirer')
const { db, token } = require('../db')

module.exports = function (options) {
    if(options.set) {
        inquirer
        .prompt([
            {
                type: 'list',
                name: 'lang',
                message: 'Select language:',
                choices: ['en', 'ua']
            },
        ])
        .then(answer => { 
            db.set('lang', answer.lang).write()
        })
    } else {
        console.log('Current language:' ,db.get('lang').value())
    }
            
}