<template>
    
</template>
<script>
export default {
    name: 'topic',
    mounted: function () {
        this.$store.dispatch('getTopics');
    },
    methods:{
        
    }
}
</script>