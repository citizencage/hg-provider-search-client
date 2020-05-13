const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {

    mode: 'development',
    stats: {
        // copied from `'minimal'`
        all: false,
        modules: true,
        maxModules: 0,
        errors: true,
        warnings: true,
        // our additional options
        moduleTrace: true,
        errorDetails: true
    },

    // This option controls if and how source maps are generated.
    // https://webpack.js.org/configuration/devtool/
    devtool: 'eval-cheap-module-source-map',

    // https://webpack.js.org/configuration/dev-server/
    devServer: {
        port: 8080,
        writeToDisk: false // https://webpack.js.org/configuration/dev-server/#devserverwritetodisk-
    },

    module: {

        // loaders will get concatenated!

        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        // creates style nodes from JS strings
                        loader: "style-loader"
                    },
                    {
                        // translates CSS into CommonJS
                        loader: "css-loader"
                    },
                    {
                        // compiles Sass to CSS
                        loader: "sass-loader"
                    }
                ]
            },
            {
                // Load all images as base64 encoding if they are smaller than 8192 bytes
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // On development we want to see where the file is coming from, hence we preserve the [path]
                            name: '[path][name].[ext]?hash=[hash:20]',
                            esModule: false,
                            limit: 8192
                        }
                    }
                ]
            }
        ]

    },

    // https://webpack.js.org/concepts/plugins/
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"development"'
            },

            PRODUCTION: JSON.stringify(false)
        }),
        new HtmlWebpackPlugin({
            template: './src/basic-ratings-demo.html',
            inject: true,
            chunks: ['index'],
            filename: 'basic-ratings-demo.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/filtered-ratings-demo.html',
            inject: true,
            chunks: ['index'],
            filename: 'filtered-ratings-demo.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/provider-search-demo.html',
            inject: true,
            chunks: ['index'],
            filename: 'provider-search-demo.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/provider-search-load-demo.html',
            inject: true,
            chunks: ['index'],
            filename: 'provider-search-load-demo.html'
        })
    ]

});