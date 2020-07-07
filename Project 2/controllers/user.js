const bcrypt = require('bcrypt')
const express = require('express')
const users= express.Router();
const User = require('../models/users.js')

users.get('/new', (req, res) => {
    res.render('users/newUser.ejs')
  })

  users.post('/', (req, res) => {
    //overwrite the user password with the hashed password, then pass that in to our database
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    console.log(req.body)
    User.create(req.body, (err, createdUser) => {
      if(err) { console.log(err)}
      console.log('user is created', createdUser)
      res.redirect('/')
    })
  })

module.exports = users