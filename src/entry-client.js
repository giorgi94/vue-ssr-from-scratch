import 'assets/stylus/main.styl';
import {
    createApp
} from './app';

const {
    app,
    router,
    store
} = createApp();

global.HOST = `${global.location.protocol}//${global.location.host}`;


if (global.__INITIAL_STATE__) {
    store.replaceState({
        ...store.state,
        ...global.__INITIAL_STATE__
    });
}

router.onReady(() => {
    app.$mount('#app');

    global.app = app;
});