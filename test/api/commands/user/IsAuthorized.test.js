const chai = require('chai');
const mockery = require('mockery');
const assert = chai.assert;

const responseUnauthorized = [{
    error: {
        type: 1,
        address: "",
        description: "unauthorized user"
    }
}];
const responseAuthorized = [{
    success: {
        username: 'username'
    }
}];

const client = {
    username: 'username',
    host: 'host',
    port: 3000
};

let IsAuthorized = undefined;

describe('IsAuthorized User Command', () => {

    describe('errors', () => {
        before((done) => {
            mockery.enable({
                warnOnReplace: false,
                warnOnUnregistered: false,
                useCleanCache: true
            });

            mockery.registerMock('request-promise', function () {
                return Promise.resolve(responseUnauthorized);
            });

            // require only after it's dependencies have been mocked
            IsAuthorized = require('../../../../src/api/commands/user/IsAuthorized');

            done();
        });

        after(done => {
            mockery.disable();
            mockery.deregisterAll();
            done();
        });

        it('when user is not authrozied', (done) => {
            let cmd = new IsAuthorized(client);

            cmd.invoke()
                .then(user => {
                    done('Expected an error to be thrown by the api');
                })
                .catch(err => {
                    assert.isTrue(err.toString().indexOf('unauthorized') > -1);
                    done();
                })
        });
    });

    describe('succeeds', () => {
        before((done) => {
            mockery.enable({
                warnOnReplace: false,
                warnOnUnregistered: false,
                useCleanCache: true
            });

            mockery.registerMock('request-promise', function () {
                return Promise.resolve(responseAuthorized);
            });

            // require only after it's dependencies have been mocked
            IsAuthorized = require('../../../../src/api/commands/user/CreateUser');

            done();
        });

        after(done => {
            mockery.disable();
            mockery.deregisterAll();
            done();
        });

        it('when user is authorized', (done) => {
            let cmd = new IsAuthorized(client);

            cmd.invoke()
                .then(user => {
                    assert.equal(user, client.username);
                    done();
                })
                .catch(done);
        });
    });
});