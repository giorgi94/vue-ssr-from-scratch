const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const {
    VueLoaderPlugin
} = require('vue-loader');

const PATH = path.join(__dirname, '..');
const NODE_ENV = process.env.NODE_ENV || 'development';
const HOT_RELOAD = process.env.HOT_RELOAD === '1';


const dist = 'dist';
const styleLoader = NODE_ENV === 'development' ?
    'vue-style-loader' : MiniCssExtractPlugin.loader;

var config = {};

config.context = PATH;
config.name = 'client';
config.target = 'web';
config.mode = NODE_ENV;

config.entry = {
    app: [
        '@babel/polyfill',
        './src/entry-client.js'
    ]
};

config.output = {
    publicPath: '/',
    path: path.join(PATH, dist),
    filename: 'static/build/[name].js'
};

config.resolve = {
    alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': path.join(PATH, 'src'),
        'assets': path.join(PATH, 'assets')
    },
    extensions: ['.js', '.jsx', '.vue']
};

config.module = {
    rules: [{
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
        use: [{
            loader: styleLoader
        },
        'css-loader', 'postcss-loader'
        ]
    },
    {
        test: /\.(styl|stylus)$/,
        use: [{
            loader: styleLoader
        },
        'css-loader', 'postcss-loader', 'stylus-loader'
        ]
    },
    {
        test: /\.(jpg|png|gif|svg)$/,
        exclude: /fonts/,
        use: [{
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'img/',
                emitFile: false
            }
        }]
    },
    {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        exclude: /img/,
        use: [{
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'fonts/',
                emitFile: false
            }
        }]
    }
    ]
};

config.plugins = [
    new WebpackBar(),
    new ManifestPlugin({
        fileName: 'json/webpack-manifest.json',
        publicPath: ''
    }),
    new MiniCssExtractPlugin({
        filename: 'static/build/[name].bundle.css',
        chunkFilename: 'static/build/[id].bundle.css'
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(NODE_ENV),
            'client': JSON.stringify(true)
        }
    }),
    new VueSSRClientPlugin({
        filename: 'json/vue-client-manifest.json'
    }),
    new webpack.NoEmitOnErrorsPlugin()
];

if (HOT_RELOAD) {
    config.entry.app.push('webpack-hot-middleware/client');
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

config.optimization = {
    minimizer: [
        new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: NODE_ENV === 'development'
        }),
        new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
        chunks: 'all',
        minSize: 3000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
            chunks: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10
            },
            default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
            }
        }

    }
};

config.devtool = NODE_ENV === 'development' ? 'eval-source-map' : false;

module.exports = config;