var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ReviewSchema = new Schema(
    {
        postedData: Date,
        postedBy: String,
        score: Number,
        reviewTitle:String,
        review: String
    }
);

var Restaurant = new Schema(
    {
        name: {type: String, required: true, max: 100},
        typeOfCuisine: [{type: String, required: true, max: 100}],
        address: {streetName : String,
            city:String,
            postcode:String,
            county:String,
            country:String},
        loc: {
            type: [Number], // [<longitude>, <latitude>]
            index: '2dSphere'
        },
        addedBy: {type: String}, // user id of the owner
        rating: {
            averageScore: Number,
            score1: Number,
            score2: Number,
            score3: Number,
            score4: Number,
            score5: Number,
        },
        reviews: [ReviewSchema]
    }
);


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