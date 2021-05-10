const jsonbase = require('jsonbase.com')
const TOKEN = '3c9622697a53d8b2f3cf825dc4160f7e1aad46c1a759475edeb76bce5cd33a64'
const store = jsonbase(TOKEN)

function setValue(key, value) {
    return store.write(key ,{ value })
}

function getValue(key) {
    return new Promise((resolve, reject) => {
        store.read(key).then( (resp) => {
            resolve(resp.data.value)
        })
        .catch(err => resolve(null))
    })
    
}

let token = getValue('token')

module.exports = {
    setValue, getValue, token
}