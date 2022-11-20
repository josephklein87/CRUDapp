const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Movie = require('../models/movieSchema.js');
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
    res.render('new.ejs', {
    currentUser: req.session.currentUser
    });
});


router.post('/addMovie', (req, res)=>{
  req.body.tags = req.body.tags.split(",")
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
    
  Movie.find({$or: [{name: regex}, {director: regex}, {worstActor: regex}, {year: regex}, {tags: regex}, {genre: regex}]}, (err, foundMovie)=> {
      res.render(
        'search.ejs', {
          movieIndex: foundMovie,
          currentUser: req.session.currentUser
      })
  });
})

router.get(`/search`, (req, res)=> {
  Movie.find({}, (error, MovieList)=> {
    if (error) console.log('error')
  res.render(`index.ejs`, 
  {
    movieIndex: MovieList,
    currentUser: req.session.currentUser
  });
}).sort({_id: -1});
});

// router.post('/clear', (req, res)=>{
//   Movie.find({}, (err, allMovies)=> {
//       res.render('index.ejs', {
//           movieIndex: allMovies
//       })
//   });
// })


// =======================================
//              DELETE
// =======================================
router.delete('/:id', (req, res)=>{
    Movie.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/');
    });
  });

// =======================================
//              HOME
// =======================================
router.get(`/`, (req, res)=> {
    Movie.find({}, (error, MovieList)=> {
        if (error) console.log('error')
      res.render(`index.ejs`, 
      {
        movieIndex: MovieList,
        currentUser: req.session.currentUser
      });
    }).sort({_id: -1});
  });



// =======================================
//              EDIT
// =======================================
router.get('/:id/edit', (req, res)=>{
  Movie.findById(req.params.id, (err, foundMovie)=>{ 
      res.render(
      'edit.ejs',
      {
        movieIndex: foundMovie,
        currentUser: req.session.currentUser
      }
    );
  });
});

router.put('/:id', (req, res)=>{
  req.body.tags = req.body.tags.split(",")
  Movie.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
    res.redirect(`/${req.params.id}`);
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
        movieIndex: foundMovie,
        currentUser: req.session.currentUser
      }
    );
  });
});





module.exports = router