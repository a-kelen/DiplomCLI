const inquirer = require('inquirer')
const axios = require('../axios')
const { setValue, token } = require('../db')
const log = require('../logging')

function getItems(page, my) {
    axios.get('CLI/components', {
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
                    name: 'component',
                    message: 'Select active component:',
                    choices: choises,
                },
            ])
            .then(answer => {
                if(answer.component == '[next]') {
                    page++
                    getItems(page, my)
                }
                if(answer.component == '[prev]') {
                    page--
                    getItems(page, my)
                }
                if(answer.component == '[exit]')
                    return
                if(!['[next]', '[prev]', '[exit]'].includes(answer.component)) {
                    console.info(`[${answer.component}]  is active`)
                    setValue('activeComponent', answer.component)
                }
            });
    })
    .catch(err => {
        log.error('Error')
    })
}

module.exports = function (options) {
    let page = 0
    let my = options.my || false
    token.then(() => {
        getItems(page)
    })
    
}