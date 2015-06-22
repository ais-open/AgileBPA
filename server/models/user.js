'use strict';

var mongoose = require('mongoose');

function User() {
    var Schema = mongoose.Schema;

    var drugSchema = new Schema({
        fdaId: String,
        userComments: String
    });

    var userSchema = new Schema({
        firstName: String,
        lastName: String,
        email: String,
        token: String,
        drugs: [drugSchema]
    });

    var userModel = mongoose.model('user', userSchema);
    return userModel;
}

module.exports = User;
