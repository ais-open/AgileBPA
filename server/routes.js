'use strict';

var Hello = require('./api/hello');
var User = require('./api/user');

module.exports = [
    {
        method: 'GET',
        path: '/api/hello',
        handler: Hello
    },
    {
        method: 'GET',
        path: '/api/user/{token}',
        config: User.getUserByToken
    },
    {
        method: 'POST',
        path: "/api/user/{token}",
        config: User.addDrugToUser
    }
];
