<template>
    <div>
        <p>{{message}}</p>

        <router-link to="/">root</router-link>
        <router-link to="/home">home</router-link>
    </div>
</template>


<script>
    
export default {
    metaInfo: {
        title: 'My Awesome Vue App',
    },
    data () {
        return {
            message: 'this is my home page. It is great page'
        }
    },
    components: {
        
    },
    methods: {
        
    }
}
</script>