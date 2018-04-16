var express = require('express');
var router = express.Router();
var bodyParser= require("body-parser");


var restaurant = require('../controllers/restaurants');
var initDB= require('../controllers/init');
initDB.init();


/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'My Form' });
});

router.post('/index', restaurant.getAge);


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

module.exports = router;
