/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

// Create a new schema for the users collection with all the relevant information for a user
var UserSchema = new Schema({
    username: String,
    password: String,
    name: String
});
// passport plugin
UserSchema.plugin(passportLocalMongoose);

//export the users model
module.exports = mongoose.model('Users', UserSchema);
