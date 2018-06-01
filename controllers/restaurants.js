var Restaurant = require('../models/Restaurants');
var Review = require('../models/Reviews');
var ObjectId = require('mongodb').ObjectID;
var formidable = require('formidable');
var fs = require('fs');
var NodeGeocoder = require('node-geocoder');

var GeocoderOptions = {
    provider: 'google',
    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: 'AIzaSyDkAOYCfVVZKFmNvBUm9NfY20Up4SveaXQ', // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(GeocoderOptions);
/**
 * uses serialized data to search the db for matching restaurants .
 * @constructor
 * @param {string} req - the data from the form.
 * @param {string} res - response to send back to the client side.
 */
exports.queryDB = function (req, res) {
    var userData = req.body;
    if (userData == null) {
        res.status(403).send('No data sent!')
    }
    if (userData.typeOfSearch == "address") {
        geocoder.geocode(userData.city)
        .then(function(geocoded) {
            try {
                console.log("geocoding:");
                console.log(geocoded[0]);
                var coords = [geocoded[0].longitude, geocoded[0].latitude];

                var maxDistance = userData.searchRadius ;
                maxDistance /= 6371; // convert the distance to radians

                //store query in variable and push $and operator
                var query = {};
                query['$and']=[];

                // push geolocation query
                query['$and'].push({"location": {$geoWithin: {$centerSphere: [coords, maxDistance]}}});

                if (userData.cuisineType != "All") {
                    query['$and'].push({"typeOfCuisine": { $in: [ userData.cuisineType ] }});
                }
                console.log(query);

                Restaurant.find(query,
                'name typeOfCuisine address location rating officialPhoto hasDelivery',
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
    }
    else if (userData.typeOfSearch == "restaurantName") {
        try {
            //store query in variable and push $and operator
            var query = {};
            query['$and']=[];

            query['$and'].push({"name": {$regex:userData.city ,$options:"$i"} });

            if (userData.cuisineType != "All") {
                query['$and'].push({"typeOfCuisine": { $in: [ userData.cuisineType ] }});
            }
            console.log(query);

            Restaurant.find(query,
                'name typeOfCuisine address location rating officialPhoto hasDelivery',
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
    }
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
    var combinedAddress = userData.streetName+", "+userData.city+" "+userData.postcode;
    Promise.all([geocoder.geocode(combinedAddress)]).then(function(values) {
        console.log("geocoded address for new record")
        console.log(values[0][0].latitude);

        try {
            var restaurant = new Restaurant({
                name: userData.name,
                typeOfCuisine: userData.cuisine,
                address: {
                    streetName: userData.streetName,
                    city: userData.city,
                    postcode: userData.postcode,
                    county: userData.county,
                    country: userData.country
                },
                location: {
                    type: "Point",
                    coordinates: [values[0][0].longitude, values[0][0].latitude]
                },
            });
            console.log('received: ' + restaurant);

            restaurant.save(function (err, results) {
                if (err) console.log(err);
                console.log(results._id);

                res.redirect('/fileupload/'+results.id);
            });
        } catch (e) {
            res.status(500).send('error ' + e);
        }

    });

};

exports.uploadPhoto = function(req,res) {
    console.log('ID:', req.params.id);
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;
        var temp = Date.now() + files.filetoupload.name;
        var newpath = '../public/uploads/' + temp;
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
        });
        Restaurant.update(
            { _id: req.params.id },{$set: { officialPhoto: ('uploads/' + temp) }},
            function(err,succ) {
                if (err) console.log(err);
                console.log(succ);
            });

        res.render('fileupload', { title: 'My Form', uploaded: true, user: req.user });
    });
};

exports.multipleUpload = function(req,res) {
    console.log('in /photos handler');
    var form = new formidable.IncomingForm();

    form.on('file', function(field, file) {
        //rename the incoming file to the file's name
        var temp = Date.now() + file.name;
        var newpath = '../public/uploads/' + temp;
        fs.rename(file.path, newpath, function (err) {
            if (err) throw err;
        });
        Restaurant.update(
            { _id: req.params.id },{$push: { photoGallery: ('uploads/' + temp) }},
            function(err,succ) {
                if (err) console.log(err);
                console.log(succ);
            });
    });

    form.on('error', function(err) {
        console.log("an error has occured with form upload");
        console.log(err);
        request.resume();
    });

    form.on('aborted', function(err) {
        console.log("user aborted upload");
    });

    form.on('end', function() {
        console.log('-> upload done');
    });

    form.parse(req, function() {
        res.redirect('/restaurant/'+req.params.id);
    });
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