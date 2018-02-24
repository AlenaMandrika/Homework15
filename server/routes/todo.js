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

router.post('/todo', (req, res, next) => {
 let newTodo = new Todo(req.body.todo)

  if(req.body.todo.text !== undefined
    && req.body.todo.complete !== undefined
    && req.body.todo.date !== undefined
    || req.body.todo.url!== undefined ) {
    console.log('todo err , field is empty : ',req.body.todo);

    res.json({success: false, message: 'Please enter text and url.'});
  } else {
    newTodo.save()
      .then(todo => {
        res.json({todo})
      })
      .catch(next)
  }

})

router.put('/todo/:id', function (req, res) {
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
