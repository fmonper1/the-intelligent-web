var mongoose = require('mongoose');
var Restaurant = require('../models/Restaurants');


exports.init= function() {
    // uncomment if you need to drop the database

    // Restaurant.remove({}, function(err) {
    //    console.log('collection removed')
    // });

    // const dob=new Date(1908, 12, 1).getFullYear();

    //
    // var restaurant = new Restaurant({
    //     restaurant_tid: 1,
    //     name: 'DrDonnonMaxRestaurant',
    //     typeOfCuisine: ['Fast Food', 'Chicken'],
    //     address: {streetName:'West Street',
    //         city: 'Sheffield',
    //         postcode: 'S37bw',
    //         county:'South Yorkshire',
    //         country: 'England'},
    //     loc: [-1.5, 53.55],
    //     addedBy: "admin",
    //     reviews: [
    //         {
    //             postedBy: "Ferni",
    //             score: 5,
    //             review: "Nice food at a good price"},
    //
    //         {
    //             postedBy: "Fernifofer",
    //             score: 3,
    //             review: "Desserts were dirty"}
    //     ]
    // });
    // console.log('name: '+restaurant.loc);
    //
    // restaurant.save(function (err, results) {
    //     if (err) console.log(err);
    //     console.log(results._id);
    // });
}

