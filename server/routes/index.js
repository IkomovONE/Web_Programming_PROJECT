var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db= require("mongoose")
const bcrypt = require("bcrypt")
const {body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const validateToken = require("../auth/validateToken")
require("dotenv").config();
const mongoose = require("mongoose");
var router = express.Router();
const Snippet = require("../models/Snippet");
const User = require("../models/User");
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


router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());

router.use(express.json({inflate: true, strict: false, type: () => { return true; } }));


router.post("/api/token/check", validateToken, (req, res) => {


  const user= req.user;

  User.findOne({email: user.email}, (err, user) =>{
    if(user) {

      res.json({message: "VERIFIED", username: user.username, email: user.email, admin: user.admin})

    }
  }
  )

  

  
  


});



router.post("/api/user/login", 
  //body("email").trim().escape(),
  //body("password").escape(),
  (req, res, next) => {

    
    
    User.findOne({email: req.body.email}, (err, user) =>{
    if(err) {res.send("User error", req.body)};
    
    if(user) {
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if(err) {};
        if(isMatch) {
          const jwtPayload = {
            id: user._id,
            email: user.email
          }
          jwt.sign(
            jwtPayload,
            process.env.SECRET,
            {
              expiresIn: 999
            },
            (err, token) => {
              
              res.json({success: true, token: token, username: user.username, email: user.email, admin: user.admin});
            }
          );
        }
        if(!isMatch) {res.status(403).json({msg: "Password incorrect", user: req.body})}
      })
    }
    else {
      return res.status(403).json({msg: "User not found!", user: req.body});
    }

    })

});


router.post('/api/user/register/', 
body("email").isLength({min: 5}).trim().escape(),
body("password").isLength({min: 7}),
async (req, res) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
    }


    User.findOne({email: req.body.email}, async (err, user) => {
        if(err) return next(err);
        if(!user) {
            
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                admin: false,
            
            }).save((err) => {
                if (err) return next(err)

                console.log({
                    "email": req.body.email,
                    "password": req.body.password
                })
            
                return res.json({success: true})
            });

        }
        else {

            

            return res.status(403).json({msg: "User already exists!"})

        }
    })

  });


router.get("/api/snippets", (req, res, next) => {

  Snippet.find({}, (err, snippets) => {
        
    if(err) return next(err);
    if(snippets) {
        return res.json(snippets);
    } else {
        return res.status(404).send("Not found");
    }
})



});

router.get("/api/user/:id", (req, res, next) => {

  

  User.findOne({username: req.params.id}, async (err, user) => {
    if(err) return next(err);
    if(!user) {

      return res.json({msg: "No such user"})
        
        
        
        }

    if(user) {

      return res.json({success: true, username: user.username, email: user.email, admin: user.admin})


    }

        
})



});

router.get("/api/post/:id", (req, res, next) => {

  

  Snippet.findOne({_id: req.params.id}, async (err, snippet) => {
    if(err) return next(err);
    if(!snippet) {

      return res.json({msg: "No such user"})
        
        
        
        }

    if(snippet) {

      

      

      

      return res.json({success: true, id: snippet._id, date: snippet.date, author: snippet.author, subject: snippet.subject, description: snippet.description, code: snippet.code, likes: snippet.likes, comments: snippet.comments})


    }

        
})



});

/*router.get("/api/comment/:id/:content", (req, res, next) => {

  const content= req.params.content;




  

  Snippet.findOne({_id: req.params.id}, async (err, snippet) => {
    if(err) return next(err);
    if(!snippet) {

      return res.json({msg: "No such snippet"})
        
        
        
        }

    if(snippet) {

      const comments = snippet.comments;

      comments.forEach((comment) => {

        if (comment.content== content) {




        }



      })

   

      return res.json({success: true, id: snippet._id, date: snippet.date, author: snippet.author, subject: snippet.subject, description: snippet.description, code: snippet.code, likes: snippet.likes, comments: snippet.comments})


    }

        
})



});

*/


router.post("/api/editsnippet", (req, res, next) => {

  

  const date = new Date();

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const year = date.getFullYear();
  const month = months[date.getMonth()];
        

  const hour = ("0" + date.getHours()).slice(-2);
  const minute = ("0" + date.getMinutes()).slice(-2);

        
                    
  const formattedDate = `${month} ${date.getDate()}, ${year} at ${hour}:${minute}`;

  
  


  


  Snippet.findOne({_id: req.body.postID}, async (err, snippet) => {
      if(err) return next(err);
      if(snippet) {
        

        


        const updateDocument = {
          $set: {
            subject: req.body.subject,
            author: snippet.author,
            description: req.body.description,
            code: req.body.code,
            likes: snippet.likes,
            date: formattedDate,
            comments: snippet.comments,
          },
       };

       

       const result= await Snippet.updateOne({_id: req.body.postID}, updateDocument)

          return res.json({success: true});

        }
        else {
          return res.status(403).send("ERROR");

      }
    })
        
          

       




})



router.post("/api/snippet/", (req, res, next) => {



  Snippet.findOne({subject: req.body.subject}, (err, snippet) => {
      if(err) return next(err);
      if(!snippet) {

        const date = new Date();

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const year = date.getFullYear();
        const month = months[date.getMonth()];
        

        const hour = ("0" + date.getHours()).slice(-2);
        const minute = ("0" + date.getMinutes()).slice(-2);

        
                    
        const formattedDate = `${month} ${date.getDate()}, ${year} at ${hour}:${minute}`;
        
          new Snippet({
            subject: req.body.subject,
            author: req.body.author,
            description: req.body.description,
            code: req.body.code,
            likes: "0",
            date: formattedDate,
            comments: []
              
          }).save((err) => {
              if(err) return next(err);
              return res.json({success: true});
          });

      } else {
          return res.status(403).send("This subject already exists.");

      }


  });
});

router.post("/api/comment", async (req, res, next) => {

  const date = new Date();

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const year = date.getFullYear();
  const month = months[date.getMonth()];
        

  const hour = ("0" + date.getHours()).slice(-2);
  const minute = ("0" + date.getMinutes()).slice(-2);

        
                    
  const formattedDate = `${month} ${date.getDate()}, ${year} at ${hour}:${minute}`;

  



  Snippet.findOne({_id: req.body.postID}, async (err, snippet) => {
      if(err) return next(err);
      if(snippet) {

        var comments= snippet.comments

        comment= {
          author: req.body.author,
          content: req.body.content,
          date: formattedDate,
          CommentId: req.body.CommentID,
        }


        

        comments.push(comment)

        

        const updateDocument = {
          $set: {
            subject: snippet.subject,
            author: snippet.author,
            description: snippet.description,
            code: snippet.code,
            likes: snippet.likes,
            date: snippet.date,
            comments: comments,
          },
       };

       const result= await Snippet.updateOne({_id: req.body.postID}, updateDocument)

          return res.json({success: true});

        }
        else {
          return res.status(403).send("ERROR");

      }
    })
        
          

       


  });



router.post("/api/editComment", async (req, res, next) => {

    const date = new Date();
  
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
    const year = date.getFullYear();
    const month = months[date.getMonth()];
          
  
    const hour = ("0" + date.getHours()).slice(-2);
    const minute = ("0" + date.getMinutes()).slice(-2);
  
          
                      
    const formattedDate = `${month} ${date.getDate()}, ${year} at ${hour}:${minute}`;
  
    
  
  
  
    Snippet.findOne({_id: req.body.postID}, async (err, snippet) => {
        if(err) return next(err);
        if(snippet) {

          
  
          var comments= snippet.comments

          

          comments.forEach((comment)=>{


            

            

            if(comment.CommentId== req.body.CommentId) {

              console.log("It finds")



              

              Newcomment= {
                author: req.body.author,
                content: req.body.content,
                date: formattedDate,
                CommentId: req.body.CommentId,
              }

              comments.remove(comment)

              
      
              comments.push(Newcomment)

            }

          })

          
  
          
  
          
  
          const updateDocument = {
            $set: {
              subject: snippet.subject,
              author: snippet.author,
              description: snippet.description,
              code: snippet.code,
              likes: snippet.likes,
              date: snippet.date,
              comments: comments,
            },
         };
  
         const result= await Snippet.updateOne({_id: req.body.postID}, updateDocument)
  
            return res.json({success: true});
  
          }
          else {
            return res.status(403).send("ERROR");
  
        }
      })
          
            
  
         
  
  
    });









module.exports = router;
