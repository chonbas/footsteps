/**
 * Main application file
 */

'use strict';

import express from 'express';
import config from './config/environment';
import http from 'http';
// import bodyParser from 'body-parser';

// Setup server
// var bodyParser = require('body-parser');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser({limit: '50mb'}));
var server = http.createServer(app);
require('./config/express').default(app);
require('./routes').default(app);

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
