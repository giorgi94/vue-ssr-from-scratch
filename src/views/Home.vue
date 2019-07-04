<template lang="html">
    <div class="content">
        <h2>Home Page</h2>


        <ul>
            <li
                v-for="(item, ind) in mydata"
                :key="ind"
            >
                {{ item }}
            </li>
        </ul>
    </div>
</template>

<script>

const asyncData = ({ store, route }) => {
    return store.dispatch('GetData', {
        key: 'mydata',
    });
};

export default {
    computed: {
        mydata () {
            return this.$store.getters.GetData;
        }
    },
    asyncData,
    beforeMount () {
        if (this.mydata.length === 0) {
            this.$store.dispatch('GetData', {
                key: 'mydata',
            });
        }
    }
};
</script>