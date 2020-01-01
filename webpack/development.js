// libs
const merge = require('webpack-merge');
const webpack = require('webpack');

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

// utils
const common = require('./common');
const environment = require('./utils/environment');
const server = require('./utils/server');
const paths = require('./utils/paths');

module.exports = merge.smart(common, {
    mode: 'development',
    entry: {
        app: paths.APP_ENTRY_POINT
    },
    devServer: server,
    stats: 'minimal',
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        path: paths.APP_BUILD_SRC,
        publicPath: paths.PUBLIC_PATH
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
    plugins: [
        new webpack.DefinePlugin({
            'process.env': environment.development
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.APP_HTML
        })
    ]
});
