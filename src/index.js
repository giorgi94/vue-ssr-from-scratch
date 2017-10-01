import Vue from 'vue';
import App from './components/App';

import VueRouter from 'vue-router'

Vue.use(VueRouter)

import router from './router';



var app = new Vue({
    el: '#app',
    router,
    render: h => h(App)
});

module.exports = { app, router };