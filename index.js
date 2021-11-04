const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');

// connect mongoose to the datbase
mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// set up default route
app.get('/', (req, res) => {
    res.render("home");
})

// set up port for the server to run on.
app.listen(8080, () => {
    console.log("server is on port 8080")
});