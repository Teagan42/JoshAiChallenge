const chai = require('chai');
const assert = chai.assert;
const Attributes = require('../../../src/api/models/Attributes');

describe('Attributes Model', () => {
    it('should be initializable', () => {
        const attr = new Attributes({}, {});
        assert.isOk(attr);
    });

    it('should populate defaults when not present', () => {
        const attr = new Attributes({}, {testKey: 'testValue'});
        assert.containsAllKeys(attr.getAll(), ['testKey']);
        assert.equal(attr.get('testKey'), 'testValue');
    });

    it('should accept attributes and populate defaults', () => {
        const attr = new Attributes({attr1: true}, {testKey: 'testValue'});
        assert.containsAllKeys(attr.getAll(), ['attr1', 'testKey']);
        assert.equal(attr.get('attr1'), true);
        assert.equal(attr.get('testKey'), 'testValue');
    });

    it('should allow setting of attributes after initialization', () => {
        const attr = new Attributes({attr1: true}, {});
        assert.containsAllKeys(attr.getAll(), ['attr1']);
        assert.isTrue(attr.get('attr1'));
        attr.set('attr1', false);
        assert.isNotOk(attr.get('attr1'));
    });
});