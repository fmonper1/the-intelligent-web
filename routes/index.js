var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

// router.get('/', function(req, res, next) {
//     res.render('index', { title: 'Express' });
// });

/* GET home page. */
router.get('/', function(req, res, next) {
    var MongoClient = mongodb.MongoClient;

    // Define where the MongoDB server is
    var url = 'mongodb://localhost:27017/intelligentWeb';

    // Connect to the server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the Server', err);
        } else {
            // We are connected
            console.log('Connection established to', url);

            // Get the documents collection
            var dbo = db.db("intelligentWeb");
            var collection = dbo.collection('users');

            // Find all students
            // collection.find({}).toArray(function (err, result) {
            //     if (err) {
            //         res.send(err);
            //     } else if (result.length) {
            //         res.render('studentlist',{
            //
            //             // Pass the returned database documents to Jade
            //             "studentlist" : result
            //         });
            //     } else {
            //         res.send('No documents found');
            //     }
            //     //Close connection
            //     db.close();
            // });
        }

    });
});
module.exports = router;
