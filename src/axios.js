const Axios = require('axios')
const https = require('https')
const { token } = require('./db')
let ax = Axios.create({
    baseURL: 'https://u1400620.plsk.regruhosting.ru/api/',
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
})
token.then((val => {
    ax.defaults.headers.common.Authorization = 'Bearer ' + val
})) 

module.exports = ax