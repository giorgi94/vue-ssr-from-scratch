import 'assets/stylus/main.styl';
import Vue from 'vue';
import VueCarousel from 'vue-carousel';
import Gallery from './components/Gallery';

import {
    createApp
} from './app';

Vue.use(VueCarousel);

Vue.component('Gallery', Gallery);


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
    document.querySelector('#app').innerHTML = '';

    app.$mount('#app');

    global.app = app;
});