var mongoose = require('mongoose');
var Restaurant = require('../models/Restaurants');


exports.init= function() {
    // uncomment if you need to drop the database

    // Restaurant.remove({}, function(err) {
    //     console.log('collection removed')
    // });
    //
    //
    //
    // var restaurant = new Restaurant({
    //     name: 'BurgerQueen',
    //     typeOfCuisine: ['Fast Food', 'Burgers'],
    //     officialPhoto: "uploads/burgerking.png",
    //     address: {
    //         streetName:'West Street',
    //         city: 'Sheffield',
    //         postcode: 'S37bw',
    //         county:'South Yorkshire',
    //         country: 'England'
    //     },
    //     contactDetails: {
    //         telephone: "9222334398",
    //         website: "http://localhost:3003"
    //     },
    //     loc: {
    //         coordinates: [-1.4820851, 53.3816197],
    //     },
    //     addedBy: "admin",
    //     rating: {
    //         averageScore: 3.5,
    //          totalScore: 7,
    //             score1: 0,
    //             score2: 0,
    //             score3: 1,
    //             score4: 1,
    //             score5: 0,
    //     },
    //     reviews: [
    //         {
    //             postedBy: "Ferni",
    //             score: 4,
    //             reviewTitle: "Excellent",
    //             review: "Nice food at a good price"},
    //
    //         {
    //             postedBy: "Fernifofer",
    //             score: 3,
    //             reviewTitle: "Una de cal otra de arena",
    //             review: "Desserts were dirty"}
    //     ]
    // });
    // console.log('name: '+restaurant._id);
    //
    // restaurant.save(function (err, results) {
    //     if (err) console.log(err);
    //     console.log(results._id);
    // });
}

