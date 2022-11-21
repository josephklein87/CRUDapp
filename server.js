const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const appRouter = require("./controllers/routes.js");
const sessionsController = require('./controllers/sessions_controller.js')
const userController = require('./controllers/users_controller.js')
const session = require('express-session')
require('dotenv').config()

// MIDDLEWARE //

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))
app.use(methodOverride('_method'));
app.use(
	session({
	  secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
	  resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
	  saveUninitialized: false // default  more info: https://www.npmjs.com/package/express-session#resave
	})
)
app.use('/users', userController)
app.use('/sessions', sessionsController)
app.use("/",appRouter);

if(process.env.PORT){
	PORT = process.env.PORT
}

// app.get('/', (req, res)=>{
// 	res.send('hi');
// })

app.listen(PORT, ()=>{
	console.log('listening');
})


mongoose.connect('mongodb+srv://josephklein87:MfPKT7Vkxdttcp2P@sei.7ciujji.mongodb.net/?retryWrites=true&w=majority', ()=>{
	console.log('connected to mongo');
})