<template>
    <div class="topics" >
        <h1 class="card__title">Sujet de discution</h1>
        <button @click="createTopic()" class="button">Poster un sujet</button>
        <div class="card" v-for="topic of this.$store.state.topic" :key ="topic.topic_id">
            <a @click="getOneTopic(topic.topic_id)" class="link" >
                <h3 class="card__subtitle">{{topic.title}}</h3>
                <p>{{topic.topic}}</p>
                <div class="form-row">
                <img v-bind:src="topic.image_url" alt="">
                <p class="form-row">Par : {{topic.firstname}} {{topic.lastname}}</p>
                </div>
            </a>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: 'topics',
    
    mounted: function () {
    if (this.$store.state.user.userId == -1) {
      this.$router.push('/login');
      return;
    }
    this.$store.dispatch('getTopics');
  },
    methods: {
        createTopic: function () {
            this.$router.push('/createTopic')
        },
        getOneTopic: function (topic_id) {
            this.$router.push(`/topics/${topic_id}`);
        },
        ...mapState(['topic'])
    }
}
</script>
