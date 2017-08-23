'use strict';

const MONITORED_STATES = [
    'name',
    'on',
    'brightness'
];

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

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

    _prettyPrint(data) {
        return JSON.stringify(data, null, 2);
    }

    _getFullLightsState() {
        return this.client.lights.getAll()
            .then(lights => {
                this.logger.debug(`Got ${lights.length} Lights`);
                let lightRequests = []
                lights.forEach(light => {
                    // Bridge versions under 1.3 will need second requests for every light due to
                    // the bridge only returning id->name. Any bridge over 1.3 will return all data
                    // needed to continue.
                    if (light.brightness) { // If brightness is defined, we can assume we have the whole state
                        lightRequests.push(Promise.resolve(light));
                    } else {
                        lightRequests.push(this.client.lights.getById(light.id));
                    }
                });

                return Promise.all(lightRequests);
            });
    }

    _firstRun() {
        this._isFirstRun = false;
        this.logger.debug('Retrieving lights...');
        this._getFullLightsState()
            .then(lights => {
                let data = [];
                lights.forEach(light => {
                    data.push(light.details());
                    this._lightStates[light.id] = light;
                });
                this.logger.info(this._prettyPrint(data));
            })
            .then(() => {
                this.run();
            })
            .catch(error => {
                this.logger.error(error);
            });
    }

    _addNewLight(light) {
        this.logger.debug('New light found!')
        this.logger.info(this._prettyPrint(light.details()));
        this._lightStates[light.id] = light;
    }

    _removeLight(light) {
        this.logger.debug('Light removed!');
        this.logger.info(this._prettyPrint(light.details()));
        delete this._lightStates[light.id];
    }

    _checkLightChanged(apiLight, stateLight) {
        MONITORED_STATES.forEach(state => {
            if (apiLight[state] == stateLight[state]) {
                return;
            }

            this.logger.debug(`State '${state}' changed!'`);
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
        this._getFullLightsState()
            .then(lights => {
                let apiIds = [];
                lights.forEach(apiLight => {
                    apiIds.push(apiLight.id);
                    let stateLight = this._lightStates[apiLight.id];
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
                this.logger.debug('Done checking state change');
            })
            .then(() => {
                this.run();
            })
            .catch(error => {
                this.logger.error(error);
            });
    }

    run() {
        sleep(500);
        this.logger.debug('Run Invoked');
        if (this._isFirstRun) {
            this._firstRun();
        } else {
            this._checkLightsForStateChange();
        }
    }
}

module.exports = App;