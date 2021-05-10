const Axios = require('axios')
const https = require('https')
const { token } = require('./db')
let ax = Axios.create({
    baseURL: 'https://localhost:44345/api/',
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
})
token.then((val => {
    ax.defaults.headers.common.Authorization = 'Bearer ' + val
})) 

module.exports = ax