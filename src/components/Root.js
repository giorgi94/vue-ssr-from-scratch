export default {
    data () {
        return {
            message: 'this is my root page',
            api: {},
        }
    },
    components: {
        
    },
    created() {
        this.sendRequest()
    },
    methods: {
        sendRequest() {
            this.$http.get('/api').then((res)=>{
                this.api = res.data
            }).catch((err)=>{
                this.api = err;
            });
        }
    },
    template: `<div>

        <p>{{message}}</p>


        <router-link to="/">root</router-link>
        <router-link to="/home">home</router-link>


        <button @click="sendRequest()">Send Request</button>

        <div>{{api}}</div>

    </div>`
}