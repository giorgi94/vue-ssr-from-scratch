<template>
    <div style="width: 400px; margin: auto;">
        <carousel :per-page="3" :mouse-drag="false">
            <slide>Slide 1 Content</slide>
            <slide>Slide 2 Content</slide>
            <slide>Slide 3 Content</slide>
            <slide>Slide 4 Content</slide>
            <slide>Slide 5 Content</slide>
        </carousel>
    </div>
</template>


<script>
import { Carousel, Slide } from 'vue-carousel';

export default {
    components: {
        Carousel,
        Slide
    },
    data () {
        return {
            mounted: false
        };
    },
    beforeMount () {
        this.mounted = true;
    }
};
</script>
