// libs
const path = require('path');
const fs = require('fs');

// Get node's process root
const ROOT = fs.realpathSync(process.cwd());

const resolveTo = (relativePath = '') => path.resolve(ROOT, relativePath);

module.exports = {
    ROOT: ROOT,
    APP_HTML: resolveTo('public/index.html'),
    APP_SRC: resolveTo('src'),
    APP_ENTRY_POINT: resolveTo('src/index.js'),
    APP_BUILD_SRC: resolveTo('build'),
    NODE_MODULES: resolveTo('node_modules'),
    APP_PUBLIC: path.relative(ROOT, 'public'),
    PUBLIC_PATH: path.relative(ROOT, '')
};
