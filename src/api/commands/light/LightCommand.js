'use strict';

let Command = require('../Command');
let Light = require('../../models/Light');

const VALID_LIGHT_ATTRIBUTES = [
    'id',
    'name',
    'type',
    'uniqueid',
    'manufacturername',
    'modelid',
    'productid',
    'swversion',
    'swconfigid'
];

const VALID_LIGHT_STATE_ATTRIBUTES = [
    'on',
    'reachable',
    'bri',
    'colormode',
    'hue',
    'sat',
    'xy',
    'ct',
    'transitiontime',
    'alert',
    'effect'
];

class LightCommand extends Command {
    constructor(client) {
        super(client);
    }

    get basePath() {
        return `${super.basePath}/lights`;
    }

    buildLight(result) {
        return new Light(
            this.mapLightAttributes(result),
            this.mapLightState(result.state)
        );
    }

    mapLightAttributes(result) {
        let attributes = {};

        if (result === undefined) {
            return attributes;
        }

        for (let key of VALID_LIGHT_ATTRIBUTES) {
            if (key in result) {
                attributes[key] = result[key];
            }
        }

        return attributes;
    }

    mapLightState(result) {
        let state = {};

        if (result === undefined) {
            return state;
        }

        for (let key of VALID_LIGHT_STATE_ATTRIBUTES) {
            if (key in result) {
                state[key] = result[key];
            }
        }

        return state;
    }
}

module.exports = LightCommand;