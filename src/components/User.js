export default {
    metaInfo() {
        return {
            title: `User: ${this.user.name}`,
            meta: [
                { name: 'description', content: 'my description' },
                { name: 'title', content: 'my title' }
            ]
        }
    },
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
    created() {
        this.$store.watch(() => this.$store.state.route, route => {
            if(this.user.id != route.params.id)
                this.$store.dispatch('fetchUser', route.params.id);
        })
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