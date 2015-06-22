'use strict';

var _ = require('lodash');
var request = require('request');
var config = require('../config');

function DrugService() {
    var pub = {};
    pub.searchDrug = function(term, callback) {
        // call the FDA API
        var apiUrl = config.fdaApi.baseUrl + '/drug/label.json?api_key=' + config.fdaApi.apiKey + '&search=brand_name:' + term + "+generic_name:" + term;
        if(config.fdaApi.maxResults) {
            apiUrl += '&limit=' + config.fdaApi.maxResults
        }
        request(apiUrl, function(error, response, bodyRaw) {
            var body = JSON.parse(bodyRaw);
            var resultsObj = _.map(body.results, function(result) { return { fdaId: result.id, brandName: result.openfda.brand_name, genericName: result.openfda.generic_name }; });
            resultsObj = _.sortBy(resultsObj, 'brandName');
            callback(resultsObj);
        });
    };

    return pub;
}

module.exports = DrugService;
