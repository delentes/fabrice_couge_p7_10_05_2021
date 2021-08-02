<template>
    <div class="topics" >
        <h1 class="card__title">Sujet de discution</h1>
        <div class="card" v-for="topic of this.$store.state.topic" :key ="topic.id">
            <a @click="getOneTopic()" class="link" >
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
export default {
    name: 'topics',

    mounted: function () {
        this.$store.dispatch('getTopics')
        this.$store.state.topic;
    },
    methods: {
        getOneTopic: function () {
            this.$router.push(`/{{topic.id}}`);
        }
        
    }
}
</script>
