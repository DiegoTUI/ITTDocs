'use strict';
/**
 * @file ITTDocs application (Part of It's Taxi Time platform)
 * @copyright (c) 2016 HOTELBEDS TECHNOLOGY, S.L.U.
 * @license No license
 * @example
 * Usage:
 *     npm start
 */

/**
 * @module app
 */
var express = require('express');
var http = require('http');
var config = require('./app/config/config');

var app = express();
var server;

/**
 * Swagger configuration
 * @param  {object} app Express APP object
 */
function swaggerConfiguration(app) {
    app.get('/api-docs.json', function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        var yaml = require('js-yaml');
        var resolve = require('json-refs').resolveRefs;
        var fs   = require('fs');

        var index = yaml.safeLoad(fs.readFileSync('./app/swagger/index.yaml', 'utf8'));

        var options = {
            location: './app/swagger',
            processContent: function(content) {
                return yaml.safeLoad(content);
            }
        };

        resolve(index, options).then(function(results) {
            res.send(results.resolved);
        });
    });
}

/**
 * Starts the app.
 * @param callback A callback following the pattern (error, address) to return whether the opening
 * of the app was successful or not. If successful, it returns the address where the app is listening.
 * @memberof module:app
 */
exports.startApp = function(callback) {
    var address;

    app.use(express.static('./public/swagger'));
    swaggerConfiguration(app);

    server = http.createServer(app);

    server.listen(normalizePort(config.port));
    address = server.address();
    server.on('error', onError);
    server.on('listening', onListening);

    function onError(error) {
        return callback(error, address);
    }

    function onListening() {
        return callback(null, address);
    }

    function normalizePort(val) {
        var port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return false;
    }
};

