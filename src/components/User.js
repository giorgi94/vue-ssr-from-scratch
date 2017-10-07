export default {
    asyncData({store, route}) {
        return store.dispatch('fetchUser', route.params.id)
    },
    data () {
        return {
            message: 'this is my User page.',
        }
    },
    computed: {
        user: {
            get() {
                return this.$store.getters.getUser
            }
        }
    },
    watch: {
        '$route.params.id': (id) => {
            // this.$store.dispatch('fetchUser', id);
            console.log(this)
        }
    },
    created() {
        
    },
    components: {
        
    },
    methods: {
        
    },
    template: `
    <div>

        <p>{{message}}</p>
        <p>User ID: {{user.id}}</p>
        <p>User name: {{user.name}}</p>

        <router-link to="/">root</router-link>
        <router-link to="/home">home</router-link>


    </div>
    `
}