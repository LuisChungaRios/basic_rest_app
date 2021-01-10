const express = require('express')
const app = express.Router()
const UserController = require('./../controllers/UserController')
app.get('/users', UserController.index)
app.post('/users', UserController.store)
app.put('/users/:id', UserController.update)
app.delete('/users/:id', UserController.delete)

module.exports = app