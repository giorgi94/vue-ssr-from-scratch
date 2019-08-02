<template lang="html">
    <div id="app">
        <h1>{{ title }}</h1>
        <img
            src="/static/img/image.jpeg"
            alt=""
        >
        <router-view />
        <template v-if="mounted">
            <component :is="'Gallery'" />
        </template>
    </div>
</template>

<script>

export default {
    data () {
        return {
            title: 'This is vue site',
            mounted: false
        };
    },
    beforeMount () {
        this.mounted = true;
    }
};
</script>
