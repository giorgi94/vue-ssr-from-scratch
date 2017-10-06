const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV || 'development';


var config = {
    entry: {
        vendors: ['babel-polyfill', 'vue', 'vuex', 'vue-router'],
        index: './src/entry-client.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist/static'),
        publicPath: '/static/',
        filename: 'js/[name].bundle.js'
    },
    resolve: {
        alias: {
            'vue$': "vue/dist/vue.esm.js",
            '@src': path.resolve(__dirname, 'src'),
            '@assets': path.resolve(__dirname, 'assets'),
        },
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
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
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(NODE_ENV),
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
            'PRODUCTION': JSON.stringify(NODE_ENV!=='development'),
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['commons', 'vendors']
        }),
        new ExtractTextPlugin("css/styles.css"),
        new HtmlWebpackPlugin({
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true
            },
            chunks: ['index', 'vendors'],
            // excludeChunks: ['']
            template: 'index.ejs',
            filename: `../index.ejs`,
            context: {
                title: 'My Vue Projet',
                body: '<%- html %>', //'<div id="app"></div>',
            },
            hash:true,
        })
    ],
    devtool: NODE_ENV == 'development' ? 'eval-source-map' : false,
}


module.exports = config;