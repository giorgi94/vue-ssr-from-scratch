import Vue from 'vue';
import axios from 'axios';

import Vuex from 'vuex';
import VueMeta from 'vue-meta';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';

Vue.prototype.$http = axios;


Vue.use(Vuex);
Vue.use(VueRouter);

Vue.use(VueMeta, {
    keyName: 'metaInfo',
    attribute: 'data-vue-meta',
    ssrAttribute: 'data-vue-meta-server-rendered',
    tagIDKeyName: 'vmid'
});







import App from './components/App';

import { createStore } from './store';
import { createRouter } from './router';



export function createApp() {
    const router = createRouter();
    const store = createStore();

    sync(store, router);

    const app = new Vue({
        store,
        router,
        render: h => h(App)
    });
    return { app, router, store };
}
