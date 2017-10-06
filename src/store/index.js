import Vuex from 'vuex';


export function createStore() {
    return new Vuex.Store({
        strict: true,
        state: {
            msg: 'empty'
        },
        getters: {
            getMsg(state, msg) {
                return state.msg;
            },
        },
        mutations: {
            setMsg(state, msg) {
                state.msg = msg;
            },
        },
        actions: {

        }
    })
}
