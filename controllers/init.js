var mongoose = require('mongoose');
var Restaurant = require('../models/Restaurants');


exports.init= function() {
    //uncomment if you need to drop the database
    // Restaurant.remove({}, function(err) {
    //     console.log('collection removed')
    // });
    //
    //Populate database with new restaurants
    //
    // var restaurant = new Restaurant({
    //     name: 'BurgerQueen2',
    //     typeOfCuisine: ['Fast Food', 'Burgers'],
    //     officialPhoto: "uploads/burgerking.png",
    //     hasDelivery: true,
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
    //     location: {
    //         type: "Point",
    //         coordinates: [-1.4820851, 53.3816197],
    //     },
    //     addedBy: "admin",
    //     rating: {
    //         averageScore: 3.5,
    //         totalScore: 7,
    //         score1: 0,
    //         score2: 0,
    //         score3: 1,
    //         score4: 1,
    //         score5: 0,
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
    //
    // var restaurant2 = new Restaurant({
    //     name: 'MeadowHallFood',
    //     typeOfCuisine: ['Fast Food', 'Burgers'],
    //     officialPhoto: "uploads/whatkind.png",
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
    //     location: {
    //         type: "Point",
    //         coordinates: [-1.4140689, 53.4125044],
    //     },
    //     addedBy: "admin",
    //     rating: {
    //         averageScore: 3.5,
    //         totalScore: 7,
    //         score1: 0,
    //         score2: 0,
    //         score3: 1,
    //         score4: 1,
    //         score5: 0,
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
    // console.log('name: '+restaurant2._id);
    //
    // restaurant2.save(function (err, results) {
    //     if (err) console.log(err);
    //     console.log(results._id);
    // });
    //
    // var restaurant3 = new Restaurant({
    //     name: 'ManchesterSomething',
    //     typeOfCuisine: ['Lebanese', 'Kebab'],
    //     officialPhoto: "uploads/whatkind.png",
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
    //     location: {
    //         type: "Point",
    //         coordinates: [-2.2426305, 53.4807593],
    //     },
    //     addedBy: "admin",
    //     rating: {
    //         averageScore: 3.5,
    //         totalScore: 7,
    //         score1: 0,
    //         score2: 0,
    //         score3: 1,
    //         score4: 1,
    //         score5: 0,
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
    // console.log('name: '+restaurant3._id);
    //
    // restaurant3.save(function (err, results) {
    //     if (err) console.log(err);
    //     console.log(results._id);
    // });
    //
    //
    // var restaurant4 = new Restaurant({
    //     name: 'FarFrom HomeWith A LongName',
    //     typeOfCuisine: ['Pizza', 'Italian'],
    //     officialPhoto: "uploads/whatkind.png",
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
    //     location: {
    //         type: "Point",
    //         coordinates: [-1.5238897,53.3622742],
    //     },
    //     addedBy: "admin",
    //     rating: {
    //         averageScore: 3.5,
    //         totalScore: 7,
    //         score1: 0,
    //         score2: 0,
    //         score3: 1,
    //         score4: 1,
    //         score5: 0,
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
    // console.log('name: '+restaurant4._id);
    //
    // restaurant4.save(function (err, results) {
    //     if (err) console.log(err);
    //     console.log(results._id);
    // });


}

