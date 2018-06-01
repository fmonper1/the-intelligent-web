var mongoose = require('mongoose');
var Restaurant = require('../models/Restaurants');


exports.init= function() {
    //uncomment if you need to drop the database
    Restaurant.remove({}, function(err) {
        console.log('collection removed')
    });

    //Populate database with new restaurants

    var restaurant = new Restaurant({
        name: 'Ego Mediterranean Restaurant & Bar',
        typeOfCuisine: ['Mediterranean'],
        officialPhoto: "uploads/ego.jpg",
        hasDelivery: false,
        photoGallery : [],
        address: {
            streetName:'Surrey St',
            city: 'Sheffield',
            postcode: 'S1 2LH',
            county:'South Yorkshire',
            country: 'England'
        },
        contactDetails: {
            telephone: "0114 278 2004",
            website: "egorestaurants.co.uk"
        },
        location: {
            type: "Point",
            coordinates: [-1.468075, 53.380185],
        },
        addedBy: "admin",
        rating: {
            averageScore: 4.5,
            totalScore: 9,
            score1: 0,
            score2: 0,
            score3: 0,
            score4: 1,
            score5: 1,
        },
        reviews: [
            {
                postedBy: "Samantha",
                score: 5,
                reviewTitle: "Excellent",
                review: "A huge thank you to Ego for fantastic service and tasty food yesterday! We booked for 30 people to have a meal following our wedding, the online pre-order service was easy to use and saved a lot of fuss. When we arrived everyone was given place cards with their name and food orders on, this made things very efficient when the food arrived. Everything arrived in a timely manner and was delicious, our waitress was very attentive and nothing was too much trouble. So thanks again we will definitely be back! X"},

            {
                postedBy: "Lee",
                score: 4,
                reviewTitle: "Great",
                review: "I have been to this restaurant on two consecutive Christmas parties and each time the food has been truly excellent. Considering how busy restaurants get at that time of year, the service was very attentive and especially for large groups of people. The food was not 'conveyor belt' either, it was delicious and for three courses, more than satisfied without walking out with a hernia. The restaurant itself is really spacious, a nice modern building that seems to deal with noise very well. I'd like to go for a meal on a different type of night with my family to really check it out but Ego is highly recommended in a city that has more than enough restaurants for people to enjoy."}
        ]
    });
    console.log('name: '+restaurant._id);

    restaurant.save(function (err, results) {
        if (err) console.log(err);
        console.log(results._id);
    });

    var restaurant2 = new Restaurant({
        name: 'Coast to Coast',
        typeOfCuisine: ['American', 'Fast Food', 'Grill'],
        officialPhoto: "uploads/coast.jpg",
        hasDelivery: true,
        photoGallery : [],
        address: {
            streetName:'Broughton Lane',
            city: 'Sheffield',
            postcode: 'S9 2DX',
            county:'South Yorkshire',
            country: 'England'
        },
        contactDetails: {
            telephone: "0114 243 8338",
            website: "c2crestaurants.com"
        },
        location: {
            type: "Point",
            coordinates: [-1.4153159, 53.4017345],
        },
        addedBy: "admin",
        rating: {
            averageScore: 3.5,
            totalScore: 7,
            score1: 0,
            score2: 1,
            score3: 0,
            score4: 0,
            score5: 1,
        },
        reviews: [
            {
                postedBy: "Mazen",
                score: 2,
                reviewTitle: "Disappointing",
                review: "Very disappointing... Went in for breakfast today and the pancakes weren't fresh they didn't even microwave them long enough as they were served cold!! Same goes for the waffles they weren't fresh either which you would expect them to be given the price. McDonald's pancakes taste a lot better and only a fraction of the price. 2 stars instead of 1 as they had decent coffee nonetheless. Overall i think it's way overpriced and I wouldn't recommend having breakfast here"},

            {
                postedBy: "Ellouise",
                score: 5,
                reviewTitle: "Outstanding",
                review: "I visit Coast to Coast on a regular basis and we have never had a poor meal. The staff are absolutely amazing and always provide a high standard of customer service, they are also very talkative, which is great to have!! The menu has a wide variety of choices, and also caters for everyone. The app is also a great part of the restaurant, as you can get some great deals ie, 50% off, free dessert etc.An excellent place and EXCELLENT staff!! See you again soon!"}
        ]
    });
    console.log('name: '+restaurant2._id);

    restaurant2.save(function (err, results) {
        if (err) console.log(err);
        console.log(results._id);
    });

    var restaurant3 = new Restaurant({
        name: 'Hawksmoor Manchester',
        typeOfCuisine: ['Steak', 'Sea Food'],
        officialPhoto: "uploads/hawksmoor.jpg",
        hasDelivery: true,
        photoGallery : [],
        address: {
            streetName:'Deansgate',
            city: 'Manchester',
            postcode: 'M3 3WB',
            county:'Lancashire',
            country: 'England'
        },
        contactDetails: {
            telephone: "0161 836 6980",
            website: "thehawksmoor.com"
        },
        location: {
            type: "Point",
            coordinates: [-2.2493269, 53.4791756],
        },
        addedBy: "admin",
        rating: {
            averageScore: 4.0,
            totalScore: 8,
            score1: 0,
            score2: 0,
            score3: 0,
            score4: 2,
            score5: 0,
        },
        reviews: [
            {
                postedBy: "James",
                score: 4,
                reviewTitle: "Excellent",
                review: "Reservations highly recommended here as it's a very popular place."},

            {
                postedBy: "Sascha",
                score: 4,
                reviewTitle: "Just great.",
                review: "Group of four, different dishes, every one was happy. The filet Steak was just amazing. The wine menu puts loads of Italian restaurants to shame. Staff very attentive and the tables not too close together. I think this is one of the best restaurants I have been to."}
        ]
    });
    console.log('name: '+restaurant3._id);

    restaurant3.save(function (err, results) {
        if (err) console.log(err);
        console.log(results._id);
    });


    var restaurant4 = new Restaurant({
        name: 'Fazenda Leeds',
        typeOfCuisine: ['Vegan', 'Meat', 'Continental'],
        officialPhoto: "uploads/fazenda.jpg",
        hasDelivery: false,
        photoGallery : [],
        address: {
            streetName:'Waterman’s Place Unit 4-7 Granary Wharf',
            city: 'Leeds',
            postcode: 'LS1 4GL',
            county:'Yorkshire',
            country: 'England'
        },
        contactDetails: {
            telephone: "0113 400 1183",
            website: "fazenda.co.uk"
        },
        location: {
            type: "Point",
            coordinates: [-1.548702,53.793398],
        },
        addedBy: "admin",
        rating: {
            averageScore: 4.5,
            totalScore: 9,
            score1: 0,
            score2: 0,
            score3: 0,
            score4: 1,
            score5: 1,
        },
        reviews: [
            {
                postedBy: "Joe",
                score: 5,
                reviewTitle: "Fantastic",
                review: "Absolutely fantastic place. And not just if you like meat. My vegetarian friend had a lovely meal. There is so much choice at the salad/sides bar that you could easily fill up on it."},

            {
                postedBy: "Bill",
                score: 4,
                reviewTitle: "Excellent",
                review: "Excellent service and the menu is very different to most places. Price was reasonable / expected for the kinds of things they serve at around £30 a head."}
        ]
    });
    console.log('name: '+restaurant4._id);

    restaurant4.save(function (err, results) {
        if (err) console.log(err);
        console.log(results._id);
    });


}

