var express = require('express');
var router = express.Router();
var bodyParser= require("body-parser");

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
        res.render('restaurant', {title: result[0].name, restaurant: result, user: req.user, restid: req.params.id});
    });

});

router.get('/fileupload/:id', function(req, res, next) {
    console.log('ID:', req.params.id);
    res.render('fileupload', { title: 'My Form', uploaded: false, user: req.user });
});

router.post('/fileupload/:id', restaurant.uploadPhoto);

router.get('/multipleupload/:id', function(req, res, next) {
    console.log('ID:', req.params.id);
    res.render('multipleupload', { title: 'My Form', user: req.user });
});
router.post('/multipleupload/:id', restaurant.multipleUpload);

router.post('/fileupload/:id', restaurant.uploadPhoto);

router.post('/restaurant/:id',restaurant.findOneRestaurant);

router.post('/restaurant/:id/addReview', restaurant.addReview);


module.exports = router;