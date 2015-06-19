'use strict';

var _ = require('lodash');

// config for all environments
var all = {
    env: process.env.NODE_ENV,
    port: parseInt(process.env.VCAP_APP_PORT, 10) || parseInt(process.env.PORT, 10) || 3000
};

// get environment-specific config
module.exports = _.merge(
    all,
    require('./' + process.env.NODE_ENV + '.js') || {}
);
