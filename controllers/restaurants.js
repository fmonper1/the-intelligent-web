/**
 * Module dependencies.
 */
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
    // query by address
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
                // push type of cuisne query
                if (userData.cuisineType != "All") {
                    query['$and'].push({"typeOfCuisine": { $in: [ userData.cuisineType ] }});
                }
                console.log(query);
                // query restaurant collection using constructed query
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
    // query by name
    else if (userData.typeOfSearch == "restaurantName") {
        try {
            //store query in variable and push $and operator
            var query = {};
            query['$and']=[];
            // push name query
            query['$and'].push({"name": {$regex:userData.city ,$options:"$i"} });
            // push cuisine query
            if (userData.cuisineType != "All") {
                query['$and'].push({"typeOfCuisine": { $in: [ userData.cuisineType ] }});
            }
            console.log(query);
            // query restaurant collection using constructed query
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
        // querys restaurant colection around a sphere with specefic radius specified by user
        var query = Restaurant.find({
            "location" : {
                $geoWithin : {
                    $centerSphere : [coords, maxDistance ]
                }
            }}
        ).limit(limit);



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
// this function takes in the id of a restaurant and returns the document of that restaurant
exports.findOneRestaurant = function(index, req, res) {

    if (index == null) {
        res.status(403).send('No data sent!')
    }
    return new Promise(function (fulfill, reject){

        try {
        var query = {};

        console.log(query);
        Restaurant.find(ObjectId(index),
            function (err, result) {
                if (err)
                    res.status(500).send('Invalid data!');

                fulfill(result) ;

            });
        } catch (e) {
            res.status(500).send('error ' + e);
            console.log(e);
            reject(e);
        }
    });
};
// inserts new restaurant added by user to the restaurant collection
exports.insert = function (req, res) {
    var userData = req.body;
    if (userData == null) {
        res.status(403).send('No data sent!')
    }
    // geocodes address to give longitude and latitude to be saved in the collection
    var combinedAddress = userData.streetName+", "+userData.city+" "+userData.postcode;
    Promise.all([geocoder.geocode(combinedAddress)]).then(function(values) {
        console.log("geocoded address for new record")
        console.log(values[0][0].latitude);
        // adds a new restaurant to the Restaurant collection with all the details
        try {
            var restaurant = new Restaurant({
                name: userData.restaurantName,
                typeOfCuisine: userData.cuisine,
                hasDelivery: userData.hasDelivery,
                address: {
                    streetName: userData.streetName,
                    city: userData.city,
                    postcode: userData.postcode,
                    county: userData.county,
                    country: userData.country
                },
                contactDetails:{
                  telephone: userData.telephone,
                  website: userData.website
                },
                location: {
                    type: "Point",
                    coordinates: [values[0][0].longitude, values[0][0].latitude]
                },
            });
            console.log('received: ' + restaurant);
            // saves new restaurant
            restaurant.save(function (err, results) {
                if (err) console.log(err);
                console.log(results._id);
                // redirect to file upload page where user can add official photo for that restaurant
                res.redirect('/fileupload/'+results.id);
            });
        } catch (e) {
            res.status(500).send('error ' + e);
        }

    });

};
// function that allows user to upload a photo when they add a new restaurant
exports.uploadPhoto = function(req,res) {
    console.log('ID:', req.params.id);
    // use formidable package to handle form
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        // take old path from users file system
        var oldpath = files.filetoupload.path;
        // rename file
        var temp = Date.now() + files.filetoupload.name;
        // make new path to save the file to the project directory
        var newpath = '../public/uploads/' + temp;
        // change path of file to new path
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
        });
        // update specific restaurant document to add the offical photo to the collection
        Restaurant.update(
            { _id: req.params.id },{$set: { officialPhoto: ('uploads/' + temp) }},
            function(err,succ) {
                if (err) console.log(err);
                console.log(succ);
            });
        // redirect to success page
        res.redirect('/restaurant/'+req.params.id);
    });
};
// function for users to upload multiple photos to a restaurant
exports.multipleUpload = function(req,res) {
    console.log('in /photos handler');
    var form = new formidable.IncomingForm();
    // for each file in form
    form.on('file', function(field, file) {
        //rename the incoming file to the file's name
        var temp = Date.now() + file.name;
        //make new path to save photo to project directory
        var newpath = '../public/uploads/' + temp;
        fs.rename(file.path, newpath, function (err) {
            if (err) throw err;
        });
        // update restaurant with new photos that were added
        Restaurant.update(
            { _id: req.params.id },{$push: { photoGallery: ('uploads/' + temp) }},
            function(err,succ) {
                if (err) console.log(err);
                console.log(succ);
            });
    });
    // validation to ensure each photo is uploaded correctly
    form.on('error', function(err) {
        console.log("an error has occured with form upload");
        console.log(err);
        request.resume();
    });

    // error message
    form.on('aborted', function(err) {
        console.log("user aborted upload");
    });

    // reached end of form
    form.on('end', function() {
        console.log('-> upload done');
    });

    // parse form
    form.parse(req, function() {
        res.redirect('/restaurant/'+req.params.id);
    });
};

// function to add review posted by user to the database
exports.addReview = function ( req, res) {
    var data = req.body;
    console.log(req.params.id);
    return new Promise(function (fulfill, reject){
        if (data.userScore == null) {
            reject("NoData");
        }
        //add review to the Review collection
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
            // update the reviews with new scores
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