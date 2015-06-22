'use strict';

var service = require('../services/drugService')();
var Joi = require('joi');

module.exports = {
    searchDrug: {
        handler: function(request, reply) {
            service.searchDrug(request.query.term, function(drugs) {
                reply(drugs);
            })
        },
        validate: {
            query: {
                term: Joi.string()
            }
        }
    }
};
