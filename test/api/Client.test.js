const chai = require('chai');
const assert = chai.assert;
const Client = require('../../src/api/Client');
const Lights = require('../../src/api/resources/Lights');

describe('Hue Client', () => {
    const config = {
        host: 'localhost',
        port: 3000,
        username: 'testUser'
    };

    it('should be initializable', () => {
         const client = new Client({}, config);

         assert.isOk(client);
         assert.equal(client.host, config.host);
         assert.equal(client.port, config.port);
         assert.equal(client.username, config.username);
         assert.isOk(client.logger);

         const lights = client.lights;
         assert.isOk(lights);
         assert.isTrue(lights instanceof Lights);
    });
});