const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const VueSSRPlugin = require('vue-ssr-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';



var serverConfig = {
    context: path.join(__dirname,'..'),
    name: 'server',
    target: 'node',
    entry: {
        server: './src/entry-server.js',
    },
    output: {
        path: path.join(__dirname,'../dist/static'),
        publicPath: '/static/',
        filename: 'js/[name].bundle.js',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': "vue/dist/vue.esm.js",
            '@src': './src',
            '@assets': './src/assets',
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
        new ProgressBarPlugin(),
        new VueSSRPlugin(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(NODE_ENV),
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
            'PRODUCTION': JSON.stringify(NODE_ENV!=='development'),
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: NODE_ENV == 'development',
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
        
    ],
    devtool: NODE_ENV == 'development' ? 'eval-source-map' : false,
    externals: Object.keys(require('../package.json').dependencies),
}

module.exports = serverConfig;