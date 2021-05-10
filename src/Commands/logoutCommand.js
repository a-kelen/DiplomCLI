const inquirer = require('inquirer')
const { setValue, token } = require('../db')
module.exports = function () {
    token.then(val => {
        if(val != "")
            inquirer
                .prompt([
                    {
                        name: 'confirm',
                        type: 'confirm',
                        message: 'Confirm logout:',
                    },
                ]).then((answer) => {
                    if(answer.confirm) {
                        Promise.all([
                            setValue('token', ''),
                            setValue('activeLibrary', ''),
                            setValue('activeComponent', '')]
                        ).then(() => {
                            console.log('Logout successfully ...')
                        })
                        
                    }
                });
    })
    
            
}