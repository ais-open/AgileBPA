'use strict';

var _ = require('lodash');
var request = require('request');
var config = require('../config');
var randomstring = require('randomstring');

function UserService(UserModel) {
    var pub = {};
    pub.getUserByToken = function(token, callback) {
        UserModel.findOne({ 'token' : token }, function(err, userDoc) {
            if(userDoc)
            {
                var user = userDoc.toObject();
                // go lookup drugs in the FDA API
                var fdaIds = _.pluck(user.drugs, 'fdaId').join('+id:');

                // call the API
                var apiUrl = config.fdaApi.baseUrl + '/drug/label.json?api_key=' + config.fdaApi.apiKey + '&search=id:' + fdaIds + '&limit=' + user.drugs.length;
                request(apiUrl, function(error, response, bodyRaw) {
                    var body = JSON.parse(bodyRaw);
                    _.each(body.results, function(result) {
                        // for each result returned from the API, go find that record in the original results and "hydrate" the drug information
                        var match = _.find(user.drugs, { 'fdaId' : result.id });
                        match.activeIngredients = result.active_ingredient;
                        match.brandName = result.openfda.brand_name;
                        match.genericName = result.openfda.generic_name;
                        match.manufacturerName = result.openfda.manufacturer_name;
                        match.inactiveIngredients = result.inactive_ingredient;
                        match.dosage = result.dosage_and_administration;
                        match.usage = result.indications_and_usage;
                        match.purpose = result.purpose;
                        match.warnings = result.warnings;
                        match.whenUsing = result.when_using;
                    });

                    callback(user);
                });
            }
            else
            {
                callback(err);
            }
        });
    };

    pub.addUser = function(params, callback) {
        var user = new UserModel({
            firstName: params.firstName,
            lastName: params.lastName,
            email: params.email,
            token: randomstring.generate(8)
        });
        user.save(callback);
    };

    pub.updateUser = function(token, params, callback) {
        var updateObj = _.pick(params, ['firstName', 'lastName', 'email']);
        UserModel.findOneAndUpdate({ 'token': token }, updateObj, callback);
    };

    pub.deleteUser = function(token, callback) {
        UserModel.findOneAndRemove({ 'token' : token }, callback);
    };

    pub.addUserDrug = function(token, params, callback) {
        UserModel.findOne({ 'token' : token }, function(err, userDoc) {
            if(userDoc)
            {
                userDoc.drugs = userDoc.drugs || [];
                userDoc.drugs.push({
                    fdaId: params.fdaId,
                    userComments: params.userComments
                });
                userDoc.save(callback);
            }
            else
            {
                callback(err);
            }
        });
    };

    pub.updateUserDrug = function(token, fdaId, params, callback) {
        UserModel.findOne({ 'token' : token }, function(err, userDoc) {
            if(userDoc) {
                var userDrugToUpdate = _.find(userDoc.drugs, { 'fdaId' : fdaId });
                if(userDrugToUpdate) {
                    userDrugToUpdate.userComments = params.userComments;
                    userDoc.save(callback);
                }
                else {
                    callback();
                }
            }
            else {
                callback(err);
            }
        });
    };

    pub.deleteUserDrug = function(token, fdaId, callback) {
        UserModel.findOne({ 'token' : token }, function(err, userDoc) {
            if(userDoc) {
                var userDrugToRemove = _.find(userDoc.drugs, { 'fdaId' : fdaId });
                if(userDrugToRemove) {
                    userDoc.drugs.splice(userDoc.drugs.indexOf(userDrugToRemove), 1);
                    userDoc.save(callback);
                }
                else {
                    callback();
                }
            }
            else {
                callback(err);
            }
        });
    };

    return pub;
}

module.exports = UserService;
