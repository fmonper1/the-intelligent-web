var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Restaurant = new Schema(
    {
        name: {type: String, required: true, max: 100},
        typeOfCuisine: [{type: String, required: true, max: 100}],
        address: {type: String},
        //whatever: {type: String} //any other field
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