const fs = require('fs');
const { createBundleRenderer } = require('vue-server-renderer');

const bundles = {
    clientUrl: `${__dirname}/dist/json/vue-client-manifest.json`,
    serverUrl: `${__dirname}/dist/json/vue-server-bundle.json`
};

const serverRender = (ctx, callback) => {
    let clientManifest, serverBundle;

    if (ctx.bundles) {
        clientManifest = ctx.bundles.client;
        serverBundle = ctx.bundles.server;
    } else {
        clientManifest = JSON.parse(fs.readFileSync(bundles.clientUrl));
        serverBundle = JSON.parse(fs.readFileSync(bundles.serverUrl));
    }

    const bundleRender = createBundleRenderer(serverBundle, {
        clientManifest,
        inject: false
    });

    return bundleRender.renderToString(ctx, callback);
};

const renderOptinos = (ctx, opts) => {
    const metaInfo = ctx.meta.inject();

    const options = {
        ...opts,
        title: metaInfo.title.text(),
        meta: metaInfo.meta.text(),
        link: metaInfo.link.text(),
        renderResourceHints: ctx.renderResourceHints(),
        renderStyles: ctx.renderStyles(),
        renderScripts: ctx.renderScripts(),
        state: ctx.renderState()

    };

    return options;
};

module.exports = { serverRender, renderOptinos };
