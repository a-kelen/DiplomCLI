const chalk = require('chalk')

function success(text) {
    console.log(chalk.green(text))
}

function error(text) {
    console.log(chalk.error(text))
}
function raw(text) {
    console.log(text)
}

module.exports = {
    success, error, raw
}