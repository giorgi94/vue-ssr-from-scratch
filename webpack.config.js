const clientConfig = require('./build/webpack.client');
const serverConfig = require('./build/webpack.server');

module.exports = [clientConfig, serverConfig];
