const chai = require('chai');
const mockery = require('mockery');
const assert = chai.assert;

const responseLinkNotPressed = [{
    error: {
        type: 101,
        address: "",
        description: "link button not pressed"
    }
}];
const responseLinkPressed = [{
    success: {
        username: 'username'
    }
}];

const client = {
    username: 'username',
    host: 'host',
    port: 3000
};

let CreateUser = undefined;

describe('Create User Command', () => {

    describe('errors', () => {
        before((done) => {
            mockery.enable({
                warnOnReplace: false,
                warnOnUnregistered: false,
                useCleanCache: true
            });

            mockery.registerMock('request-promise', function () {
                return Promise.resolve(responseLinkNotPressed);
            });

            // require only after it's dependencies have been mocked
            CreateUser = require('../../../../src/api/commands/user/CreateUser');

            done();
        });

        after(done => {
            mockery.disable();
            mockery.deregisterAll();
            done();
        });

        it('when link button not pressed', (done) => {
            const cmd = new CreateUser(client);

            cmd.invoke()
                .then(user => {
                    done('Expected an error to be thrown by the api');
                })
                .catch(err => {
                    assert.isTrue(err.toString().indexOf('link') > -1);
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
                return Promise.resolve(responseLinkPressed);
            });

            // require only after it's dependencies have been mocked
            CreateUser = require('../../../../src/api/commands/user/CreateUser');

            done();
        });

        after(done => {
            mockery.disable();
            mockery.deregisterAll();
            done();
        });

        it('when link button is pressed', (done) => {
            const cmd = new CreateUser(client);

            cmd.invoke()
                .then(user => {
                    assert.equal(user, client.username);
                    done();
                })
                .catch(done);
        });
    });
});