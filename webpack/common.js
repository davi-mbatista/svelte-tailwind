const { paths, plugins } = require('./utils');

module.exports = {
    entry: {
        app: paths.APP_ENTRY_POINT
    },
    module: {
        rules: [
            {
                test: /\.svelte$/,
                exclude: /node_modules/,
                use: {
                    loader: 'svelte-loader',
                    options: {
                        emitCss: true,
                        hotReload: true,
                        preprocess: require('svelte-preprocess')({})
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.mjs', '.js', '.svelte']
    },
    plugins: plugins.common
};
