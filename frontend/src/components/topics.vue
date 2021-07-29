<template>
    <div class="topics" >
        <div class="card" v-for="topic of this.$store.state.topic" :key ="topic.id">
            <h1 class="card__title">Sujet de discution</h1>
            <h3 class="card__subtitle">{{topic.title}}</h3>
            <p>{{topic.topic}}</p>
            <div class="form-row">
            <button class="button">
                Déconnexion
            </button>
            <button class="button__delete">
                Supprimé le compte
            </button>
            </div>
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

}
</script>