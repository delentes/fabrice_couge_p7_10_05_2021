<template>
    <div class="topics" >
        <h1 class="card__title">Sujet de discution</h1>
        <div class="card">
                
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: 'topics',

    mounted: function () {
        this.$store.dispatch('getOneTopic')
        console.log('test3',this.$store.state.topic)
    },
    ...mapState(['topic'])
}
</script>
