const inquirer = require('inquirer')
const axios = require('../axios')




const { db, token } = require('../db')
module.exports = function () {
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
                            console.log('You are logged as : ', resp.data.name)
                            db.set('token', resp.data.token).write()
                        }
                })
                .catch(() => {
                    console.log('Invalid email or password!')
                })
            
            
        });
    }