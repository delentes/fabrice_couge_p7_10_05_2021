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
                <button @click="signalTopic(topic.topic_id)" class="button__sup">Signaler</button>
                <button v-show="validateUser" @click="modifyTopic(topicInfos.topic_id)" class="button__modify">Modifier</button>
                <button v-show="validateUser" @click="deleteTopic(topicInfos.topic_id)" class="button__sup">Supprimer</button>
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
        validateUser: function () {
            if(this.$store.state.user.userId === this.$store.state.topicInfos.user_id) {
                return true;
            } else {
                return false;
            }
        },
        ...mapState(['topicInfos','userInfos'])
    },
    methods: {
        deleteTopic: function (topic_id) {
            this.$store.dispatch('deleteTopic', topic_id)
            this.$route.push('/topics')
        },
        modifyTopic: function (topic_id) {
            this.$route.push(`/modifyTopic/${topic_id}`)
        },
        signalTopic: function (topic_id) {
            this.store.dispatch('signalTopic', {
                topic_id: topic_id,
            })
        },
    }
    
    
}
</script>
