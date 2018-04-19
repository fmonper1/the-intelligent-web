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
    //      name: 'FernisHouse',
    //      typeOfCuisine: ['Fast Food', 'Sandwiches'],
    //     address: {streetName:'West Street',
    //         city: 'Sheffield',
    //         postcode: 'S37GB',
    //         county:'South Yorkshire',
    //         country: 'England'},
    //      loc: [-1.4806097000000003, 53.3901654]
    // });
    // console.log('name: '+restaurant.loc);
    //
    // restaurant.save(function (err, results) {
    //     if (err) console.log(err);
    //     console.log(results._id);
    // });
}

