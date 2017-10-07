export default {
    components: {
        
    },
    methods: {
        
    },
    template: `
    <div id="app">
        <router-view></router-view>

        <br>

        <div>

        <router-link :to="{name:'user', params:{id:1}}">user 1</router-link><br>
        <router-link :to="{name:'user', params:{id:2}}">user 2</router-link><br>
        <router-link :to="{name:'user', params:{id:3}}">user 3</router-link><br>
        <router-link :to="{name:'user', params:{id:4}}">user 4</router-link>
   
        </div>
    </div>
    `
}