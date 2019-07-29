<template lang="html">
    <div id="app">
        <h1>{{ title }}</h1>
        <img
            src="/static/img/image.jpeg"
            alt=""
        >
        <router-view />
    </div>
</template>

<script>

export default {
    data () {
        return {
            title: 'This is vue site'
        };
    }
};
</script>
