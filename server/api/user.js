'use strict';

var userModel = require('../models/user')();
var service = require('../services/userService')(userModel);
var Joi = require('joi');

module.exports = {
    getUserByToken: {
        handler: function(request, reply) {
            service.getUserByToken(request.params.token, function(user) {
                if(user)
                    reply(user);
                else
                    reply().code(404);
            });
        }
    },
    addUser: {
        handler: function(request, reply) {
            service.addUser(request.payload, function(err, user) {
                if(!err)
                    reply('http://' + request.info.host + request.path + "/" + user.token).code(201);
                else
                    reply(err.message).code(500);
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
    updateUser: {
        handler: function(request, reply) {
            service.updateUser(request.params.token, request.payload, function(err, user) {
                if(!err && user)
                    reply('http://' + request.info.host + request.path + "/" + user.token).code(200);
                else if(!err && !user)
                    reply().code(404);
                else
                    reply(err.message).code(500);
            });
        }
    },
    addDrugToUser: {
        handler: function(request, reply) {
            service.addDrugToUser(request.params.token, request.payload, function(err, user) {
                if(!err && user)
                    reply('http://' + request.info.host + request.path).code(201);
                else if(!err && !user)
                    reply().code(404);
                else
                    reply(err.message).code(500);
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
