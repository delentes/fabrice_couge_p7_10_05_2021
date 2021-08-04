<template>
    <div>
        <h1 class="card__title">Sujet de discution</h1>
        <div class="card">
            <h1 class="card__subtitle">{{topicInfos.title}}</h1>
            <p>{{topicInfos.topic}}</p>
            <div class="form-row">
                <img v-bind:src="topicInfos.image_url" alt="">
                <p class="form-row">Par : {{topicInfos.firstname}} {{topicInfos.lastname}}</p>
            </div>
            <div>
                <button class="button__sup">Signaler</button>
                <button class="button__modify">Modifier</button>
                <button class="button__sup">Supprimer</button>
            </div>
        </div>
        <div class="comment">
            <comment></comment>
        </div>
        <div class="createComment">
            <createComment></createComment>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import createComment from '@/components/createcomment.vue';
import comment from '@/components/comment.vue';

export default {
    name: 'topic',
    
    components:{
        createComment,
        comment,
    },
    mounted: function () {
        this.$store.dispatch('getOneTopic', this.$route.params.id)
    },
    computed: {
        ...mapState(['topicInfos'])
    },
    
    
}
</script>
