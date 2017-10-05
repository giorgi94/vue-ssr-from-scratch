import Vue from 'vue';
import axios from 'axios';

import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.prototype.$http = axios;

import App from './components/App';

import { createRouter } from './router';



module.exports = function createApp() {
    const router = createRouter();
    const app = new Vue({
        router,
        render: h => h(App)
    });
    return { app, router };
}
