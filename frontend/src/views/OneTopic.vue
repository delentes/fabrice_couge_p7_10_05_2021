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
    name: 'topic',

    mounted: function () {
        this.$store.dispatch('getOneTopic', this.$route.params.id)
    },
    ...mapState(['topic'])
}
</script>
