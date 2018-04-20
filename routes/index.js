var express = require('express');
var router = express.Router();
var bodyParser= require("body-parser");


var restaurant = require('../controllers/restaurants');
var initDB= require('../controllers/init');
initDB.init();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'My Form' });
});
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'My Form' });
});

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
    restaurant.findOneRestaurant(req.params.id, req, res);
});

router.post('/restaurant/:id', restaurant.findOneRestaurant);

module.exports = router;
