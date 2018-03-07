const express = require('express')

const Todo = require('../models/model')

const router = express.Router()

router.get('/todo/:id', (req, res) => {
  Todo.findById({'_id': req.params.id}, (err, todo) => {
    if (err) {
      res.status(400).json(err)
    }
    res.status(200).json(todo)
  })
})

router.get('/todo', (req, res, next) => {
  Todo.find({})
    .then(todo => {
      res.json({todo})
    })
    .catch(next)
})

router.post('/todo', (req, res) => {
 let newTodo = new Todo(req.body.todo)

  if (req.body.todo.text === ''
    || req.body.todo.complete === ''
    || req.body.todo.date === ''
    || req.body.todo.url === '') {
    console.log('todo err , field is empty : ',req.body.todo);

    res.json({success: false, message: 'Please fill in the fields'});

  } else {
    newTodo.save()
      .then(todo => {
        res.json({todo})
      }, (err) => {
        res.status(400).json(err)
      })
  }
})


router.put('/todo/:id', function (req, res) {
  let todo = req.body.todo
  for (let key in todo) {
    if(todo.hasOwnProperty(key)) {
      console.log((key + ':' + todo[key]))
    } else {
      console.log(key)
    }
  }
  Todo.findOneAndUpdate({'_id': req.params.id},
    {text: req.body.todo.text,
      url: req.body.todo.url,
      date: req.body.todo.date,
      complete: req.body.todo.complete
    },
    {new: true},
    function (err, todo) {
      if (err) {
        res.status(400).json(err)
      }
      res.status(200).json(todo)
    })
})


router.delete('/todo/:id', function (req, res) {
  let id = req.params.id
  Todo.remove({
    _id: id
  }, function () {
    res.json()
  })
})

module.exports = router
