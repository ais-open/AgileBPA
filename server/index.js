'use strict';

// new relic monitoring
require('newrelic');

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config');

// Hapi
var Hapi = require('hapi');
var server = new Hapi.Server({
    connections: {
        routes: {
            cors: true
        }
    }
});
server.connection({ port: config.port });

// require https in production
if(config.env === 'production')
    server.register(require('hapi-require-https').register, function(err) { if(err) console.log('failed to load hapi-require-https'); });

server.route(require('./routes'));

server.start(function() {
    console.log('Node/Hapi running on port ' + server.info.port);
});

// Mongoose
var mongoose = require('mongoose');
mongoose.connect(config.mongoConnectionString);
