var Restaurant = require('../models/Restaurants');
var Review = require('../models/Reviews');
var ObjectId = require('mongodb').ObjectID;

var NodeGeocoder = require('node-geocoder');

var GeocoderOptions = {
    provider: 'google',

    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: 'AIzaSyDkAOYCfVVZKFmNvBUm9NfY20Up4SveaXQ', // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(GeocoderOptions);

exports.queryDB = function (req, res) {
    var userData = req.body;
    if (userData == null) {
        res.status(403).send('No data sent!')
    }
    geocoder.geocode(userData.city)
    .then(function(geocoded) {
        try {

            console.log("geocoding:");
            console.log(geocoded[0]);
            var coords = [geocoded[0].longitude, geocoded[0].latitude];

            var maxDistance = userData.searchRadius ;
            // we need to convert the distance to radians
            maxDistance /= 6371;

            //store query in variable and push $and operator
            var query = {};
            query['$and']=[];

            // push geolocation query to the query
            query['$and'].push({
                "location" : {
                    $geoWithin : {
                        $centerSphere : [coords, maxDistance ]
                    }
                }
            });

            if (userData.cuisineType != "All") {
                query['$and'].push({"typeOfCuisine": { $in: [ userData.cuisineType ] }});
            }
            console.log(query);

            Restaurant.find(query,
            'name typeOfCuisine address location rating officialPhoto',
            function (err, data) {
                if (err) {
                    console.log(err);
                    throw err;
                }
                if (!data) {
                    console.log("no data found");
                    res.json({});
                } else {
                    console.log(data);
                    res.json(data);
                }

            });

        } catch (e) {
            res.status(500).send('error ' + e);
        }
    })
    .catch(function(err) {
        console.log(err);
    });
};


exports.queryByRadius = function(req, res) {

    var userData = req.body;
    if (userData == null) {
        res.status(403).send('No data sent!')
    }
    try {
        console.log("Data received in POST /radius");
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
        console.log(coords);

        var query = Restaurant.find({
            "location" : {
                $geoWithin : {
                    $centerSphere : [coords, maxDistance ]
                }
            }}
        ).limit(limit);

        // var query = Restaurant.find(
        //     {location : {
        //         $nearSphere: {
        //             $geometry: {
        //                 type: "Point" ,
        //                 coordinates: coords
        //             },
        //             $maxDistance: maxDistance
        //         }
        //     }
        // })

        query.exec(function (err, data) {
            if (err) {
                console.log(err);
                throw err;
            }
            if (!data) {
                console.log("no data found");
                res.json({});
            } else {
                console.log(data);
                res.json(data);
            }

        });

    } catch (e) {
        res.status(500).send('error ' + e);
    }
};

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
};

exports.insert = function (req, res) {
    var userData = req.body;
    if (userData == null) {
        res.status(403).send('No data sent!')
    }
    try {
        var restaurant = new Restaurant({
            name: userData.name,
            typeOfCuisine: userData.cuisine,
            address: {
                streetName: userData.streetName,
                postcode: userData.postcode,
            }
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
};

exports.addReview = function ( req, res) {
    var data = req.body;
    console.log(req.params.id);
    return new Promise(function (fulfill, reject){
        if (data.userScore == null) {
            reject("NoData");
        }
        try {
            var review = new Review({
                postedDate: Date.now(),
                postedBy: data.posterName,
                posterID: ObjectId(data.posterID),
                score: data.userScore,
                reviewTitle: data.reviewTitle,
                review: data.reviewBody
            });
            console.log('received: ' + review);

            //construct query to update a specific rating field in the docs
            var toUpdate = "rating.score"+data.userScore;
            var queryExec = {};
            queryExec[toUpdate] = +1;
            queryExec['rating.totalScore'] = +data.userScore

            Restaurant.findOneAndUpdate(
                {_id: req.params.id},
                {
                    $push: {
                        "reviews": review
                    },
                    $inc: queryExec,

                },
                {
                    safe: true, upsert: true, new : true
                },
                function(err, model) {
                    if(err) console.log(err);
                    fulfill(model);
                });

        } catch (e) {
            reject(e);
        }
    });
};