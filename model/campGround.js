// import mongoose to use in file.
const mongoose = require('mongoose');

// short cut for creating new schema
const schema = mongoose.schema;

// create model schema for what a campground should be.
const CampgroundSchema = new schema({
    title: String,
    price: String,
    description: String,
    location: String
}); 

// export the CampgroundSchema
module.exports = mongoose.model('Campground', CampgroundSchema);

