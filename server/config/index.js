'use strict';

var _ = require('lodash');

// config for all environments
var all = {
    env: process.env.NODE_ENV,
    port: parseInt(process.env.VCAP_APP_PORT, 10) || parseInt(process.env.PORT, 10) || 3000,
    fdaApi: {
        baseUrl: 'https://api.fda.gov',
        apiKey: 'fFm72RvNDnFyimQQcfqCOiXT6DbAQfYMTKzLix6z',
        maxResults: 100 // API currently limits requests to 100 results
    }
};

// get environment-specific config
module.exports = _.merge(
    all,
    require('./' + process.env.NODE_ENV + '.js') || {}
);
