const inquirer = require('inquirer')
const { setValue, getValue } = require('../db')

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
            setValue('lang', answer.lang)
        })
    } else {
        getValue('lang').then(val => {
            if(!val) {   
                val = 'en'
                setValue('lang', en)
            }
            console.log('Current language:' , val)
        })
    }
            
}