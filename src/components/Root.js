export default {
    data () {
        return {
            message: 'this is my root page'
        }
    },
    components: {
        
    },
    methods: {
        
    },
    template: `<div>
        <p>{{message}}</p>


        <router-link to="/">root</router-link>
        <router-link to="/home">home</router-link>
    </div>`
}