'use strict';

let BaseResource = require('./BaseResource');

// Commands
let IsAuthorized = require('../commands/user/IsAuthorized');
let CreateUser = require('../commands/user/CreateUser');

class Users extends BaseResource {
    constructor(client) {
        super(client);
    }

    isAuthorized() {
        return new IsAuthorized(this.client).invoke();
    }

    createUser() {
        return new CreateUser(this.client).invoke();
    }
}

module.exports = Users;