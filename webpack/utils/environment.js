// libs
const fs = require('fs');

// utils
const packageJSON = JSON.parse(fs.readFileSync('./package.json'));
const stringify = data => JSON.stringify(data);

// Common variables
const common = {
    APP_VERSION: stringify(packageJSON.version),
    APP_NAME: stringify(packageJSON.name)
};

module.exports = {
    development: {
        ...common,
        NODE_ENV: stringify('development')
    },
    production: {
        ...common,
        NODE_ENV: stringify('production')
    }
};
