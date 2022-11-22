const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs', { currentUser: req.session.currentUser })
})

sessions.get('/userLogin', (req, res) => {
    res.render('sessions/new.ejs', { currentUser: req.session.currentUser })
  })
  

// on sessions form submit (log in)
sessions.post('/userLogin', (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      console.log(err)
      res.send('oops the db had a problem')
    } else if (!foundUser) {
      res.render('sessions/usernamenotfound.ejs', {currentUser: req.session.currentUser})
    } else {
      // user is found
      // check if passwords match
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        // add the user to session
        req.session.currentUser = foundUser
        // redirect back to home page
        res.redirect('/')
      } else {
        // passwords do not match
        res.render('sessions/passwordnomatch.ejs', {currentUser: req.session.currentUser})
      }
    }
  })
})

sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})

module.exports = sessions