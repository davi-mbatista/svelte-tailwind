const environment = require('./environment');
const paths = require('./paths');

const plugins = {
    Clean: require('clean-webpack-plugin').CleanWebpackPlugin,
    Copy: require('copy-webpack-plugin'),
    Define: require('webpack').DefinePlugin,
    Html: require('html-webpack-plugin'),
    MiniCSSExtract: require('mini-css-extract-plugin'),
    OptimizeCSSAssets: require('optimize-css-assets-webpack-plugin'),
    ScriptExtensionHTML: require('script-ext-html-webpack-plugin'),
    Size: require('size-plugin')
};

module.exports = {
    common: [],
    start: [
        new plugins.Define({
            'process.env': environment.development
        }),
        new plugins.Html({
            inject: true,
            template: paths.APP_HTML
        })
    ],
    build: [
        new plugins.Clean(),
        new plugins.MiniCSSExtract({
            filename: 'static/css/[name].[chunkhash:8].css',
            chunkFilename: 'static/css/[id].[chunkhash:8].css'
        }),
        new plugins.OptimizeCSSAssets({
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }]
            }
        }),
        new plugins.Html({
            inject: 'body',
            template: paths.APP_HTML,
            minify: {
                collapseWhitespace: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeRedundantAttributes: true,
                removeComments: true
            }
        }),
        new plugins.ScriptExtensionHTML({
            defaultAttribute: 'async'
        }),
        new plugins.Copy({
            patterns: [
                {
                    context: paths.APP_PUBLIC,
                    from: './**/*',
                    to: './',
                    globOptions: {
                        ignore: ['*.html']
                    }
                }
            ]
        }),
        new plugins.Size()
    ]
};
