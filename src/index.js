'use strict';

const HueClient = require('./api/Client');
const App = require('./App');
const logger = require('technicolor-logger');

const LOGGER_CONFIG = {
    "loggers": [{
        "name": "console",
        "levels": [
            "INFO",
            "WARN",
            "DEBUG",
            "ERROR",
            "FATAL"
        ],
        "colors": [{
            "level": "INFO",
            "color": "gray"
        }]
    }]
};

logger.init(LOGGER_CONFIG);

logger.debug('Initializing Hue Client');

const client = new HueClient(
    logger, {
        host: 'Teagans-MBP',
        port: 3000,
        username: 'newdeveloper',
        timeout: 10000
    });

logger.debug('Initializing App');

const app = new App(
    logger,
    client);

logger.debug('Starting App');
app.run();