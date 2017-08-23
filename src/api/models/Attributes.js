'use strict';

class Attributes {
    constructor(attributes, defaults) {
        this.replace(Object.assign({}, defaults, attributes));
    }

    replace(attributes) {
        this.attributes = Object.assign({}, this.attributes, attributes);
    }

    get(attribute) {
        return this.attributes[attribute];
    }

    getAll() {
        return Object.assign({}, this.attributes);
    }

    set(attribute, value) {
        this.attributes[attribute] = value;
    }
}

module.exports = Attributes;