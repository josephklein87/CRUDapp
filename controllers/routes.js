const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Movie = require('../models/MovieSchema.js');
const MovieSeed = require('../models/seed.js');

// Movie.create(MovieSeed, (err, data) => {
//     if (err) console.log(err.message)
//     console.log(`added provided Movie data`)
//   })

// =======================================
//              ROUTES
// =======================================
// =======================================
//              NEW (ALWAYS ON TOP)
// =======================================
router.get('/new', (req, res)=>{
    res.render('new.ejs');
  });


router.post('/', (req, res)=>{
  req.body.tags = req.body.tags.split(" ")
  Movie.create(req.body, ()=>{
    res.redirect("/");
});
});

// =======================================
//              SEARCH
// =======================================

router.post('/search', (req, res)=>{
  const searchTitle = req.body.name;
  const regex = new RegExp(searchTitle, 'i')
    
  Movie.find({name: regex}, (err, foundMovie)=> {
      res.render(
        'search.ejs', {
          MovieIndex: foundMovie
      })
  });
})


// =======================================
//              DELETE
// =======================================
router.delete('/:id', (req, res)=>{
    Movie.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/');//redirect back to fruits index
    });
  });

// =======================================
//              HOMEs
// =======================================
router.get(`/`, (req, res)=> {
    Movie.find({}, (error, MovieList)=> {
        if (error) console.log('error')
      res.render(`index.ejs`, 
      {
        MovieIndex: MovieList
      });
    });
  });



// =======================================
//              EDIT
// =======================================
router.get('/:id/edit', (req, res)=>{
  Movie.findById(req.params.id, (err, foundMovie)=>{ 
      res.render(
      'edit.ejs',
      {
        MovieIndex: foundMovie
      }
    );
  });
});

router.put('/:id', (req, res)=>{
  req.body.tags = req.body.tags.split(",")
  Movie.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
      res.redirect(`/`);
  });
});

// =======================================
//              SHOW
// =======================================
router.get('/:id', (req, res)=>{
  Movie.findById(req.params.id, (err, foundMovie)=>{ 
      res.render(
      'show.ejs',
      {
        MovieIndex: foundMovie
      }
    );
  });
});





module.exports = router