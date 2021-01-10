require('dotenv').config()
const mongoose = require('mongoose');
const DB_PORT = process.env.DB_PORT
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_HOST = process.env.DB_HOST
const DB_NAME = process.env.DB_NAME
mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`,
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, (err) => {
     if(err) return console.log(err)
     return console.log(`DATABASE ONLINE`)
 });

 