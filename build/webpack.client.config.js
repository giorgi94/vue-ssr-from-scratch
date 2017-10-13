const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js')

// const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");



var clientConfig = merge(baseConfig, {
    context: path.join(__dirname,'..'),
    name: 'client',
    target: 'web',
    entry: {
        vendors: ['babel-polyfill', 'vue', 'vuex', 'vue-router'],
        index: './src/entry-client.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader']
                })  
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader','sass-loader']
                })  
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                        },
                    },
                ],  
            },
        ]
    },
    plugins: [
        // new VueSSRClientPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['commons', 'vendors']
        }),
        new ExtractTextPlugin("css/styles.css"),
        new HtmlWebpackPlugin({
            minify: {
                collapseWhitespace: true,
                removeComments: false,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: false,
                removeStyleLinkTypeAttributes: false
            },
            // excludeChunks: [''],
            chunks: ['index', 'vendors'],
            template: 'index.ejs',
            filename: `../index.ejs`,
            context: {
                body: "<%- html %>",
                meta: "<%- meta %>",
                title: "<%- title %>",
                __INITIAL_STATE__: "<script><%- __INITIAL_STATE__ %></script>",
            },
            hash:true,
        })
    ],
})



module.exports = clientConfig;