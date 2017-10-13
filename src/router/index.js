import VueRouter from 'vue-router';


export function createRouter () {
    return new VueRouter({
        mode: 'history',
        routes: [
            { path: '/', name: 'index', component: ()=>import('../components/Root') },
            { path: '/home', name: 'home', component: ()=>import('../components/Home') },
            { path: '/user/:id', name: 'user', component: ()=>import('../components/User') },
        ]
    });
}