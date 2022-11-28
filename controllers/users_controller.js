const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/users.js')

users.get('/new', (req, res) => {
  User.find({}, (error, UserList)=> {
    res.render('users/new.ejs', {currentUser: req.session.currentUser, userNames: UserList})
  });
});

users.post('/newUser', (req, res) => {
  //overwrite the user password with the hashed password, then pass that in to our database
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
    console.log('user is created', createdUser)
    res.redirect('/')
  })
})

users.get('/UserList', (req, res) => {
  User.find({}, {username: 1}, (error, UserList)=> {
    res.send(UserList)
})
});

// Upvoting

users.put('/:id/userUpvote', (req, res)=>{
  User.findOneAndUpdate({username: req.session.currentUser.username}, {$push: {upvotes: req.params.id}, $pull: {downvotes: req.params.id}}, () => {
  });
})

users.put('/:id/userDownvote', (req, res)=>{
  User.findOneAndUpdate({username: req.session.currentUser.username}, {$push: {downvotes: req.params.id}, $pull: {upvotes: req.params.id}}, () => {
  });
})

users.get('/voteCheck', (req, res) => {
  User.find({}, {username: 1, upvotes: 1, downvotes: 1}, (error, foundUser) => {
    res.send(foundUser)
  })
})

module.exports = users