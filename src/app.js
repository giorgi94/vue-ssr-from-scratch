import Vue from 'vue';
import Vuex from 'vuex';
import VueMeta from 'vue-meta';
import VueRouter from 'vue-router';



import App from './App';

import {
    createRouter
} from './router';
import {
    createStore
} from './store';


Vue.use(Vuex);
Vue.use(VueRouter);

Vue.use(VueMeta, {
    keyName: 'metaInfo',
    attribute: 'data-vue-meta',
    ssrAttribute: 'data-vue-meta-server-rendered',
    tagIDKeyName: 'vmid'
});



export function createApp() {
    const router = createRouter();
    const store = createStore();

    const app = new Vue({
        store,
        router,
        render: h => h(App)
    });

    return {
        app,
        router,
        store
    };
}