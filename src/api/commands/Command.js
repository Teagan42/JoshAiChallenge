'use strict';

class Command {
    constructor(client) {
        this.client = client;
    }

    get basePath() {
        return `http://${this.client.host}:${this.client.port}/api/${this.client.username}`;
    }

    invoke() {
        throw new Error('Not implemented');
    }
}

module.exports = Command;