const express = require('express');
const app = express();

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

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://josephklein87:MfPKT7Vkxdttcp2P@sei.7ciujji.mongodb.net/?retryWrites=true&w=majority', ()=>{
	console.log('connected to mongo');
})