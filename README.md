# Josh.ai Coding Challenge
A simple application that monitors state changes in a Hue Bridge's lights.

## Running

This application requires Node 6 or higher and NPM 3.6 or higher

### Dependencies

Install dependencies using NPM install

```
npm install
```

### Executing

To run the application with default configuration in production mode:
```
npm start
```

To run the application with debug logging:
```
npm run debug
```

To run the application with overridden configuration:
```
node src/index.js [options]
```

Where `options` can be:  
`-d` : debug mode
`-h host` : specify the host domain name for the Hue Bridge
`-p port` : Specify the host port for the Hue Bridge
`-u user` : Specify the username to run commands against

For usage help:
```
node src/index.js --help
```

### Stopping Execution

The application will continue to monitor state until it receives an error. To stop the application use `ctrl+c` as you would any other long running execution.

## Running Tests

To run the unit tests:
```
npm run test
```

## Future improvements

* Negative unit tests
* Testing against the application output
* Adding support for other light resource commands such as adding, deleting and updating lights
* Adding support for other resource types such as groups, schedules, etc.