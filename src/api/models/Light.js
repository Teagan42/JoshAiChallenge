'use strict';

let Attributes = require('./Attributes');

const DEFAULT_DETAILS = [
    'id',
    'name',
    'on',
    'brightness'
];

class Light {
    constructor(attributes, state) {
        this.attributes = new Attributes(attributes);
        this.state = new Attributes(state);
    }

    get id() {
        return this.attributes.get('id');
    }

    get name() {
        return this.attributes.get('name');
    }

    set name(name) {
        this.attributes.set('name', String(name));
    }

    get on() {
        return Boolean(this.state.get('on'));
    }

    set on(value) {
        this.state.set('on', Boolean(value));
    }

    get brightness() {
        return this.state.get('bri');
    }

    set brightness(brightness) {
        this.state.set('bri', Number(brightness));
    }

    toString() {
        return this.id;
    }

    details(detailFields) {
        detailFields = detailFields || DEFAULT_DETAILS;
        
        const details = {};
        detailFields.forEach(option =>  {
            details[option] = this[option];
        });

        return details;
    }
}

module.exports = Light;