const chai = require('chai');
const mockery = require('mockery');
const assert = chai.assert;

const response = {
    "1": {
        "name": "Hue Lamp 1"
    },
    "2": {
        "name": "Hue Lamp 2"
    }
};

const client = {
    username: 'username',
    host: 'host',
    port: 3000
};

let GetLights = undefined;

describe('Get Lights Command', () => {
    before((done) => {
        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false,
            useCleanCache: true
        });

        mockery.registerMock('request-promise', function () {
            return Promise.resolve(response);
        });

        // require only after it's dependencies have been mocked
        GetLights = require('../../../../src/api/commands/light/GetLights');

        done();
    });

    after(done => {
        mockery.disable();
        mockery.deregisterAll();
        done();
    });

    it('should build lights when invoked', (done) => {
        const cmd = new GetLights(client);

        cmd.invoke()
            .then(lights => {
                assert.isOk(lights);
                assert.equal(lights.length, 2);
                let i = 0;
                Object.keys(response).forEach((lightId) => {
                    assert.isOk(lights[i]);
                    assert.equal(lights[i].id, lightId);
                    assert.equal(lights[i].name, response[lightId].name);
                    i++;
                });
                done();
            })
            .catch(done);
    });
});