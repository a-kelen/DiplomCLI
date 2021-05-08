const lowdb = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')

const adapter = new fileSync('db.json')
const db = lowdb(adapter)

db.defaults({
    token: ''
}).write()
const token = db.get('token')

module.exports = {
    db, token
}