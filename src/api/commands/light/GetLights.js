'use strict';

let request = require('request-promise');
let LightCommand = require('./LightCommand');

class GetLights extends LightCommand {
    constructor(client) {
        super(client);
    }

    invoke(client) {
        let options = {
            uri: this.basePath,
            headers: {
                'Content-Type': 'application/json'
            },
            json: true,
            timeout: 1000
        };

        console.log('Options', options);

        return request(options)
            .then(result => {
                console.log('Got', result);
                return Object.keys(result).map(lightId => {
                    result[lightId].id = lightId;

                    return this.buildLight(result[lightId]);
                });
            });
    }
}

module.exports = GetLights;