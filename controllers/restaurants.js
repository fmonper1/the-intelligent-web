var Restaurant = require('../models/Restaurants');

exports.getAge = function (req, res) {
    var userData = req.body;
    if (userData == null) {
        res.status(403).send('No data sent!')
    }
    try {
        Restaurant.find({typeOfCuisine: userData.cuisine},
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
