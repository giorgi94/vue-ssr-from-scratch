import { createApp } from './app';

const additionalAsyncRequests = ({ store, route }) => {
    var AsyncRequests = [

    ];
    return AsyncRequests;
};

export default (context) => {
    global.HOST = context.HOST;

    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp();

        router.push(context.url);

        store.replaceState({ ...store.state, ...context.storeState });

        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();

            if (!matchedComponents.length) {
                return reject(new Error('Page Not Found'));
            } else {
                let AsyncRequests = matchedComponents.reduce(
                    (asyncRequests, Component) => {
                        if (Component.asyncData) {
                            asyncRequests.push(Component.asyncData);
                        }
                        return asyncRequests;
                    }, []);

                AsyncRequests = AsyncRequests.concat(additionalAsyncRequests({
                    store,
                    route: router.currentRoute
                }));

                Promise.all(AsyncRequests.map(asyncData => {
                    return asyncData({
                        store,
                        route: router.currentRoute
                    });
                })).then(() => {
                    context.meta = app.$meta();
                    context.state = store.state;

                    resolve(app);
                }).catch((error) => {
                    console.log(error);
                    return reject(new Error('Server Error'));
                });
            }
        }, (error) => {
            console.log(error);
        });
    }).catch((error) => {
        console.log(error);
    });
};
