const path = require('path');
const express = require('express');

const NODE_ENV = process.env.NODE_ENV || 'development';
const ROOT_DIR = path.join(__dirname, '..');


const server = express();


server.set('view engine', 'ejs')
server.set('views', path.join(ROOT_DIR, 'dist'));


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



const renderer = require('vue-server-renderer').createRenderer()


const createApp = require('../src/app');


function getRouter(url) {
    return new Promise((resolve, reject) => {
        const { app, router } = createApp();

        router.push(url)
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()

            if (!matchedComponents.length) {
                reject({ code: 404 });
            }
            else {
                resolve(app);
            }

        },reject)
    })
}


var count = 0

server.get("/api", (req, res) => {

    count += 1;

    console.log(`you requested api for ${count} times`)
    res.json({
        message: 'this is api'
    });
})


server.get("*", (req, res) => {

    getRouter(req.url).then((app)=>{
        renderer.renderToString(app, (err, html) => {
            if (err) throw err  
            res.render('index.ejs', {html: html});
        })
    }).catch((err)=>{
        res.send(err);  
    })
    
});






const PORT = process.env.PORT || 8080;

server.listen(PORT, ()=>{
    console.log(`listening to port ${PORT} (${NODE_ENV})`);
});