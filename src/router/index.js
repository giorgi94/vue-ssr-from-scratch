import VueRouter from 'vue-router';


import Root from '../components/Root'
import Home from '../components/Home'
import User from '../components/User'


export function createRouter () {
    return new VueRouter({
        mode: 'history',
        routes: [
            { path: '/', name: 'index', component: Root },
            { path: '/home', name: 'home', component: Home },
            { path: '/user/:id', name: 'user', component: User },
        ]
    });
}