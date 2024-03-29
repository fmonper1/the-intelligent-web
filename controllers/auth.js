/**
* Module dependencies.
*/
var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/Users");

// Uses passport package to authenticate users and register users

var userController = {};
// Post registration
userController.doRegister = function(req, res) {
    // adds new user to the database
    User.register(new User({ username : req.body.username, name: req.body.name }), req.body.password, function(err, user) {
        if (err) {
            return res.render('register', { user : user });
        }
        // authenticates user and redirects them to the home page
        passport.authenticate('local')(req, res, function () {
            res.redirect('/index');
        });
    });
};

// Post login
userController.doLogin = function(req, res) {
    // authenticates user and redirects them to the home page
    passport.authenticate('local')(req, res, function(err, user, info) {
        // if the users credentials are invalid they are re directed to the login
        // page else redirected to the home page
        if(err) res.redirect('/login');

        res.redirect('/index');
    });

};

// logout
userController.logout = function(req, res) {
    // logs user out and redirects them to the home page
    req.logout();
    res.redirect('/index');
};

module.exports = userController;