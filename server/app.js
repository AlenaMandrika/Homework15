const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const config = require('./config')
const todo = require('./models/todo')

require('./db')

app.listen(config.port, () => {
  console.log(`Server running at port: ${config.port}`)
})
app.use(bodyParser.json())

app.use('/api/v1', todo)

// error handling
app.use((req, res, next) => {
  const err = new Error(`Not Found ${req.path}`)
  err.status = 404
  next(err)
})
app.use((error, req, res, next) => {
  if (error) {
    console.log(error)
    return res.status(400).json({error})
  }
  next(error)
})
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
