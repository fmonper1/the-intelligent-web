var mongoose = require('mongoose');
var Restaurant = require('../models/Restaurants');


exports.init= function() {
    //uncomment if you need to drop the database
    //
    //Restaurant.remove({}, function(err) {
        //     console.log('collection removed')
        // });
        //
        // //Populate database with new restaurants
        //
        // var restaurant = new Restaurant({
        //     name: 'BurgerQueen2',
        //     typeOfCuisine: ['Fast Food', 'Burger'],
        //     officialPhoto: "uploads/burgerking.png",
        //     hasDelivery: true,
        //     photoGallery : [],
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
        //     hasDelivery: true,
        //     photoGallery : [],
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
        //     name: 'Ziyas Asian Grill',
        //     typeOfCuisine: ['Indian', 'Curry', 'Vegeterian'],
        //     officialPhoto: "uploads/whatkind.png",
        //     hasDelivery: true,
        //     photoGallery : [],
        //     address: {
        //         streetName:'Wilmslow Road',
        //         city: 'Manchester',
        //         postcode: 'M14 5TB',
        //         county:'Lancashire',
        //         country: 'England'
        //     },
        //     contactDetails: {
        //         telephone: "01612572010",
        //         website: "www.ziyarestaurant.co.uk"
        //     },
        //     location: {
        //         type: "Point",
        //         coordinates: [-2.2255106, 53.4564989],
        //     },
        //     addedBy: "admin",
        //     rating: {
        //         averageScore: 4,
        //         totalScore: 8,
        //         score1: 0,
        //         score2: 0,
        //         score3: 1,
        //         score4: 0,
        //         score5: 1,
        //     },
        //     reviews: [
        //         {
        //             postedBy: "Ganga",
        //             score: 5,
        //             reviewTitle: "Excellent",
        //             review: "Nice food at a good price"},
        //
        //         {
        //             postedBy: "Manvir",
        //             score: 3,
        //             reviewTitle: "Fantastic",
        //             review: "Desserts were fantastic"}
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
        //     name: 'Sweet Basil Valley',
        //     typeOfCuisine: ['Thai', 'Vegan'],
        //     officialPhoto: "uploads/whatkind.png",
        //     hasDelivery: false,
        //     photoGallery : [],
        //     address: {
        //         streetName:'Green Lane',
        //         city: 'Leeds',
        //         postcode: 'LS19 7BY',
        //         county:'Yorkshire',
        //         country: 'England'
        //     },
        //     contactDetails: {
        //         telephone: "01132500220",
        //         website: "https://www.sweetbasilrestaurant.com"
        //     },
        //     location: {
        //         type: "Point",
        //         coordinates: [-1.6876796,53.858473],
        //     },
        //     addedBy: "admin",
        //     rating: {
        //         averageScore: 2,
        //         totalScore: 2
        //         score1: 0,
        //         score2: 1,
        //         score3: 0,
        //         score4: 1,
        //         score5: 0,
        //     },
        //     reviews: [
        //         {
        //             postedBy: "Rajeev",
        //             score: 2,
        //             reviewTitle: "Not Worth the money",
        //             review: "Average quality of food and very expensive for each dish"}
        //     ]
        // });
        // console.log('name: '+restaurant4._id);
        //
        // restaurant4.save(function (err, results) {
        //     if (err) console.log(err);
        //     console.log(results._id);
        // });

        // var restaurant5 = new Restaurant({
        //     name: 'Subway',
        //     typeOfCuisine: ['Fast Food', 'Sandwiches'],
        //     officialPhoto: "uploads/whatkind.png",
        //     hasDelivery: false,
        //     photoGallery : [],
        //     address: {
        //         streetName:'Devonshire Street',
        //         city: 'Sheffield',
        //         postcode: 'S3 7SF',
        //         county:'South Yorkshire',
        //         country: 'England'
        //     },
        //     contactDetails: {
        //         telephone: "01142796299",
        //         website: "subway.co.uk"
        //     },
        //     location: {
        //         type: "Point",
        //         coordinates: [-1.4779993,53.3795023],
        //     },
        //     addedBy: "admin",
        //     rating: {
        //         averageScore: 4.5,
        //         totalScore: 9,
        //         score1: 0,
        //         score2: 0,
        //         score3: 0,
        //         score4: 1,
        //         score5: 1,
        //     },
        //     reviews: [
        //         {
        //             postedBy: "Anonymus",
        //             score: 4,
        //             reviewTitle: "Nice",
        //             review: "Good sandwiches and lots of variety"},
        //{
        //             postedBy: "Ben",
        //             score: 5,
        //             reviewTitle: "Fabulous Sandwiches",
        //             review: "Love the place, its my usual lunch spot"}
        //     ]
        // });
        // console.log('name: '+restaurant5._id);
        //
        // restaurant5.save(function (err, results) {
        //     if (err) console.log(err);
        //     console.log(results._id);
        // });

        // var restaurant6 = new Restaurant({
        //     name: 'Pizza Express',
        //     typeOfCuisine: ['Pizza', 'Vegan', 'Pasta'],
        //     officialPhoto: "uploads/whatkind.png",
        //     hasDelivery: true,
        //     photoGallery : [],
        //     address: {
        //         streetName:'Devonshire Street',
        //         city: 'Sheffield',
        //         postcode: 'S3 7SF',
        //         county:'South Yorkshire',
        //         country: 'England'
        //     },
        //     contactDetails: {
        //         telephone: "01142752755",
        //         website: "pizzaexpress.com"
        //     },
        //     location: {
        //         type: "Point",
        //         coordinates: [-1.4779993,53.3795023],
        //     },
        //     addedBy: "admin",
        //     rating: {
        //         averageScore: 2,
        //         totalScore: 2,
        //         score1: 0,
        //         score2: 1,
        //         score3: 0,
        //         score4: 0,
        //         score5: 0,
        //     },
        //     reviews: [
        //         {
        //             postedBy: "Rajeev",
        //             score: 2,
        //             reviewTitle: "Not Worth the money",
        //             review: "Average quality of food and very expensive for each dish"}
        //     ]
        // });
        // console.log('name: '+restaurant6._id);
        //
        // restaurant6.save(function (err, results) {
        //     if (err) console.log(err);
        //     console.log(results._id);
        // });

    // var restaurant7 = new Restaurant({
    //     name: 'Mcdonalds',
    //     typeOfCuisine: ['Burger', 'Fast Food', 'Chicken'],
    //     officialPhoto: "uploads/whatkind.png",
    //     hasDelivery: false,
    //     photoGallery : [],
    //     address: {
    //         streetName:'High Street',
    //         city: 'Sheffield',
    //         postcode: 'S1 2GE',
    //         county:'South Yorkshire',
    //         country: 'England'
    //     },
    //     contactDetails: {
    //         telephone: "01142752605",
    //         website: " mcdonalds.co.uk"
    //     },
    //     location: {
    //         type: "Point",
    //         coordinates: [-1.4675448,53.3824494],
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
    //             postedBy: "Jack",
    //             score: 5,
    //             reviewTitle: "Great Place",
    //             review: "Love the place, my standard meal after a night out"}
    //     ]
    // });
    // console.log('name: '+restaurant7._id);
    //
    // restaurant7.save(function (err, results) {
    //     if (err) console.log(err);
    //     console.log(results._id);
    // });

}

