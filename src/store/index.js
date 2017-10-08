import Vuex from 'vuex';
import axios from 'axios'

export function createStore() {
    return new Vuex.Store({
        strict: true,
        state: {
            msg: 'empty',
            user: {id:-1, name:'anonymous'},
        },
        getters: {
            getMsg(state) {
                return state.msg;
            },
            getUser(state) {
                return state.user;
            },
        },
        mutations: {
            setMsg(state, msg) {
                state.msg = msg;
            },
            setUser(state, user) {
                state.user = user;
            },
        },
        actions: {
            fetchUser(context, id) {

                return axios.get(`http://localhost:8080/api/${id}`).then((res)=>{
                    context.commit('setUser', res.data)
                }).catch((error)=>{
                    console.log('error:',error)
                });
            }
        }
    })
}
