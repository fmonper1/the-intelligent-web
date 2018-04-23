var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Review = new Schema(
    {
        postedDate: Date,
        postedBy: String,
        score: Number,
        reviewTitle:String,
        review: String
    }
);

var reviewModel = mongoose.model('Review', Review );
// var reviewModel = mongoose.model('Review', Review);


module.exports = reviewModel;