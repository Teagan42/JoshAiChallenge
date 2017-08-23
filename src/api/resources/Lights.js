'use strict';

let BaseResource = require('./BaseResource');
let Light = require('../models/Light');

// Commands
let GetLights = require('../commands/light/GetLights');
let GetLight = require('../commands/light/GetLight');

class Lights extends BaseResource {
    constructor(client) {
        super(client);

        this.Light = Light;
    }

    getAll() {
        console.log('Command: getAllLights');
        return new GetLights(this.client).invoke();
    }

    getById(lightId) {
        return new GetLight(this.client, lightId).invoke();
    }
}

module.exports = Lights;