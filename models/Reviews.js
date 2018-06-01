var mongoose = require('mongoose');


// Create a new schema for the reviews collection with all the relevant information for a review
var Schema = mongoose.Schema;

var Review = new Schema(
    {
        postedDate: Date,
        postedBy: String,
        score: Number,
        reviewTitle:String,
        review: String,
        photos: {type: [String], default: []},
    }
);

var reviewModel = mongoose.model('Review', Review );


// export the review model
module.exports = reviewModel;