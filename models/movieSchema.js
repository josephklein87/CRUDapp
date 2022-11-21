const mongoose = require('mongoose');
const Schema = mongoose.Schema; // create a shorthand for the mongoose Schema constructor


const movieSchema = new Schema({
    username: String,
    name: {type: String, unique: true, required: true},
    genre: {type: String, required: true},
    image: {type: String, required: true},
    year: {type: String, required: true},
    director:{type: Array, required: true},
    worstActor: {type: String, required: true},
    review: {type: String, required: true},
    tags: {type: Array, required: true}
    });

    const movie = mongoose.model('Movie', movieSchema);

    //make this exportable to be accessed in `app.js`
    module.exports = movie;