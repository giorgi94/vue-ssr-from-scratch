import { createApp } from './app';



export default (context) => {

    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp();

        router.push(context.url);

        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()

            if (!matchedComponents.length) {
                return reject({ code: 404 });
            }
            else {
                Promise.all(matchedComponents.map(Component => {

                    if(Component.asyncData) {
                        return Component.asyncData({
                            store,
                            route: router.currentRoute
                        });
                    }

                })).then(() => {
                    
                    context.meta = app.$meta();
                    context.state = store.state;

                    resolve(app);
                }).catch((error)=>{
                    console.log(error)
                })
            }

        },(error)=>{
            console.log(error)
        });
    }).catch((error)=>{
        console.log(error)
    })
}


