
var mongoose = require('mongoose'),
    Review = require('./Reviews.js'),
    ReviewSchema = mongoose.model('Review').schema;

// Create a new schema for the restaurant collection with all the relevant information for a restaurant
var Schema = mongoose.Schema;

var Restaurant = new Schema(
    {
        name: {type: String, required: true, max: 100},
        typeOfCuisine: [{type: String, required: true, max: 100}],
        officialPhoto: {type: String, default: "uploads/default.png"},
        hasDelivery: Boolean,
        photoGallery: {type:[String], default: [] },

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
            averageScore: {type: Number, default: 0},
            totalScore: {type: Number, default: 0},
            score1: {type: Number, default: 0},
            score2: {type: Number, default: 0},
            score3: {type: Number, default: 0},
            score4: {type: Number, default: 0},
            score5: {type: Number, default: 0},
        },
        reviews: [ReviewSchema]
    }
);

Restaurant.index({location: '2dsphere'});

var restaurantModel = mongoose.model('Restaurant', Restaurant );
// export the restaurant model
module.exports = restaurantModel;
