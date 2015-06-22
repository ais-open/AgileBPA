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
    addUser: {
        handler: function(request, reply) {
            service.addUser(request.payload, function(err, user) {
                if(!err)
                    reply('http://' + request.info.host + request.path + "/" + user.token).code(201);
                else
                    reply(err).code(500);
            });
        },
        validate: {
            payload: Joi.object().keys({
                firstName: Joi.string(),
                lastName: Joi.string(),
                email: Joi.string().email()
            })
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
                fdaId: Joi.string().guid(),
                userComments: Joi.string()
            })
        }
    }
};
