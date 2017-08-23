'use strict';

let Command = require('../Command');
let Light = require('../../models/Light');

const VALID_LIGHT_ATTRIBUTES = [
    'id',
    'name'

    // Valid attributes per https://developers.meethue.com/documentation/lights-api
    // Unused in this demo application

    // 'type',
    // 'uniqueid',
    // 'manufacturername',
    // 'luminaireuniqueid',
    // 'modelid',
    // 'productid',
    // 'swversion',
    // 'pointsymbol'
];

const VALID_LIGHT_STATE_ATTRIBUTES = [
    'on',
    'bri'

    // Valid state attibutes per https://developers.meethue.com/documentation/lights-api
    // Unused in this demo application

    // 'reachable',
    // 'colormode',
    // 'hue',
    // 'sat',
    // 'xy',
    // 'ct',
    // 'alert',
    // 'effect'
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

        // Only store valid attributes to our light
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

        // Only store valid attributes to our state
        for (let key of VALID_LIGHT_STATE_ATTRIBUTES) {
            if (key in result) {
                state[key] = result[key];
            }
        }

        return state;
    }
}

module.exports = LightCommand;