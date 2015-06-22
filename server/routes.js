'use strict';

var Hello = require('./api/hello');
var User = require('./api/user');
var Drug = require('./api/drug');

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
    },
    {
        method: 'GET',
        path: '/api/drug',
        config: Drug.searchDrug
    }
];
