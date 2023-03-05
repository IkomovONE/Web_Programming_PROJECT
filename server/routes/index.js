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

//importing necessary libraries

router.use(express.urlencoded({
    extended: true
  }));

router.use(express.json())


router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());

router.use(express.json({inflate: true, strict: false, type: () => { return true; } }));

//Commands for better encoding


router.post("/api/token/check", validateToken, (req, res) => {

  //token check post request, used in React client application for checking if user is logged in

  //ValidateToken function is used to check if token is legit. If the token is correct, the function executes next(), meaning that the code below will continue to execute


  const user= req.user;

  //setting user

  User.findOne({email: user.email}, (err, user) =>{

    //Using database to find the user so that his info could be passed as response
    if(user) {

      res.json({message: "VERIFIED", username: user.username, email: user.email, admin: user.admin})

      //sending response with message and some information about user

    }
  }
  )

  

  
  


});



router.post("/api/user/login", 
//post request for logging in 
  (req, res, next) => {

    
    
    User.findOne({email: req.body.email}, (err, user) =>{

      //Asking database to find user
    if(err) {res.send("User error", req.body)};

    //returns error if db has error
    
    if(user) {
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {

        //comparing password if the user is found
        if(err) {};

        //do nothing if error
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
          //if password is correct, sign him in, and send back the token and his information
        }
        if(!isMatch) {res.status(403).json({msg: "Password incorrect", user: req.body})}
        //send "password incorrect if password didn't match"
      })
    }
    else {
      return res.status(403).json({msg: "User not found!", user: req.body});

      //Pass user not found if no user found
    }

    })

});


router.post('/api/user/register/', 
body("email").isLength({min: 5}).trim().escape(),
body("password").isLength({min: 7}),
async (req, res) => {

  //Post request for registering user

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
    }

    //show errors if there are problems with password or email


    User.findOne({email: req.body.email}, async (err, user) => {

      //asking db to find the suggested user, so that no dublicate is created
        if(err) return next(err);
        if(!user) {
            
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                admin: req.body.admin,
            
            }).save((err) => {
                if (err) return next(err)

                //if no user found, create new user and save to db

                console.log({
                    "email": req.body.email,
                    "password": req.body.password
                })
            
                return res.json({success: true})

                //return success:true
            });

        }
        else {

            

            return res.status(403).json({msg: "User already exists!"})

            //show error "user already exists"

        }
    })

  });


router.get("/api/snippets", (req, res, next) => {

  //get request for all of the snippets, used on the main page

  Snippet.find({}, (err, snippets) => {
        
    if(err) return next(err);
    if(snippets) {
        return res.json(snippets);
    } else {
        return res.status(404).send("Not found");
    }
})

//returns an array with all of the snippets stored



});

router.get("/api/user/:id", (req, res, next) => {

  //get request to get the user with desired id

  

  User.findOne({username: req.params.id}, async (err, user) => {

    //asking db to find user
    if(err) return next(err);
    if(!user) {

      return res.json({msg: "No such user"})
        
        
        
        }

    if(user) {

      return res.json({success: true, username: user.username, email: user.email, admin: user.admin})


    }

        
})

//finds user and sends his info to the client, or sends error if user not found





});

router.get("/api/post/:id", (req, res, next) => {

  //get request to find post using desired id

  

  Snippet.findOne({_id: req.params.id}, async (err, snippet) => {
    if(err) return next(err);
    if(!snippet) {

      return res.json({msg: "No such snippet"})
        
        
        
        }

    if(snippet) {

      

      return res.json({success: true, id: snippet._id, date: snippet.date, author: snippet.author, subject: snippet.subject, description: snippet.description, code: snippet.code, likes: snippet.likes, comments: snippet.comments})


    }

        
})

//asking db to find the post, returns post info or error



});


router.post("/api/editsnippet", (req, res, next) => {


  //post request to edit desired snippet

  

  const date = new Date();

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const year = date.getFullYear();
  const month = months[date.getMonth()];
        

  const hour = ("0" + date.getHours()).slice(-2);
  const minute = ("0" + date.getMinutes()).slice(-2);

        
                    
  const formattedDate = `${month} ${date.getDate()}, ${year} at ${hour}:${minute}`;


  //Creating date object which shows today's date and time, then modifying it to a desired format

  
  


  


  Snippet.findOne({_id: req.body.postID}, async (err, snippet) => {

    //asking db to find desired snippet by id
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

       //create an updated document if the snippet is found 

       

       const result= await Snippet.updateOne({_id: req.body.postID}, updateDocument)

       //asking db to update the snippet with the new info model

          return res.json({success: true});

        }
        else {
          return res.status(403).send("ERROR");

      }
    })

    //sending success:true if successfull or error if opposite
        
          

       




})

router.post("/api/snippet/delete", (req, res, next) => {

  //post request to delete post

  

  const result= Snippet.deleteOne({_id: req.body.postID}, function (err, snippet) {

    //asking db to delete snippet 
    if (err){
        console.log(err)
    }
    else{
        console.log("Deleted : ", snippet);
        return res.json({success: true});

        //returning string and sending response
    }

  

});
});

router.post("/api/comment/delete", (req, res, next) => {

  //post request to delete desired comment


  Snippet.findOne({_id: req.body.postID}, async (err, snippet) => {

    //asking db to find snippet where the comment is posted
    if(err) return next(err);
    if(snippet) {

      

      var comments= snippet.comments

      

      comments.forEach((comment)=>{


        if(comment.CommentId== req.body.CommentId) {

        
          comments.remove(comment)

           

        }

        //extracting comment from post and removing it if it's found

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

     //creating the updated document for updating post info

     const result= await Snippet.updateOne({_id: req.body.postID}, updateDocument)

        return res.json({success: true});

      }
      else {
        return res.status(403).send("ERROR");

    }
  })

  //asking db to update snippet. if successfull, send success, if not, send error
      
   

});


router.post("/api/snippet/", (req, res, next) => {

  //post request to creating a new snippet(post)



  Snippet.findOne({subject: req.body.subject}, (err, snippet) => {

    //asking db to find the similar snippet subject, because same subjects not allowed
      if(err) return next(err);
      if(!snippet) {

        const date = new Date();

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const year = date.getFullYear();
        const month = months[date.getMonth()];
        

        const hour = ("0" + date.getHours()).slice(-2);
        const minute = ("0" + date.getMinutes()).slice(-2);

        

        
                    
        const formattedDate = `${month} ${date.getDate()}, ${year} at ${hour}:${minute}`;


        //Creating date object which shows today's date and time, then modifying it to a desired format

        
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
  //Creating a new snippet with setting up info, then saving it to db
  //didn't have enough time to implement "likes" feature, unfortunately :(
  
});

router.post("/api/comment", async (req, res, next) => {

  //post request for writing a new comment

  const date = new Date();

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const year = date.getFullYear();
  const month = months[date.getMonth()];
        

  const hour = ("0" + date.getHours()).slice(-2);
  const minute = ("0" + date.getMinutes()).slice(-2);

        
                    
  const formattedDate = `${month} ${date.getDate()}, ${year} at ${hour}:${minute}`;

  //Creating date object which shows today's date and time, then modifying it to a desired format


  



  Snippet.findOne({_id: req.body.postID}, async (err, snippet) => {

    //asking db to find snippet
      if(err) return next(err);
      if(snippet) {

        var comments= snippet.comments

        comment= {
          author: req.body.author,
          content: req.body.content,
          date: formattedDate,
          CommentId: req.body.CommentID,
        }

        //creating new comment model


        

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

    //updating snippet with the new document model which includes new comment
        
          

       


  });



router.post("/api/editComment", async (req, res, next) => {

  //post request for editing desired comment

    const date = new Date();
  
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
    const year = date.getFullYear();
    const month = months[date.getMonth()];
          
  
    const hour = ("0" + date.getHours()).slice(-2);
    const minute = ("0" + date.getMinutes()).slice(-2);
  
          
                      
    const formattedDate = `${month} ${date.getDate()}, ${year} at ${hour}:${minute}`;

    //Creating date object which shows today's date and time, then modifying it to a desired format


  
    
  
  
  
    Snippet.findOne({_id: req.body.postID}, async (err, snippet) => {

      //asking db to find post where the comment is
        if(err) return next(err);
        if(snippet) {

          
  
          var comments= snippet.comments

          

          comments.forEach((comment)=>{


            

            

            if(comment.CommentId== req.body.CommentId) {

              



              

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

          //extracting comment: removing the desired comment info and adding a new comment to the array

          
  
          
  
          
  
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

      //updating snippet with new document with updated comments
          
            
  
         
  
  
    });









module.exports = router;

//exporting router
