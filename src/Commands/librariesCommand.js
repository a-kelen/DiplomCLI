const inquirer = require('inquirer')
const axios = require('../axios')
const { db, token } = require('../db')

function getItems(page, my) {
    axios.get('CLI/libraries', {
        params: {
            page,
            my
        }
    })
    .then(resp => {
        let choises = resp.data.map(x => `@${x.author}/${x.name}`)
        if(page > 0)
            choises.unshift('[prev]')
        if(resp.data.length > 10)
            choises.push('[next]')
        choises.push('[exit]')
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'library',
                    message: 'Select active library:',
                    choices: choises,
                },
            ])
            .then(answer => {
                if(answer.library == '[next]') {
                    page++
                    getItems(page, my)
                }
                if(answer.library == '[prev]') {
                    page--
                    getItems(page, my)
                }
                if(answer.library == '[exit]')
                    return
                if(!['[next]', '[prev]', '[exit]'].includes(answer.library)) {
                    console.info(`[${answer.library}]  is active`)
                    db.set('activeLibrary', answer.library).write()
                }
               
            });
    })
    .catch(err => {
        console.log('Error')
    })
}

module.exports = function (options) {
    let page = 0
    let my = options.my || false
    
    getItems(page, my)
}