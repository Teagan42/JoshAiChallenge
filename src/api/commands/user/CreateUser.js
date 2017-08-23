'use strict';

let request = require('request-promise');
let Command = require('../Command');

class CreateUser extends Command {
    constructor(client) {
        super(client);
    }

    get basePath() {
        return `http://${this.client.host}:${this.client.port}/api`;
    }

    invoke(client) {
        let options = {
            method: 'POST',
            uri: this.basePath,
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                devicetype: 'joshchallenge',
                username: this.client.username
            },
            json: true,
            timeout: 10000
        };

        return request(options)
            .then(result => {
                result.forEach(item => {
                    if (item.error) {
                        throw new Error(item.error.description);
                    }
                })
                return this.client.username;
            });
    }
}

module.exports = CreateUser;