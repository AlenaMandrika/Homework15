const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  text: String,
  url: String,
  date: String,
  complete: Boolean
})

module.exports = mongoose.model('Todo', todoSchema)
