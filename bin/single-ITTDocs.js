'use strict';
/*
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('aop:server');

app.startApp(function(error, address) {
    var bind;
    if (error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        bind = typeof address.port === 'string' ? 'Pipe ' + address.port : 'Port ' + address.port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    } else {
        bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + address.port;
        debug('Listening on ' + bind);
    }
});

