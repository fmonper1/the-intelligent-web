var mongoose = require('mongoose');
var Restaurant = require('../models/Restaurants');


exports.init= function() {
    // uncomment if you need to drop the database

    // Restaurant.remove({}, function(err) {
    //    console.log('collection removed')
    // });

    // const dob=new Date(1908, 12, 1).getFullYear();


    // var restaurant = new Restaurant({
    //      name: 'Chinese Santa Cruz',
    //      typeOfCuisine: ['Fast Food', 'Mexican'],
    //      address: '42 West Street',
    //      loc: [-16.251573,28.463630]
    // });
    // console.log('name: '+restaurant.loc);
    //
    // restaurant.save(function (err, results) {
    //     if (err) console.log(err);
    //     console.log(results._id);
    // });
}

