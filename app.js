const express = require('express')
const bodyParser = require('body-parser')
const appointmentRouter = require('./routes/appointment') 
const rateLimiter = require('./ratelimiting/ratelimiter')
const helmet = require('helmet')
const auth0 = require('./auth/auth0')
const logger = require('./logger/logger')
const mongodbConnect = require('./db/mongodb')
const { requiresAuth } = require('express-openid-connect')
const config = require('./config/config')
require('dotenv').config()

const app = express()

// middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(auth0)
app.use('/api/v1/appointment', appointmentRouter)

// protected routes
app.use('/api/v1/appointment/create', requiresAuth(), appointmentRouter)
app.use('/api/v1/appointment/update/:id', requiresAuth(), appointmentRouter)
app.use('/api/v1/appointment/delete/:id', requiresAuth(), appointmentRouter)
app.use('/api/v1/appointment/userAppointment', requiresAuth(), appointmentRouter)

/// error handler middleware
app.use((err, req, res, next) => {
  logger.error(err.message)
  res.status(500).send({
      error: 'An unexpected error occurred'
  })
  next()
})

// security middleware
app.use(helmet())

// rate limiting middleware to all requests
app.use(rateLimiter)

// mongodb connection
mongodbConnect()

// full calendar initialization
app.get('/', requiresAuth(), (req, res) => {
    res.send('appointment management API');
  });




app.listen(config.PORT, () => {
    logger.info(`server is listening on port: ${config.PORT}...`);
})