const path = require('path');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');

const {
    ApiRouter
} = require('./api/router');

const {
    serverRender,
    renderOptinos
} = require('./render');


const NODE_ENV = process.env.NODE_ENV || 'production';
const PATH = __dirname;

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 8080;

const server = express();

server.set('view engine', 'pug');
server.set('views', path.join(PATH, 'templates'));

server.use(bodyParser.json());

server.use('/media', express.static(path.join(PATH, 'media')));

const asyncHandler = fn =>
    function asyncUtilWrap(...args) {
        const fnReturn = fn(...args);
        const next = args[args.length - 1];
        return Promise.resolve(fnReturn).catch(next);
    };

if (NODE_ENV === 'development') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const clientConfig = require('./build/webpack.client');
    const compiler = webpack(clientConfig);

    server.use(webpackDevMiddleware(compiler, {
        publicPath: '/'
    }));

    server.use(webpackHotMiddleware(compiler));
} else {
    server.use('/static', express.static(path.join(PATH, 'dist/static')));
}

server.use('/api', ApiRouter);

server.get('*', asyncHandler(async (req, res) => {

    const options = {
        rendered: null,
    };

    req.HOST = `${req.protocol}://${req.hostname}:${PORT}`;

    if (NODE_ENV === 'development') {
        const host = `http://${HOST}:${PORT}`;
        const manifest = await axios.get(
            `${host}/json/vue-client-manifest.json`).then(r => r.data);

        options.scripts = manifest['initial'].filter(
            e => /\.js/.test(e)).map(e => `/${e}`);
        options.styles = manifest['all'].filter(
            e => /\.css/.test(e)).map(e => `/${e}`);

        res.render('index', options);
    } else {
        // req.HOST = `${req.protocol}://${reqhost}`;

        serverRender(req, (err, html) => {
            if (err) {
                console.log(err);
                res.send('Something went wrong');
            } else {
                options.rendered = renderOptinos(req, {
                    html
                });
                res.render('index', options);
            }
        });
    }
}));

server.listen(PORT, HOST, () => {
    console.log(`\nlistening to port ${HOST}:${PORT} (${NODE_ENV})\n`);
});