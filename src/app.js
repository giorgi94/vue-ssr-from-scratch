import Vue from 'vue';
import axios from 'axios';

import Vuex from 'vuex';
import VueMeta from 'vue-meta';
import VueRouter from 'vue-router';

Vue.use(Vuex);
Vue.use(VueMeta);
Vue.use(VueRouter);
Vue.prototype.$http = axios;

import App from './components/App';

import { createStore } from './store';
import { createRouter } from './router';



export function createApp() {
    const router = createRouter();
    const store = createStore();
    const app = new Vue({
        store,
        router,
        render: h => h(App)
    });
    return { app, router, store };
}
