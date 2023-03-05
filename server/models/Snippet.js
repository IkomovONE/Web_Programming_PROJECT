const mongoose = require("mongoose");

//importing mongoose

//This is the model used in mongo DB. The model os for the posts(snippets)

const Schema = mongoose.Schema;

//Creating new Schema 


let snippetSchema = new Schema({
    subject: String,
    author: String,
    description: String,
    code: String,
    codelang: String,
    likes: Number,
    date: String,
    comments: Array,
});

//setting new snippet Schema

module.exports = mongoose.model("Snippet", snippetSchema);


//exporting schema
