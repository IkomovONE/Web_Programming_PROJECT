const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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

module.exports = mongoose.model("Snippet", snippetSchema);
