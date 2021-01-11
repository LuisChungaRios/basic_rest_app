require('dotenv').config()
const auth = {
    'KEY' : process.env.KEY,
    'LIFETIME_TOKEN': process.env.LIFETIME_TOKEN
}

module.exports = {
    ...auth
}