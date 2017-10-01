import VueRouter from 'vue-router';


import App from '../components/App'
import Root from '../components/Root'
import Home from '../components/Home'
import User from '../components/User'




const routes = [
    { path: '/', name: 'index', component: Root },
    { path: '/home', name: 'home', component: Home },
    { path: '/user/:id', name: 'user', component: User },
]

export default new VueRouter({
    mode: 'history',
    routes
});