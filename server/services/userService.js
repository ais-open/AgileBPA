'use strict';

var _ = require('lodash');
var request = require('request');
var config = require('../config');
var randomstring = require('randomstring');
var bcrypt = require('bcryptjs');

function UserService(UserModel) {
    var pub = {},
        addFdaDrugInfo;

    addFdaDrugInfo = function(userDoc, callback) {
        var user = userDoc.toObject();

        // if there are no drugs execute callback immediately and no further processing is necessary
        if(user.drugs.length) {
            // go lookup drugs in the FDA API
            var fdaIds = _.pluck(user.drugs, 'fdaId').join('+id:');

            // call callback after all AJAX calls are complete (1 for each drug plus 1 more to get all drug details)
            var done = _.after(user.drugs.length + 1, function() {
                callback(user);
            })

            // call the API to get extra drug information
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
                    match.drugInteractions = result.drug_interactions;
                });

                // after we have pulled all the drug names, sort the list
                user.drugs = _.sortBy(user.drugs, 'brandName');

                done();
            });

            // call the API to get drug adverse events
            //https://api.fda.gov/drug/event.json?search=patient.drug.medicinalproduct:metformin+AND+patient.drug.drugcharacterization:1&count=patient.reaction.reactionoutcome
            _.each(user.drugs, function(drug) {
                var adverseEventsApiUrl = config.fdaApi.baseUrl + '/drug/event.json?api_key=' + config.fdaApi.apiKey + '&search=patient.drug.openfda.spl_id:' + drug.fdaId + '+AND+patient.drug.drugcharacterization:1&count=patient.reaction.reactionoutcome';
                request(adverseEventsApiUrl, function(error, reponse, bodyRaw) {
                    var body = JSON.parse(bodyRaw);
                    var adverseEvents = _.map(body.results, function(event) {
                        switch(event.term) {
                            case 1:
                                event.display = "Recovered/Resolved";
                                break;
                            case 2:
                                event.display = "Recovering/Resolving";
                                break;
                            case 3:
                                event.display = "Not Recovered/Not Resolved";
                                break;
                            case 4:
                                event.display = "Recovered/Resolved with Chronic Condition";
                                break;
                            case 5:
                                event.display = "Fatal";
                                break;
                            case 6:
                                event.display = "Unknown";
                                break;
                        }
                        return event;
                    })
                    drug.adverseEvents = adverseEvents;
                    done();
                });
            });
        } else {
            callback(user);
        }
    };

    pub.getUserByToken = function(token, callback) {
        UserModel.findOne({ 'token' : token }, '-password', function(err, userDoc) {
            if(userDoc)
            {
                addFdaDrugInfo(userDoc, callback);
            }
            else
            {
                callback(err);
            }
        });
    };

    pub.authenticateUser = function(email, password, callback) {
        UserModel.findOne({ 'email' : email }, function(err, userDoc) {
            if(userDoc)
            {
                // compare the password
                if(bcrypt.compareSync(password, userDoc.password))
                {
                    // after verifying the password, remove it from the record so it is not returned
                    userDoc.password = undefined;
                    addFdaDrugInfo(userDoc, callback);
                }
                else
                {
                    callback();
                }
            }
            else
            {
                callback(err);
            }
        });
    };

    pub.addUser = function(params, callback) {
        // encrypt password
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(params.password, salt);
        var user = new UserModel({
            firstName: params.firstName,
            lastName: params.lastName,
            email: params.email,
            password: hash,
            token: randomstring.generate(8)
        });
        user.save(callback);
    };

    pub.updateUser = function(token, params, callback) {
        var updateObj = _.pick(params, ['firstName', 'lastName', 'email']);
        UserModel.findOneAndUpdate({ 'token': token }, updateObj, { select: '-password' }, callback);
    };

    pub.deleteUser = function(token, callback) {
        UserModel.findOneAndRemove({ 'token' : token }, { select: '-password' }, callback);
    };

    pub.addUserDrug = function(token, params, callback) {
        UserModel.findOne({ 'token' : token }, '-password', function(err, userDoc) {
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
        UserModel.findOne({ 'token' : token }, '-password', function(err, userDoc) {
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
        UserModel.findOne({ 'token' : token }, '-password', function(err, userDoc) {
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
