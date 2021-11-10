const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

const mongoose = require('mongoose');
const Campground = require('./models/campground');

// connect mongoose to the datbase
mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));


// set up default route
app.get('/', (req, res) => {
    res.render("home");
})

// when the users hits /campgrounds all record from the database is loaded and presented to the user.
app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});

    // render the campground from the index folder and also pass over the data from campgrounds variable
    res.render('campgrounds/index', {campgrounds})
})

// created the route to create new campground
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
})

// post route for which campground is sybmitted to
app.post('/campgrounds', async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
    // res.send(req.body);
})

// create a detail route for each campground which is loaded
app.get('/campgrounds/:id', async(req, res) => {
    // pass in the id from the url to show detail for each campground
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', {campground});
})

// create a edit route
app.get('/campgrounds/:id/edit', async(req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', {campground});
})

// create a put route to send data to when updating the form
app.put('/campgrounds/:id', async(req, res) => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {... req.body.campground});
    res.redirect(`/campgrounds/${campground._id}`)
})

app.delete('/campgrounds/:id', async(req, res) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
})

// set up test route to test if database is working
// app.get('/makecampground', async(req, res) => {
//     const camp = new Campground
//     ({
//         title: 'My secret camp',
//         price: '$5.00',
//         description: 'come with new pool and home sofa',
//         location: 'home'

//     });
//     await camp.save();
//     res.send(camp);
// })

// set up port for the server to run on.
app.listen(8080, () => {
    console.log("server is on port 8080")
});