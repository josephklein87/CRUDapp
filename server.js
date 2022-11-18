const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))
app.use(methodOverride('_method'));
const appRouter = require("./controllers/routes.js");

app.use("/",appRouter);

let PORT = 3000;
if(process.env.PORT){
	PORT = process.env.PORT
}

app.get('/', (req, res)=>{
	res.send('hi');
})

app.listen(PORT, ()=>{
	console.log('listening');
})


mongoose.connect('mongodb+srv://josephklein87:MfPKT7Vkxdttcp2P@sei.7ciujji.mongodb.net/?retryWrites=true&w=majority', ()=>{
	console.log('connected to mongo');
})