var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
var cors= require("cors");

var indexRouter = require('./routes/index');


var app = express();

//setting express app and importing necessary stuff



const mongoDB = "mongodb://localhost:27017/testdb";
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error"));

//Setting the database, connecting to address of testDB








app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Setting encoders for better responses


app.use('/', indexRouter);

//Setting to use "/" route




if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve("..", "client", "build")));
    app.get("*", (reg, res) =>
        res.sendFile(path.resolve("..", "client", "build", "index.html"))
    );
    } 
else if (process.env.NODE_ENV === "development" ) {
    var corsOptions = { origin: "http://Localhost:3000",
    optionsSuccessStatus: 200,
    };
    app.use(cors(corsOptions));

}

//Setting up the app for production and developent processes

module.exports = app;
