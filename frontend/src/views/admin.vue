<template>
    <h1 class="card__title">Gestion administrateur</h1>
    <div class="page__admin">
        <div>
            <h3 class="card__subtitle">Gestion des utilisateurs</h3>
            <div class="card" v-for="user of usersInfos" :key="user.id">
                <p>{{user.lastname}} {{user.firstname}}</p>
                <p>{{user.email}}</p>
                <button @click="deleteUser(user.id)" class="button__admin">Supprimé l'utilisateur</button>
                <button @click="addAdmin(user.id)" class="button__admin">Ajouter un administrateur</button>
            </div>
        </div>
        <div>
            <h3 class="card__subtitle">Gestion des spam</h3>
            <div v-show= "findSpamComment" class="card" v-for="spam of spamsComment" :key="spam.spamcomment_id">
                <p>{{spam.comment}}</p>
                <p>signalé par {{spam.lastname}} {{spam.firstname}}</p>
                <button @click="cancelSpamComment(spam.spamcomment_id)" class="button__admin">Annuler</button>
                <button @click="deleteSpamComment(spam.spamcomment_id,spam.comment_id)" class="button__admin">Supprimer</button>
            </div>
            <div v-show= "findSpamTopic" class="card" v-for="spamTopic of spamsTopic" :key="spamTopic.spamtopic_id">
                <h4>{{spamTopic.title}}</h4>
                <p>{{spamTopic.topic}}</p>
                <p>signalé par {{spamTopic.lastname}} {{spamTopic.firstname}}</p>
                <button @click="cancelSpamTopic(spamTopic.spamtopic_id)" class="button__admin">Annuler</button>
                <button @click="deleteSpamTopic(spamTopic.spamtopic_id,spamTopic.topic_id)" class="button__admin">Supprimer</button>
            </div>
        </div>
    </div>
</template>
<script>

import { mapState } from 'vuex';
export default {
    name: 'admin',
    mounted: function () {
    if (this.$store.state.user.userId == -1) {
        this.$router.push('/login');
        return;
    } else if (this.$store.state.user.isadmin === 0) {
        this.$router.push('/login');
        return;
    }
    this.$store.dispatch('getAllUsers');
    this.$store.dispatch('getSpamComment');
    this.$store.dispatch('getSpamTopic');
    },
    computed: {
        findSpamComment: function () {
            if (this.$store.state.spamsComment != 0) {
                return true;
            } else {
                return false;
            }
        },
        findSpamTopic: function () {
            if (this.$store.state.spamsTopic != 0) {
                return true;
            } else {
                return false;
            }
        },
        ...mapState(['usersInfos','spamsComment','spamsTopic'])
    },
    
    methods: {
        addAdmin: function (id) {
            this.$store.dispatch('addAdmin', id)
        },
        deleteUser: function (id) {
            this.$store.dispatch('deleteUser', id)
        },
        cancelSpamComment: function (id) {
            this.$store.dispatch('cancelSpamComment', {
                spamcomment_id: id,
            });
            window.location.reload();
        },
        deleteSpamComment: function (spamcomment_id,comment_id) {
            this.$store.dispatch('deleteSpamComment', {
                spamcomment_id: spamcomment_id,
                comment_id: comment_id,
            });
            window.location.reload();
        },
        cancelSpamTopic: function (id) {
            this.$store.dispatch('cancelSpamTopic', {
                spamtopic_id: id,
            });
            window.location.reload();
        },
        deleteSpamTopic: function (spamtopic_id, topic_id) {
            this.$store.dispatch('deleteSpamTopic', {
                spamtopic_id: spamtopic_id,
                topic_id: topic_id,
            });
            window.location.reload();
        },
    },
}
</script>
<style scoped>
    .page__admin{
        display: flex;
        flex-wrap: wrap;
        margin: 10px;
    }
</style>

