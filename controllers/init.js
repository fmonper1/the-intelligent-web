var mongoose = require('mongoose');
var Restaurant = require('../models/Restaurants');


exports.init= function() {
    // uncomment if you need to drop the database

    // Character.remove({}, function(err) {
    //    console.log('collection removed')
    // });

    // const dob=new Date(1908, 12, 1).getFullYear();
    // var restaurant = new Restaurant({
    //     name: 'Taco Bell',
    //     typeOfCuisine: ['Fast Food', 'Mexican'],
    //     address: '42 West Street',
    //     loc: [
    //          28,
    //          16
    //     ],
    // });
    // console.log('name: '+restaurant.name);
    //
    // restaurant.save(function (err, results) {
    //     console.log(results._id);
    // });
}

