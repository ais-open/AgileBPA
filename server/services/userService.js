'use strict';

var _ = require('lodash');
var request = require('request');
var config = require('../config');

function UserService(UserModel) {
    var pub = {};
    pub.getUserByToken = function(token, callback) {
        UserModel.findOne({ 'token' : token }, function(err, userDoc) {
            var user = userDoc.toObject();
            // go lookup drugs in the FDA API
            var drugIds = _.pluck(user.drugs, 'drugId').join('+id:');

            // call the API
            var apiUrl = config.fdaApi.baseUrl + '/drug/label.json?api_key=' + config.fdaApi.apiKey + '&search=id:' + drugIds + '&limit=' + user.drugs.length;
            request(apiUrl, function(error, response, bodyRaw) {
                var body = JSON.parse(bodyRaw);
                _.each(body.results, function(result) {
                    // for each result returned from the API, go find that record in the original results and "hydrate" the drug information
                    var match = _.find(user.drugs, { 'drugId' : result.id });
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
        });
    };

    pub.addDrugToUser = function(token, params, callback) {
        UserModel.findOne({ 'token' : token }, function(err, userDoc) {
            userDoc.drugs = userDoc.drugs || [];
            userDoc.drugs.push({
                drugId: params.drugId,
                userComments: params.userComments
            });
            userDoc.save(callback);
        });
    };

    return pub;
}

module.exports = UserService;
