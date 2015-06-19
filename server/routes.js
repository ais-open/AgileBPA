'use strict';

module.exports = [
    {
        method: 'GET',
        path: '/api/hello',
        handler: require('./api/hello')
    },
    {
        method: 'GET',
        path: '/api/user/{token}',
        handler: require('./api/user').getUserByToken
    }
];
