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

// route to register page
router.get('/register', auth.register);

// route for register action
router.post('/register', auth.doRegister);

// route to login page
router.get('/login', auth.login);

// route for login action
router.post('/login', auth.doLogin);

// route for logout action
router.get('/logout', auth.logout);

module.exports = router;

/* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('index', { title: 'My Form' });
// });
// router.get('/index', function(req, res, next) {
//   res.render('index', { title: 'My Form' });
// });

router.post('/index', restaurant.queryDB);


/* GET home page. */
router.get('/insert', function(req, res, next) {
  res.render('insert', { title: 'My Form' });
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
        console.log("result");
        console.log(result);
        res.render('restaurant', {title: result[0].name, restaurant: result, user: req.user});
    });

});

router.post('/restaurant/:id',restaurant.findOneRestaurant);

router.post('/restaurant/:id/addReview', restaurant.addReview);


module.exports = router;
