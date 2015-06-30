(function () {
    'use strict';

    var _ = require('lodash');
    var request = require('request');
    var config = require('../config');

    var data = getData();

    function DrugService() {
        var pub = {};

        var confidences = {
            'exactMatch': {
                'weight': 10,
                'test': function (item, match) {
                    return item.brand_name.toUpperCase() === match;
                }
            },
            'startsWith': {
                'weight': 5,
                'test': function (item, match) {
                    return item.brand_name.toUpperCase().indexOf(match) === 0;
                }
            },
            'contains': {
                'weight': 2,
                'test': function (item, match) {
                    return item.brand_name.toUpperCase().indexOf(match) !== -1;
                }
            },
            'relevant': {
                'weight': 1,
                'test': function (item, match) {
                    return item.generic_name.toUpperCase().indexOf(match) !== -1;
                }
            }
        };

        pub.searchDrug = function(term, callback) {
            var results = (function (match) {
                var list = [],
                    scores = {};
                var matchLimit = 20;

                list = _.filter(data, function (item) {
                    var score = 0;
                    _.forEach(confidences, function (confidence) {
                        score += confidence.test(item, match) ? confidence.weight : 0;
                    });
                    if (score > 0) {
                        scores[item.id] = score;
                    }
                    return score > 0;
                });
                list = _.sortBy(list, function (item) {
                    return -scores[item.id];
                });

                list = list.slice(0, matchLimit);

                return list;
            })(term.toUpperCase());

            var resultsObj = _.map(results, function(result) {
                return {
                    fdaId: result.id,
                    brandName: [result.brand_name],
                    genericName: [result.generic_name]
                };
            });

            callback(resultsObj);
        };

        return pub;
    }

    function getData() {
        var data = require('../data/drugs-all.min.json');

        String.prototype.toTitleCase = function () {
            return this.replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        };

        data = _.uniq(data, function (item) {
            return item.brand_name.toUpperCase();
        });
        _.forEach(data, function (item) {
            if (item.brand_name.toUpperCase() == item.brand_name) {
                item.brand_name = item.brand_name.toTitleCase();
            }
        });
        data = _.sortBy(data, function (item) {
            return item.brand_name.toUpperCase();
        });

        return data;
    }

    module.exports = DrugService;
})();
