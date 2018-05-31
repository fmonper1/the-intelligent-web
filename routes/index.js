var express = require('express');
var router = express.Router();
var bodyParser= require("body-parser");
var formidable = require('formidable');
var fs = require('fs');

var restaurant = require('../controllers/restaurants');
var initDB= require('../controllers/init');
initDB.init();

var auth = require("../controllers/auth.js");
var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}


// restrict index for logged in user only
router.get('/index', function(req, res){
    res.render('index', { user: req.user });
});

router.post('/index', restaurant.queryDB);


// route to register page
router.get('/register', function(req, res){
    res.render('register', { user: req.user });
});

// route for register action
router.post('/register', auth.doRegister);

// route to login page
router.get('/login', function(req, res){
    res.render('login', { user: req.user });
});

// route for login action
router.post('/login', auth.doLogin);

// route for logout action
router.get('/logout', auth.logout);

/* GET home page. */
router.get('/insert', isAuthenticated, function(req, res){
    res.render('insert', { user: req.user });
});

router.post('/insert', restaurant.insert);


/* GET home page. */
router.get('/radius', function(req, res, next) {
    res.render('radius', { title: 'My Form' });
    //console.log("algo");
});

router.post('/radius', restaurant.queryByRadius);

router.get('/restaurant/:id', function (req, res, next) {
    console.log('ID:', req.params.id);
    return restaurant.findOneRestaurant(req.params.id, req, res).then(function(result) {
        // io.sockets.on('connection', "a user conecter v2" );

        res.render('restaurant', {title: result[0].name, restaurant: result, user: req.user});
    });

});

router.get('/fileupload', function(req, res, next) {
    res.render('fileupload', { title: 'My Form' });
});

router.post('/fileupload', function(req,res,next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;
        var newpath = '../public/uploads/' + files.filetoupload.name;
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            res.write('File uploaded and moved!');
            res.end();
        });
    });
});

router.post('/restaurant/:id',restaurant.findOneRestaurant);

router.post('/restaurant/:id/addReview', restaurant.addReview);


module.exports = router;