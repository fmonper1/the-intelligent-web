
var mongoose = require('mongoose'),
    Review = require('./Reviews.js'),
    ReviewSchema = mongoose.model('Review').schema;

// Create a new schema for the restaurant collection with all the relevant information for a restaurant
var Schema = mongoose.Schema;

var Restaurant = new Schema(
    {
        name: {type: String, required: true, max: 100},
        typeOfCuisine: [{type: String, required: true, max: 100}],
        officialPhoto: String,
        hasDelivery: Boolean,

        address: {
            streetName : String,
            city:String,
            postcode:String,
            county:String,
            country:String
        },

        contactDetails: {
            telephone: String,
            website: String,
        },

        location: {
            type: {type:String},
            coordinates: [Number], // [<longitude>, <latitude>]
        },

        addedBy: {type: String}, // user id of the owner

        rating: {
            averageScore: Number,
            totalScore: Number,
            score1: Number,
            score2: Number,
            score3: Number,
            score4: Number,
            score5: Number,
        },
        reviews: [ReviewSchema]
    }
);

Restaurant.index({location: '2dsphere'});

var restaurantModel = mongoose.model('Restaurant', Restaurant );
// export the restaurant model
module.exports = restaurantModel;
