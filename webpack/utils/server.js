// utils
const paths = require('./paths');

module.exports = {
    /**
     * Enables gzip compression for everything that is served.
     * https://webpack.js.org/configuration/dev-server#devservercompress
     *  */
    compress: true,
    /**
     * Enables overlay messages only for errors
     * https://webpack.js.org/configuration/dev-server#devserveroverlay
     */
    overlay: {
        warnings: false,
        errors: true
    },
    /**
     * Opinionated solution for external access to development server.
     * Useful for testing application on devices in the same network.
     * This will initialize the development server with the local IP
     * but it can be reached from 'localhost' too.
     *  */
    useLocalIp: true,
    host: '0.0.0.0',
    /**
     * "Tell the server where to serve content from. This is only necessary
     * if you want to serve static files..."
     * https://webpack.js.org/configuration/dev-server/#devservercontentbase
     */
    contentBase: paths.APP_PUBLIC,
    /**
     * "The bundled files will be available in the browser under this path..."
     * https://webpack.js.org/configuration/dev-server/#devserverpublicpath
     */
    publicPath: paths.PUBLIC_PATH,
    /**
     * The development server will watch the files served by the contentBase
     * https://webpack.js.org/configuration/dev-server/#devserverwatchcontentbase
     */
    watchContentBase: true
};
