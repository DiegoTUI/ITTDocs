'use strict';

// config.js - Configuration for ITTScheduler

/**
 * ITTAuth configuration object.
 * @namespace {object} config
 * PENDING DOCS
 */

require('prototypes');
var localConfig = require('../../config.json');

// Read global config file, override main file
try {
    var home = process.env.HOME || process.env.USERPROFILE;
    var globalJson = require(home + '/.ittdocs.json');
    localConfig.overwriteWith(globalJson);
} catch (err) {
    // do nothing
}

// Read local config file, override main file
try {
    var localJson = require('../../local_config.json');
    localConfig.overwriteWith(localJson);
} catch (err) {
    // do nothing
}

module.exports = localConfig;
