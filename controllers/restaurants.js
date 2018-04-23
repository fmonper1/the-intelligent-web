var Restaurant = require('../models/Restaurants');
var Review = require('../models/Reviews');
var ObjectId = require('mongodb').ObjectID;

exports.queryDB = function (req, res) {
    var userData = req.body;
    if (userData == null) {
        res.status(403).send('No data sent!')
    }
    try {
        var query = {};
        query['$and']=[];
        if (userData.name.length > 0) {
            var x = userData.name.split(",");
            regex = x.map(function (e) { return new RegExp(e.trim(),"i");});
            query["$and"].push({ name: {$in: regex}}); // add to the query object
        }
        if(userData.cuisine.length > 0){
            var x = userData.cuisine.split(",");
            regex = x.map(function (e) { return new RegExp(e.trim(),"i");});
            query["$and"].push({ typeOfCuisine: {$in : regex }});
        }
        if(userData.postcode.length > 0){
            query["$and"].push({ "address.postcode" :  { $regex : new RegExp(userData.postcode, "i") } });
        }
        if(userData.street.length > 0){
            query["$and"].push({ "address.streetName" :  { $regex : new RegExp(userData.street, "i") } });
        }
        console.log(query)

        Restaurant.find(query,
            'name typeOfCuisine address',
            function (err, restaurants) {
                if (err)
                    res.status(500).send('Invalid data!');
                // var restaurant = null;
                // if (restaurants.length > 0) {
                //     var firstElem = restaurants[0];
                //     restaurant = {
                //         name: firstElem.name, cuisine: firstElem.typeOfCuisine,
                //         address: firstElem.address
                //     };
                // }
                // res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(restaurants));
            });
    } catch (e) {
        res.status(500).send('error ' + e);
    }
}

exports.findOneRestaurant = function(index, req, res) {
    //var userData = req.params.id;
    if (index == null) {
        res.status(403).send('No data sent!')
    }
    return new Promise(function (fulfill, reject){

        try {
        var query = {};
        //query['_id'] = [ObjectID(index)];
        console.log(query);
        Restaurant.find(ObjectId(index),
            function (err, result) {
                if (err)
                    res.status(500).send('Invalid data!');
                //console.log(result);
                fulfill(result) ;
                //res.setHeader('Content-Type', 'application/json');
                //res.send(JSON.stringify(restaurants));
            });
        } catch (e) {
            res.status(500).send('error ' + e);
            console.log(e);
            reject(e);
        }
    });
}

exports.insert = function (req, res) {
    var userData = req.body;
    if (userData == null) {
        res.status(403).send('No data sent!')
    }
    try {
        var restaurant = new Restaurant({
            name: userData.name,
            typeOfCuisine: userData.cuisine,
            address: userData.address
        });
        console.log('received: ' + restaurant);

        restaurant.save(function (err, results) {
            console.log(results._id);
            if (err)
                res.status(500).send('Invalid data!');

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(restaurant));
        });
    } catch (e) {
        res.status(500).send('error ' + e);
    }
}

exports.queryByRadius = function(req, res) {
    var userData = req.body;
    if (userData == null) {
        res.status(403).send('No data sent!')
    }
    try {
        console.log("data to post")
        console.log(userData);

        var limit = userData.limit || 10;

        // get the max distance or set it to 8 kilometers
        var maxDistance = userData.searchRadius || 8;

        // we need to convert the distance to radians
        // the raduis of Earth is approximately 6371 kilometers
        maxDistance /= 6371;

        // get coordinates [ <longitude> , <latitude> ]
        var coords = [];
        coords[0] = parseFloat(userData.longitude);
        coords[1] = parseFloat(userData.latitude);


        var query = Restaurant.find({
            loc : { $nearSphere : coords, $maxDistance: maxDistance }
        }).limit(limit);

        // var query = Restaurant.findOne({});

        query.exec(function (err, city) {
            if (err) {
                console.log(err);
                throw err;
            }

            if (!city) {
                res.json({});
            } else {
                console.log('Cant save: Found city:' + city);
                res.json(city);
            }

        });

    } catch (e) {
        res.status(500).send('error ' + e);
    }
}

exports.addReview = function ( req, res) {
    var data = req.body;
    console.log(req.params.id);
    return new Promise(function (fulfill, reject){
        if (data.userScore == null) {
            reject("NoData");
        }
        try {
            var review = new Review({
                postedData: Date.now(),
                postedBy: "none",
                score: data.userScore,
                reviewTitle: data.reviewTitle,
                review: data.reviewBody
            });
            console.log('received: ' + review);

            //construct query to update a specific rating field in the docs
            var toUpdate = "rating.score"+data.userScore;
            var queryExec = {};
            queryExec[toUpdate] = +1;
            queryExec['totalScore'] = +data.userScore

            Restaurant.findOneAndUpdate(
                {_id: req.params.id},
                {
                    $push: {
                        "reviews": review
                    },
                    $inc: queryExec,

                },
                {safe: true, upsert: true, new : true},
                function(err, model) {
                    if(err) console.log(err);
                    fulfill(model);

                });

        } catch (e) {
            reject(e);
        }
    });
}