const chai = require('chai');
const mockery = require('mockery');
const assert = chai.assert;

const client = {
    username: 'username',
    host: 'host',
    port: 3000
};

describe('Lights Resource', () => {
    describe('getAll', () => {
        let response =  {
            "1": {
                "name": "Hue Lamp 1"
            },
            "2": {
                "name": "Hue Lamp 2"
            }
        };

        let Lights = undefined;

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
            Lights = require('../../../src/api/resources/Lights');

            done();
        });

        after(done => {
            mockery.disable();
            mockery.deregisterAll();
            done();
        });

        it('should return lights', (done) => {
            let resource = new Lights(client);

            resource.getAll()
                .then(lights => {
                    assert.isOk(lights);
                    assert.equal(lights.length, Object.keys(response).length);
                    let i = 0;
                    lights.forEach(light => {
                        assert.isOk(light);
                        assert.equal(light.id, Object.keys(response)[i]);
                        assert.equal(light.name, response[light.id].name);
                        i++;
                    });
                    done();
                })
                .catch(done);
        });
    });

    describe('getById', () => {
        let response = {
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

        let Lights = undefined;

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
            Lights = require('../../../src/api/resources/Lights');

            done();
        });

        after(done => {
            mockery.disable();
            mockery.deregisterAll();
            done();
        });

        it('should return the light', (done) => {
            let resource = new Lights(client);

            resource.getById(1)
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
});