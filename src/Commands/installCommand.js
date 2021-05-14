const inquirer = require('inquirer')
const axios = require('../axios')
const { setValue , getValue, token } = require('../db')
const fs = require('fs')
const pathLib = require('path')
const { type } = require('os')
var AdmZip = require('adm-zip')

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

function notExistFiles(files, path = './') {    
    for(let file of files)  {
        if(fs.existsSync(pathLib.join(process.cwd() ,path, file)))
            return false
    }

    return files.length > 0
}

function verifyFSAndInstall(author, elemName, elem, path) {
    console.log('--', path)
    return new Promise((resolve, reject) => {
        getFiles(author, elemName, elem)
        .then((res) => {
            if(notExistFiles(res.files, path)) {
                downloadFiles(res.id, elem, path)
            }
        })
        .catch(() => {
            reject()
        })
    })
    
}

function downloadFiles(id, elem, path = '.') {
    return new Promise((resolve, reject) => {
        axios.get(`${elem}/download/${id}`, {
            responseType: 'arraybuffer'
        })
        .then(res => {
            var zip = new AdmZip(res.data);
            // var zipEntries = zip.getEntries();

            
            // for (var i = 0; i < zipEntries.length; i++) {
            //     console.log(zip.readAsText(zipEntries[i]));
            // }
            zip.extractAllTo(path, true);
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
                        verifyFSAndInstall(author, elemName, elem, path)
                    }
                });
        } else if(name) {
            let vals = name.split('/')
            let author, elemName
            if(vals.length === 1) {
                elemName = name
                getValue('username').then(val => {
                    verifyFSAndInstall(val, elemName, elem, path)
                })
            } else if(vals.length === 2) {
                author = vals[0].slice(1)
                elemName = vals[1]
                verifyFSAndInstall(author, elemName, elem, path)
            } else {
                console.log('Incorect format of element name')
            }
           
        }
    })

    
}