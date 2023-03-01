const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let snippetSchema = new Schema({
    subject: String,
    author: String,
    description: String,
    code: String,
    likes: Number
});

module.exports = mongoose.model("Snippet", snippetSchema);
