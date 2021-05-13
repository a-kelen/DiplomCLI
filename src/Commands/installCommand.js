const inquirer = require('inquirer')
const axios = require('../axios')
const { setValue , getValue, token } = require('../db')

function getFiles(author, name, type) {
    return new Promise((resolve, reject) => {
        axios.get('CLI/install', {
            params: {
                type: type.toLowerCase(),
                author,
                name
            }
        })
        .then(resp => {
            resolve(resp.data)
        })
        .catch(err => {
            reject('Error')
        })
    })
}

module.exports = function (name, path, options) {
    if(options.library && options.component) {
        console.log('Use only -l or -c')
        return
    } else if(!options.library && !options.component) {
        console.log('Use option -l or -c')
        return
    }
    

    let elem = options.library ? 'Library' : 'Component'
    getValue('active' + elem).then(val => {
        active = val
        
        if(!name && active) {
            console.log(active)
            inquirer
                .prompt([
                    {
                        name: 'confirm',
                        type: 'confirm',
                        message: `Use active ${elem}: ${active}?`,
                    },
                ]).then((answer) => {
                    if(answer.confirm) {
                        let author = active.split('/')[0].slice(1)
                        let elemName = active.split('/')[1]
                        getFiles(author, elemName, elem)
                            .then(console.log)
                            .catch(() => {
                                console.log('Error')
                            })
                    }
                });
        } else if(name) {
            let vals = name.split('/')
            let author, elemName
            if(vals.length === 1) {
                elemName = name
                getValue('username').then(val => {
                    getFiles(val, elemName, elem)
                        .then(console.log)
                        .catch(() => {
                            console.log('Error')
                        })
                })
            } else if(vals.length === 2) {
                author = vals[0].slice(1)
                elemName = vals[1]
                getFiles(author, elemName, elem)
                .then(console.log)
                .catch(() => {
                    console.log(vals)
                })
            } else {
                console.log('Incorect format of element name')
            }
           
        }
    })

    
}