export default {
    data () {
        return {
            message: 'this is my User page.'
        }
    },
    components: {
        
    },
    methods: {
        
    },
    template: `
    <div>

        <p>{{message}}</p>
        <p>User ID: {{$route.params.id}}</p>

        <router-link to="/">root</router-link>
        <router-link to="/home">home</router-link>


    </div>
    `
}