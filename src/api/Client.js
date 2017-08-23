'use strict';

let Lights = require('./resources/Lights');
let Users = require('./resources/Users');


const DEFAULT_CONFIG = {
    host:     undefined,
    port:     80,
    username: undefined,
    timeout:  15000
};

class Client {
    constructor(logger,
                config) {
        this.config    = Object.assign({}, DEFAULT_CONFIG, config);
        this._logger = logger;
        this._lights = new Lights(this);
        this._users = new Users(this);
    }

    get logger() {
        return this._logger;
    }

    get host() {
        return this.config.host;
    }

    set host(host) {
        this.config.host = host;
    }

    get port() {
        return this.config.port;
    }

    set port(port) {
        this.config.port = Number(port);
    }

    get username() {
        return this.config.username;
    }

    set username(username) {
        this.config.username = username;
    }

    get timeout() {
        return this.config.timeout;
    }

    set timeout(timeout) {
        this.config.timeout = Number(timeout);
    }

    get lights() {
        return this._lights;
    }

    get users() {
        return this._users;
    }

    isAuthorizedUser() {

    }
}

module.exports = Client;