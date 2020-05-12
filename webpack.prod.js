const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const buildPath = path.resolve(__dirname, 'dist');

module.exports = merge(common, {
    mode: 'production',

    // how to write the compiled files to disk
    // https://webpack.js.org/concepts/output/
    output: {
        filename: '[name].[hash:20].js',
        path: buildPath
    },

    // https://webpack.js.org/concepts/loaders/
    module: {
        rules: [
            {
                test: /\.(scss|css|sass)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        // translates CSS into CommonJS
                        loader: 'css-loader'
                    },
                    {
                        // compiles Sass to CSS
                        loader: 'sass-loader'
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
                            name: 'images/[name].[hash:20].[ext]',
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
        new CleanWebpackPlugin(), // cleans output.path by default

        new HtmlWebpackPlugin({
            template: './src/basic-ratings-demo.html',
            inject: 'body',
            chunks: ['index'],
            filename: path.resolve(buildPath, 'basic-ratings-demo.html')
        }),
        new HtmlWebpackPlugin({
            template: './src/filtered-ratings-demo.html',
            inject: 'body',
            chunks: ['index'],
            filename: path.resolve(buildPath, 'filtered-ratings-demo.html')
        }),
        new HtmlWebpackPlugin({
            template: './src/provider-search-demo.html',
            inject: true,
            chunks: ['index'],
            filename: 'provider-search-demo.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].[contenthash].css'
        }),
        // vueJS, production mode will be determined by process.env.NODE_ENV inside Vue’s source code, and it will be in development mode by default
        // overwrite this variable to enable Vue’s production mode
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'

            },
            PRODUCTION: JSON.stringify(true)
        })
    ],
});