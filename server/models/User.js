const mongoose= require("mongoose");

//importing mongoose

//This is the model used in mongo DB. The model os for the users

const Schema = mongoose.Schema;

//Creating new Schema 

let userSchema= new Schema({

    username: String,
    
    email: String,
    password: String,
    admin: Boolean,


});

//setting new user Schema

module.exports= mongoose.model("User", userSchema);

//exporting schema