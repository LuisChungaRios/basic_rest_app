const express = require('express')
const app = express.Router()
const UserController = require('./../controllers/UserController')
const auth = require('./auth')
const {tokenIsValid} = require('../middlewares/Auth')
app.use(auth)
app.get('/users', tokenIsValid, UserController.index)
app.post('/users', tokenIsValid, UserController.store)
app.put('/users/:id', tokenIsValid, UserController.update)
app.delete('/users/:id', tokenIsValid, UserController.delete)

module.exports = app