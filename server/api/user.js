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
    authenticateUser: {
        handler: function(request, reply) {
            service.authenticateUser(request.payload.email, request.payload.password, function(user) {
                if(user)
                    reply(user);
                else
                    reply().code(401);
            })
        },
        validate: {
            payload: {
                email: Joi.string().email(),
                password: Joi.string()
            }
        }
    },
    addUser: {
        handler: function(request, reply) {
            service.addUser(request.payload, function(err, user) {
                if(!err)
                    //reply('http://' + request.info.host + request.path + "/" + user.token).code(201);
                    reply(user).code(201);
                else
                    reply(err.message).code(500);
            });
        },
        validate: {
            payload: {
                firstName: Joi.string(),
                lastName: Joi.string(),
                email: Joi.string().email(),
                password: Joi.string()
            }
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
    deleteUser: {
        handler: function(request, reply) {
            service.deleteUser(request.params.token, function(err, user) {
                if(!err && user)
                    reply().code(204);
                else if(!err && !user)
                    reply().code(404);
                else
                    reply(err.message).code(500);
            });
        }
    },
    addUserDrug: {
        handler: function(request, reply) {
            service.addUserDrug(request.params.token, request.payload, function(err, user) {
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
    },
    updateUserDrug: {
        handler: function(request, reply) {
            service.updateUserDrug(request.params.token, request.params.fdaId, request.payload, function(err, user) {
                if(!err && user)
                    reply('http://' + request.info.host + request.path + "/" + user.token).code(200);
                else if(!err && !user)
                    reply().code(404);
                else
                    reply(err.message).code(500);
            });
        },
        validate: {
            params: {
                token: Joi.string(),
                fdaId: Joi.string().guid()
            },
            payload: Joi.object().keys({
                userComments: Joi.string()
            })
        }
    },
    deleteUserDrug: {
        handler: function(request, reply) {
            service.deleteUserDrug(request.params.token, request.params.fdaId, function(err, user) {
                if(!err && user)
                    reply().code(204);
                else if(!err && !user)
                    reply().code(404);
                else
                    reply(err.message).code(500);
            });
        },
        validate: {
            params: {
                token: Joi.string(),
                fdaId: Joi.string().guid()
            }
        }
    }
};
