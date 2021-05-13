const inquirer = require('inquirer')
const axios = require('../axios')


const { setValue, getValue, token } = require('../db')
module.exports = function () {
    token.then(() => {
    inquirer
        .prompt([
            {
            name: 'email',
            type: 'input',
            message: 'Enter email:',
            },
            {
            name: 'password',
            type: 'password',
            message: 'Enter password:',
            mask: true
            },
        ]).then((answer) => {
            
                axios.post('/User/login', {
                    email: answer.email,
                    password: answer.password
                })
                .then(resp => {
                    if(resp?.data)
                        {
                            
                            setValue('token', resp.data.token).then(() => {
                                setValue('username', resp.data.username).then(() => {
                                    console.log('You are logged as : ', resp.data.name)
                                })
                            })
                        }
                })
                .catch(() => {
                    console.log('Invalid email or password!')
                })
            
            
        });
              
    })
}