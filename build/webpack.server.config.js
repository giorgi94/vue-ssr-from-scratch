const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js')


const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const NODE_ENV = process.env.NODE_ENV || 'development';



var serverConfig = merge(baseConfig, {
    context: path.join(__dirname,'..'),
    name: 'server',
    target: 'node',
    entry: {
        server: './src/entry-server.js',
    },
    output: {
        libraryTarget: 'commonjs2'
    },
    externals: Object.keys(require('../package.json').dependencies),
    module: {
        rules: [
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
        new VueSSRServerPlugin(),
    ],
})




module.exports = serverConfig;