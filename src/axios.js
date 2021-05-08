const Axios = require('axios')
const https = require('https')
const { token } = require('./db')
let ax = Axios.create({
    baseURL: 'https://localhost:44345/api/',
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
})
if(token.value().length > 0)
    ax.defaults.headers.common.Authorization = 'Bearer ' + token.value()

module.exports = ax