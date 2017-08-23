const chai = require('chai');
const assert = chai.assert;
const Attributes = require('../../../src/api/models/Attributes');
const Light = require('../../../src/api/models/Light');

describe('Light Model', () => {
    it('should be initializable', () => {
        let light = new Light({}, {});
        assert.isOk(light);
    });

    it('should pull proper attributes', () => {
        let attributes = {id: 'id', name: 'name', foo: 'foo', bar: 'bar'};
        let light = new Light(attributes, {});
        assert.equal(light.id, attributes.id);
        assert.equal(light.name, attributes.name);
    });

    it('should pull proper state attributes', () => {
        let state = {on: true, bri: 255, foo: 'foo', bar: 'bar'};
        let light = new Light({}, state);
        assert.equal(light.on, state.on);
        assert.equal(light.brightness, state.bri);
    });

    it('should return id when converting to string', () => {
        let attributes = {id: 'id', name: 'name', foo: 'foo', bar: 'bar'};
        let state = {on: true, bri: 255, foo: 'foo', bar: 'bar'};
        let light = new Light(attributes, state);

        assert.equal(light.toString(), String(attributes.id));
    });

    it('should only return specified details when provided with specific details', () => {
        let attributes = {id: 'id', name: 'name', foo: 'foo', bar: 'bar'};
        let state = {on: true, bri: 255, foo: 'foo', bar: 'bar'};
        let light = new Light(attributes, state);

        const details = light.details(['id', 'on']);
        assert.containsAllKeys(details, ['id', 'on']);

        assert.isNotOk(details.brightness);
        assert.isNotOk(details.name);
        assert.equal(details.on, light.on);
        assert.equal(details.id, light.id);
    });
});