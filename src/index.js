'use strict';

const cliArgs = require('command-line-args');
const cliUsage = require('command-line-usage');
const logger = require('technicolor-logger');

const HueClient = require('./api/Client');
const App = require('./App');

const CLI_PARAM_DEFINITIONS = [
    {
        name: 'debug',
        description: 'Output debug log information',
        alias: 'd',
        type: Boolean,
        defaultValue: false
    }, {
        name: 'host',
        description: 'The domain name of the hue bridge',
        alias: 'h',
        type: String,
        defaultValue: 'Teagans-MBP'
    }, {
        name: 'port',
        description: 'The port for the hue bridge',
        alias: 'p',
        type: Number,
        defaultValue: 3000
    }, {
        name: 'user',
        description: 'The user invoking api calls',
        alias: 'u',
        type: String,
        defaultValue: 'newdeveloper'
    }, {
        name: 'help',
        description: 'Print this page',
        alias: '?',
        type: Boolean,
        defaultValue: false
    }, {
        name: 'color',
        description: 'Color of the main output in the console [black, gray, white, etc.]',
        alias: 'c',
        type: String,
        defaultValue: 'black'
    }
];
const CLI_PARAM_USAGE = [
    {
        header: 'Josh.ai Phillip\'s Hue Challenge',
        content: 'A simple application that polls a Phillip\'s Hue Bridge for state changes in lights.'
    }, {
        header: 'Options',
        optionList: CLI_PARAM_DEFINITIONS
    }
];

const options = cliArgs(CLI_PARAM_DEFINITIONS);

if (options.help) {
    console.log(cliUsage(CLI_PARAM_USAGE));
    return;
}

let consoleLogLevels = [
    'INFO',
    'WARN',
    'ERROR',
    'FATAL'
];

if (options.debug) {
    consoleLogLevels.push('DEBUG');
}

const LOGGER_CONFIG = {
    loggers: [{
        name: 'console',
        levels: consoleLogLevels
    }]
};

if (options.color) {
    LOGGER_CONFIG.loggers[0].colors = [{
        level: 'INFO',
        color: options.color
    }];
}

logger.init(LOGGER_CONFIG);

logger.debug('Initializing Hue Client');

const client = new HueClient(
    logger, {
        host: options.host,
        port: options.port,
        username: options.user,
        timeout: 10000
    });

logger.debug('Initializing App');

const app = new App(
    logger,
    client);

logger.debug('Starting App');
app.run();