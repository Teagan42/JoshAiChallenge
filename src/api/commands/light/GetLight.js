'use strict';

let request = require('request-promise');
let LightCommand = require('./LightCommand');

class GetLight extends LightCommand {
    constructor(client,
                lightId) {
        super(client);
        this.lightId = Number(lightId);
    }
    
    invoke() {
        let options = {
            uri: `${this.basePath}/${this.lightId}`,
            headers: {
                'Content-Type': 'application/json'
            },
            json: true
        };

        return request(options)
            .then(result => {
                result.id = this.lightId;

                return this.buildLight(result);
            });
    }
}

module.exports = GetLight;