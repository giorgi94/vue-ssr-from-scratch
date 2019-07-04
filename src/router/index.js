import Router from 'vue-router';

const HomePage = () => import( /* webpackChunkName: "home" */ '@/views/Home');
const AboutPage = () => import( /* webpackChunkName: "about" */ '@/views/About');
const PageNotFound = () => import( /* webpackChunkName: "404" */ '@/views/404');

export function createRouter() {
    const router = new Router({
        mode: 'history',
        routes: [{
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/about',
            name: 'about',
            component: AboutPage
        },
        {
            path: '*',
            name: 'pagenotfound',
            component: PageNotFound
        }
        ]
    });


    return router;
}