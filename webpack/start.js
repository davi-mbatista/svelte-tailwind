const { merge } = require('webpack-merge');

const common = require('./common');
const { server, paths, plugins } = require('./utils');

module.exports = merge(common, {
    mode: 'development',
    stats: 'minimal',
    devServer: server,
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        path: paths.APP_BUILD_SRC,
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /(node_modules)/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            }
        ]
    },
    plugins: plugins.start
});
