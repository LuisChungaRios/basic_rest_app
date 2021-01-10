const express = require('express')
const app = express()
const routes = require('./routes/web')
const bodyParser = require('body-parser')
require('./database/connection')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(routes)

let port = process.env.PORT || 3000
app.listen(port, () => `app listen ${port}`)

