const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');

const { VueLoaderPlugin } = require('vue-loader');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

const PATH = path.join(__dirname, '..');
const NODE_ENV = process.env.NODE_ENV || 'development';

const dist = 'dist';

const config = {
    mode: NODE_ENV,
    target: 'node',
    context: PATH,
    entry: ['./src/entry-server.js'],
    output: {
        libraryTarget: 'commonjs2',
        publicPath: '/static/',
        path: path.join(PATH, dist),
        filename: 'static/build/[name].js'
    },
    externals: Object.keys(require('../package.json').dependencies),
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.join(PATH, 'src'),
            'assets': path.join(PATH, 'assets')
        },
        extensions: ['.js', '.jsx', '.vue']
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader'
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: 'css-loader/locals'
            },
            {
                test: /\.stylus$/,
                use: ['css-loader/locals', 'postcss-loader', 'stylus-loader']
            },
            {
                test: /\.pug$/,
                loader: 'pug-plain-loader'
            }
        ]
    },
    plugins: [
        new WebpackBar(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(NODE_ENV),
                'client': JSON.stringify(false)
            }
        }),
        new VueLoaderPlugin(),
        new VueSSRServerPlugin({
            filename: 'json/vue-server-bundle.json'
        })
    ]
};

module.exports = config;
