'use strict';

let request = require('request-promise');
let LightCommand = require('./LightCommand');

class GetLight extends LightCommand {
    constructor(client,
                lightId) {
        super(client);
        this.lightId = String(lightId);
    }

    invoke() {
        let options = {
            uri: `${this.basePath}/${this.lightId}`,
            headers: {
                'Content-Type': 'application/json'
            },
            json: true,
            timeout: 10000
        };

        return request(options)
            .then(result => {
                result.id = this.lightId;

                return this.buildLight(result);
            });
    }
}

module.exports = GetLight;