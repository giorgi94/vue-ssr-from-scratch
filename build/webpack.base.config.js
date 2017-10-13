const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');


const NODE_ENV = process.env.NODE_ENV || 'development';



var clientConfig = {
    context: path.join(__dirname,'..'),
    output: {
        path: path.join(__dirname,'../dist/static'),
        publicPath: '/static/',
        filename: 'js/[name].bundle.js'
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
        ]
    },
    plugins: [
        new ProgressBarPlugin(),
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
}



module.exports = clientConfig;