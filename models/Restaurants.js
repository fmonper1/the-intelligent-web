
var mongoose = require('mongoose'),
    Review = require('./Reviews.js'),
    ReviewSchema = mongoose.model('Review').schema;

var Schema = mongoose.Schema;

var Restaurant = new Schema(
    {
        name: {type: String, required: true, max: 100},
        typeOfCuisine: [{type: String, required: true, max: 100}],
        officialPhoto: String,

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

// // Virtual for a character's age
// Character.virtual('age')
//     .get(function () {
//         const currentDate = new Date().getFullYear();
//         const result= currentDate - this.dob;
//         return result;
//     });
//
// Character.set('toObject', {getters: true, virtuals: true});

var restaurantModel = mongoose.model('Restaurant', Restaurant );

module.exports = restaurantModel;
