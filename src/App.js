'use strict';

const MONITORED_STATES = [
    'name',
    'on',
    'brightness'
];

class App {
    constructor(logger,
                client) {
        this._logger = logger;
        this._client = client;
        this._isFirstRun = true;
        this._lightStates = {};
    }

    get client() {
        return this._client;
    }

    get logger() {
        return this._logger;
    }

    _prettyPrint(light) {
        return JSON.stringify(light.details(), null, 2);
    }

    _firstRun() {
        this._isFirstRun = false;
        this.logger.debug('Retrieving lights...');
        this.client.lights.getAll()
            .then(lights => {
                this.logger.debug(`Got ${lights.length} Lights`);
                lights.forEach(light => {
                    this.logger.info(this._prettyPrint(light));
                    this._lightStates[light.id] = light;
                });
            })
            .then(this.run)
            .catch(error => {
                this.logger.error(error);
            });
    }

    _addNewLight(light) {
        this.logger.debug('New light found!')
        this.logger.info(this._prettyPrint(light));
        this._lightStates[light.id] = light;
    }

    _removeLight(light) {
        this.logger.debug('Light removed!');
        this.logger.info(this._prettyPrint(light));
        delete this._lightStates[light.id];
    }

    _checkLightChanged(apiLight, stateLight) {
        MONITORED_STATES.forEach(state => {
            if (apiLight[state] === stateLight[state]) {
                return;
            }

            this.logger.debug('State changed!');
            let data = {
                id: apiLight.id
            };
            data[state] = apiLight[state];
            stateLight[state] = apiLight[state];
            this.logger.info(this._prettyPrint(data));
        });
    }

    _checkLightsForStateChange() {
        this.logger.debug('Checking state change...');
        client.lights.getAll()
            .then(lights => {
                let apiIds = [];
                lights.forEach(apiLight => {
                    apiIds.push(apiLight.id);
                    stateLight = this._lightStates[apiLight.id];
                    if (!stateLight) {
                        this._addNewLight(apiLight);
                    } else {
                        this._checkLightChanged(apiLight, stateLight);
                    }
                });
                Object.keys(this._lightStates).forEach(id => {
                    if (!apiIds.includes(id)) {
                        this._removeLight(this._lightStates[id]);
                    }
                });
            })
            .then(run)
            .catch(error => {
                this.logger.error(error);
            });
    }

    run() {
        this.logger.debug('Run Invoked');
        if (this._isFirstRun) {
            this._firstRun();
        } else {
            this._checkLightsForStateChange();
        }
    }
}

module.exports = App;