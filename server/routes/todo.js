const express = require('express')

const Todo = require('../models/model')

const router = express.Router()

router.get('/todo/:id', (req, res) => {
  Todo.findById({"_id": req.params.id})
    .then(todo => {
      res.json({todo})
      if (!todo) {
        return res.status(400).json(err)
      }
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
  new Todo(req.body.todo)
    .save()
    .then(todo => {
      res.json({todo})
      if (!todo) {
        return res.status(400).json(err)
      }
    })
})

router.put('/todo/:id', function (req, res) {
  Todo.findOneAndUpdate({"_id": req.params.id},
    {text: req.body.todo.text,
     url: req.body.todo.url,
     date: req.body.todo.date,
     complete: req.body.todo.complete,
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
