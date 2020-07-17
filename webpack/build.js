const { merge } = require('webpack-merge');

const common = require('./common');
const { paths, plugins } = require('./utils');

module.exports = merge(common, {
    mode: 'production',
    stats: 'errors-only',
    output: {
        filename: 'static/js/[name].[chunkhash:8].js',
        chunkFilename: 'static/js/[name].chunk-[id].[chunkhash:8].js',
        path: paths.APP_BUILD_SRC,
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /(node_modules)/,
                use: [
                    require('mini-css-extract-plugin').loader,
                    'css-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: plugins.build
});
