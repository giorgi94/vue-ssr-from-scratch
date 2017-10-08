const fs = require('fs');
const path = require('path');
const express = require('express');

const { createRenderer } = require('vue-server-renderer');

const NODE_ENV = process.env.NODE_ENV || 'development';
const ROOT_DIR = path.join(__dirname, '..');
const DIST_DIR = path.join(__dirname, '..', 'dist');


const server = express();

const ejs = require('ejs')
server.set('view engine', 'ejs')
server.set('views', path.join(DIST_DIR));


if(NODE_ENV === 'development') {  

    const webpack = require('webpack');
    const webpackConfig = require('../webpack.config');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const compiler = webpack(webpackConfig);

    server.use(webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath
    }));

    server.use(webpackHotMiddleware(compiler));
}
else {
    server.use('/static', express.static(path.join(ROOT_DIR, 'dist', 'static')));  
}


const resolveApp = require('../src/entry-server');

var count = 0

server.get("/api", (req, res) => {

    count += 1;

    console.log(`you requested api for ${count} times`)
    res.json({
        message: 'this is api'
    });
})



const users = [
    {id:1, name: 'Jule Ferdinand'},
    {id:2, name: 'Ramon Desch'},
    {id:3, name: 'Waldo Artman'},
    {id:4, name: 'Dalene Stang'},
]


server.get("/api/:id", (req, res) => {

    console.log(`you requested ${req.url}`)
    res.json(users.find((val)=>val.id==req.params.id));
})


server.get("*", (req, res) => {

    let renderer = createRenderer({
        template: fs.readFileSync(path.join(DIST_DIR, 'index.ejs'), 'utf-8')
    });

    resolveApp(req).then((app)=>{
        renderer.renderToString(app, (err, html) => {
            if (err) throw err  
            
            html = ejs.render(html, {
                __INITIAL_STATE__: `window.__INITIAL_STATE__ = ${JSON.stringify(app.$store.state)}`
            })

            res.send(html);
        })
    }).catch((err)=>{
        res.send(err);  
    })
    
});






const PORT = process.env.PORT || 8080;

server.listen(PORT, ()=>{
    console.log(`listening to port ${PORT} (${NODE_ENV})`);
});