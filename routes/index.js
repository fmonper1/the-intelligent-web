var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
// Define where the MongoDB server is
var url = 'mongodb://localhost:27017/intelligentWeb';

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/restaurantList', function(req, res, next) {

    // Connect to the server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the Server', err);
        } else {
            // We are connected
            console.log('Connection established to', url);

            // Get the documents collection
            var dbo = db.db("intelligentWeb");
            var collection = dbo.collection('resturants');

            findDocuments(collection);
            db.close();
        }
    });

    function findDocuments(col) {
        col.find({}).toArray(function (err, result) {
            if (err) {
                res.send(err);
            } else if (result.length) {
                res.render('resturants',{
                    "resturantlist" : result
                });
            } else {
                res.send('No documents found');
            }
        })
    };

});


module.exports = router;
