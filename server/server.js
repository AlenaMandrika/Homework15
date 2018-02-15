const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const { Todo } = require('./models/todo')

// инициализируем express
const app = express()
app.use(bodyParser.json())

// настраиваем moongose
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/TodoApp')

// начало роутинга



// конец роутинга

// говорим express слушать 3001 порт на локальном хосте, первая часть в переменной port нужна для деплоймента на Heroku
const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`server is running on ${port}`)
})
