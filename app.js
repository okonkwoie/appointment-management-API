const express = require('express')
const bodyParser = require('body-parser') 
const mongodbConnect = require('./db/mongodb')
const config = require('./config/config')
require('dotenv').config()
const app = express()


// middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// mongodb connection
mongodbConnect()


app.get('/', (req, res) => {
    res.send({
        message: 'Welcome to my appointment system'
    })
})


app.listen(config.PORT, () => {
    console.log(`server is listening on port: ${config.PORT}...`);
})