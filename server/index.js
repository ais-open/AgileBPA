'use strict';

var Hapi = require('hapi');
var server = new Hapi.Server();
server.connection({port: parseInt(process.env.PORT, 10) || 3000});

server.route({
    method: 'GET',
    path: '/api',
    handler: function(request, reply) {
        reply({ 'api' : 'hello!' });
    }
});

server.start(function() {
    console.log('Node/Hapi running on port ' + server.info.port);
});