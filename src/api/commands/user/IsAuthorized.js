'use strict';

let request = require('request-promise');
let Command = require('../Command');

class IsAuthorized extends Command {
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
            timeout: 10000
        };

        return request(options)
            .then(result => {
                if (JSON.stringify(result).indexOf("error") < 0) {
                    return this.client.username;
                }

                result.forEach(user => {
                    if (!user.error) {
                        return;
                    }

                    throw new Error(user.error.description);
                });

                return this.client.username;
            });
    }
}

module.exports = IsAuthorized;