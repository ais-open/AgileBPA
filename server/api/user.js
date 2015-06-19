'use strict';

var userModel = require('../models/user')();
var service = require('../services/userService')(userModel);

module.exports = {
    getUserByToken: function(request, reply) {
        service.getUserByToken(request.params.token, function(user) {
           reply(user);
        });
    }
};
