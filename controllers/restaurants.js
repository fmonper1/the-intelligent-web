var Restaurant = require('../models/Restaurants');

exports.getAge = function (req, res) {
    var userData = req.body;
    if (userData == null) {
        res.status(403).send('No data sent!')
    }
    try {
        var query = {};
        query['$and']=[];
        if (userData.name.length > 0) {
            query["$and"].push({ name: userData.name}); // add to the query object
        }
        if(userData.cuisine.length > 0){
            query["$and"].push({ typeOfCuisine:  userData.cuisine });
        }
        console.log(query)

        Restaurant.find(query,
            'name typeOfCuisine address',
            function (err, restaurants) {
                if (err)
                    res.status(500).send('Invalid data!');
                var restaurant = null;
                if (restaurants.length > 0) {
                    var firstElem = restaurants[0];
                    restaurant = {
                        name: firstElem.name, cuisine: firstElem.typeOfCuisine,
                        address: firstElem.address
                    };
                }
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(restaurants));
            });
    } catch (e) {
        res.status(500).send('error ' + e);
    }
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

        Restaurant.find({
            loc: {
                $near: coords,
                $maxDistance: maxDistance
            }
        }).exec()
        .then(function(location) {
            console.log(location);
        });
        .then()

    } catch (e) {
        res.status(500).send('error ' + e);
    }
}
