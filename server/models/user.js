'use strict';

var mongoose = require('mongoose');
var _ = require('lodash');

function User() {
    var Schema = mongoose.Schema;

    var drugSchema = new Schema({
        fdaId: String,
        userComments: String
    });

    var userSchema = new Schema({
        firstName: String,
        lastName: String,
        email: { type: String, index: { unique: true } },
        password: String,
        token: String,
        drugs: [drugSchema]
    });

    userSchema.pre('validate', function(next) {
        var drugsUnique = _.unique(this.drugs, function(drug) { return drug.fdaId; });
        if(drugsUnique.length !== this.drugs.length) {
            next(Error("Cannot add the same drug twice"));
        }
        else
        {
            next();
        }
    });

    var userModel = mongoose.model('user', userSchema);
    return userModel;
}

module.exports = User;
