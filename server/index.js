'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config');

// Hapi
var Hapi = require('hapi');
var server = new Hapi.Server();
server.connection({ port: config.port });

server.route(require('./routes'));

server.start(function() {
    console.log('Node/Hapi running on port ' + server.info.port);
});

// Mongoose
var mongoose = require('mongoose');
mongoose.connect(config.mongoConnectionString);
