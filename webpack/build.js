// libs
const glob = require('glob');
const merge = require('webpack-merge');
const webpack = require('webpack');

// plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SizePlugin = require('size-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');

// utils
const common = require('./common');
const environment = require('./utils/environment');
const paths = require('./utils/paths');

module.exports = merge.smart(common, {
    mode: 'production',
    stats: 'errors-only',
    entry: {
        app: paths.APP_ENTRY_POINT
    },
    output: {
        filename: 'static/js/[name].[chunkhash:8].js',
        chunkFilename: 'static/js/[name].chunk-[id].[chunkhash:8].js',
        path: paths.APP_BUILD_SRC,
        publicPath: paths.PUBLIC_PATH
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /(node_modules)/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': environment.production
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[chunkhash:8].css',
            chunkFilename: 'static/css/[id].[chunkhash:8].css'
        }),
        new PurgecssPlugin({
            paths: glob.sync(`${paths.APP_SRC}/**/*`, { nodir: true })
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }]
            }
        }),
        new HtmlWebpackPlugin({
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
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'async'
        }),
        new BundleAnalyzerPlugin({
            openAnalyzer: false,
            analyzerMode: 'static',
            defaultSizes: 'gzip',
            reportFilename: 'static/report/index.html',
            generateStatsFile: true,
            statsFilename: 'static/report/stats.json',
            logLevel: 'error'
        }),
        new CopyWebpackPlugin([
            {
                context: paths.APP_PUBLIC,
                from: './**/*',
                to: './',
                ignore: ['*.html']
            }
        ]),
        new SizePlugin()
    ]
});
