'use strict';

var Hapi = require('hapi');
var server = new Hapi.Server();
server.connection({port: parseInt(process.env.PORT, 10) || 3000});

server.route(require('./routes'));

server.start(function() {
    console.log('Node/Hapi running on port ' + server.info.port);
});
