'use strict';

var userModel = require('../models/user')();
var service = require('../services/userService')(userModel);
var Joi = require('joi');

module.exports = {
    getUserByToken: {
        handler: function(request, reply) {
            service.getUserByToken(request.params.token, function(user) {
               reply(user);
            });
        }
    },
    addDrugToUser: {
        handler: function(request, reply) {
            service.addDrugToUser(request.params.token, request.payload, function(err) {
                if(!err)
                    reply('http://' + request.info.host + request.path).code(201);
                else
                    reply(err).code(500);
            });
        },
        validate: {
            payload: Joi.object().keys({
                drugId: Joi.string().guid(),
                userComments: Joi.string()
            })
        }
    }
};
