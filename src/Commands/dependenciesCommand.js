const inquirer = require('inquirer')
const axios = require('../axios')
const { setValue , getValue} = require('../db')
module.exports = function (name, options) {
    
    if(options.library && options.component) {
        console.log('Use only -l or -c')
        return
    } else if(!options.library && !options.component) {
        console.log('Use option -l or -c')
        return
    }
    

    let elem = options.library ? 'Library' : 'Component'
    let active
    getValue('active' + elem).then(val => {
        active = val
        console.log(active)
        if(!name && active) {
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
                        let libName = active.split('/')[1]
                        axios.get('CLI/dependencies', {
                            params: {
                                type: elem.toLowerCase(),
                                author,
                                name: libName
                            }
                        })
                        .then(resp => {
                            let out = resp.data.join('\n')
                            console.log(out)
                        })
                        .catch(err => {
                            console.log('err')
                        })
                    }
                });
        }
    })

    
        

}