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
    //      name: 'DrDonnon',
    //      typeOfCuisine: ['Fast Food', 'Chicken'],
    //     address: {streetName:'West Street',
    //         city: 'Sheffield',
    //         postcode: 'S37bw',
    //         county:'South Yorkshire',
    //         country: 'England'},
    //      loc: [-1.489091, 53.384588]
    // });
    // console.log('name: '+restaurant.loc);
    //
    // restaurant.save(function (err, results) {
    //     if (err) console.log(err);
    //     console.log(results._id);
    // });
}

