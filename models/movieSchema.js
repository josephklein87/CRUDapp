const mongoose = require('mongoose');
const Schema = mongoose.Schema; // create a shorthand for the mongoose Schema constructor


const movieSchema = new Schema({
    name: String,
    image: String,
    year: Number,
    director:[String],
    worstActor: String,
    review: String,
    tags: [String]
    });

    const movie = mongoose.model('Movie', movieSchema);

    //make this exportable to be accessed in `app.js`
    module.exports = movie;