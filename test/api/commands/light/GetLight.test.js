const chai = require('chai');
const mockery = require('mockery');
const assert = chai.assert;

const response = {
    "state": {
        "on": false,
        "bri": 9,
        "hue": 50000,
        "sat": 0,
        "xy": [
            0,
            0
        ],
        "ct": 0,
        "alert": "none",
        "effect": "none",
        "colormode": "hs",
        "reachable": true
    },
    "type": "Extended color light",
    "name": "Hue Lamp 1",
    "modelid": "LCT001",
    "swversion": "65003148",
    "pointsymbol": {
        "1": "none",
        "2": "none",
        "3": "none",
        "4": "none",
        "5": "none",
        "6": "none",
        "7": "none",
        "8": "none"
    }
};

const client = {
    username: 'username',
    host: 'host',
    port: 3000
};

let GetLight = undefined;

describe('Get Light Command', () => {
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
        GetLight = require('../../../../src/api/commands/light/GetLight');

        done();
    });

    after(done => {
        mockery.disable();
        mockery.deregisterAll();
        done();
    });

    it('should build a light when invoked', (done) => {
        const cmd = new GetLight(client, 1);

        cmd.invoke()
            .then(light => {
                assert.isOk(light);
                assert.equal(light.id, '1');
                assert.equal(light.name, response.name);
                assert.equal(light.on, response.state.on);
                assert.equal(light.brightness, response.state.bri);
                done();
            })
            .catch(done);
    });
});