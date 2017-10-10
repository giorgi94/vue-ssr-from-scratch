const path = require('path');
const webpack = require('webpack');

const VueSSRPlugin = require('vue-ssr-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const NODE_ENV = process.env.NODE_ENV || 'development';


var clientConfig = {
    name: 'client',
    target: 'web',
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
        extensions: ['.js', '.vue', '.json'],
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
    devtool: NODE_ENV == 'development' ? 'eval-source-map' : false,
}




var serverConfig = {
    name: 'server',
    target: 'node',
    entry: {
        server: './src/entry-server.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist/static'),
        publicPath: '/static/',
        filename: 'js/[name].bundle.js',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
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
                use: 'css-loader/locals'
            },
            {
                test: /\.scss$/,
                use: ['css-loader/locals', 'postcss-loader','sass-loader'] 
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            emit: false
                        },
                    },
                ],  
            },
        ]
    },
    plugins: [
        new VueSSRPlugin(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(NODE_ENV),
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
            'PRODUCTION': JSON.stringify(NODE_ENV!=='development'),
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
        
    ],
    devtool: NODE_ENV == 'development' ? 'eval-source-map' : false,
    externals: Object.keys(require('./package.json').dependencies),
}

module.exports = [clientConfig, serverConfig];