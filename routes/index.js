/**
 * Module dependencies.
 */
var express = require('express');
var router = express.Router();
var bodyParser= require("body-parser");
var passport = require("passport");
var restaurant = require('../controllers/restaurants');
var initDB= require('../controllers/init');
var auth = require("../controllers/auth.js");

initDB.init();

// checks if user is logged in then allows action to be performed else redirects to login page
var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}
// list of the cuisines
var foodList = ["Fast Food", "Burger", "British", "Chicken", "Chinese", "Curry", "Desserts", "Grill", "Healthy", "Indian", "Italian", "Japanese", "Kebab", "Mexican", "Pasta", "Pizza", "Vegan", "Vegetarian", "Sandwiches"] ;

// route to index page and passes in the list of food and user
router.get('/index', function(req, res){
    res.render('index', { user: req.user, foodTypes: foodList });
});
// route to post fromhome page and query db
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

// route for login action that authenticates user and redirects them
router.post('/login', passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/login'
}));

// route for logout action
router.get('/logout', auth.logout);

// route to insert page and passes in the list of food and user
router.get('/insert', isAuthenticated, function(req, res){
    res.render('insert', { user: req.user, foodTypes: foodList });
});
// route for insert action
router.post('/insert', restaurant.insert);


// route for radius action
router.post('/radius', restaurant.queryByRadius);

// route to get restaurant page
router.get('/restaurant/:id', function (req, res, next) {
    // query db to find restaurant using id
    return restaurant.findOneRestaurant(req.params.id, req, res).then(function(result) {
        res.render('restaurant', {title: result[0].name, restaurant: result, user: req.user, restid: req.params.id});
    });

});
// route to post restaurant page
router.post('/restaurant/:id',restaurant.findOneRestaurant);
// route to post review to restaurant page
router.post('/restaurant/:id/addReview', restaurant.addReview);

// route to get file upload page
router.get('/fileupload/:id', function(req, res, next) {
    res.render('fileupload', { title: 'My Form', uploaded: false, user: req.user });
});
// route to post to file upload page
router.post('/fileupload/:id', restaurant.uploadPhoto);

// route to get multiple upload page using restaurant id
router.get('/multipleupload/:id', function(req, res, next) {
    return restaurant.findOneRestaurant(req.params.id, req, res).then(function(result) {
        res.render('multipleupload', {restaurant: result, user: req.user});
    });
});

// route to post multiple upload page
router.post('/multipleupload/:id', restaurant.multipleUpload);

// route to post to file upload page
router.post('/fileupload/:id', restaurant.uploadPhoto);



module.exports = router;