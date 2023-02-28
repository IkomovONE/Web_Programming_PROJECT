var express = require('express');
const mongoose = require("mongoose");
var router = express.Router();
const Book = require("../models/Book");
const { connect } = require("http2");

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/
router.use(express.urlencoded({
    extended: true
  }));

router.use(express.json())

router.use(express.json({inflate: true, strict: false, type: () => { return true; } }));

router.get('/book/:id', function(req, res, next) {




  Book.findOne({name: req.params.id}, (err, book) => {
    
    if(err) {
      console.log("error")

      res.status(404).json({
        "name": "error",
        "author": "error",
        "pages": "error"
      })


      
    };
    if(!book) {
      console.log("no book")
      res.status(404).json({
        "name": "error",
        "author": "error",
        "pages": "error"
      })
    } else {

      console.log("book is present")

      

      res.json({
        "name": book.name,
        "author": book.author,
        "pages": book.pages
      });


    }




  
});

});



router.post("/api/book/", (req, res, next) => {



  
    
  Book.findOne({ name: req.body.name}, (err, book) => {
      if(err) return next(err);
      if(!book) {
          new Book({
              name: req.body.name,
              author: req.body.author,
              pages: req.body.pages,
          }).save((err) => {
              if(err) return next(err);
              return res.send(req.body);
          });

      } else {
          return res.status(403).send("already exists.");

      }


  });
});

module.exports = router;
