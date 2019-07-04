import Vuex from 'vuex';
import axios from 'axios';

export function createStore() {
    return new Vuex.Store({
        strict: false,
        state: {
            mydata: null
        },
        getters: {
            GetData: (state) => {
                return state.mydata ? state.mydata.items : [];
            }
        },
        mutations: {
            SetData(state, {
                key,
                value
            }) {
                state[key] = value;
            }
        },
        actions: {
            GetData(ctx, opts) {
                const key = opts.key;
                const url = global.HOST + '/api/data';

                console.log(url);

                return axios({
                    url,
                    mathod: 'get'
                }).then(res => {
                    ctx.commit('SetData', {
                        key,
                        value: res.data
                    });
                    console.log(res.data);
                    return res.data;
                }).catch(err => console.log(err));
            }
        }
    });
}