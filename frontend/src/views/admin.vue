<template>
    <h1 class="card__title">Gestion administrateur</h1>
    <div class="page__admin">
        <div>
            <h3 class="card__subtitle">Gestion des utilisateurs</h3>
            <div class="card" v-for="user of usersInfos" :key="user.id">
                <p>{{user.lastname}} {{user.firstname}}</p>
                <p>{{user.email}}</p>
                <div v-if="!findUser(user.id)">
                    <button @click="addAdmin(user.id)" v-if="findisadmin(user.isadmin)" aria-label="ajout administrateur" class="button__blue__admin">Supprimer les droits</button>
                    <button @click="addAdmin(user.id)" v-else aria-label="ajout administrateur" class="button__blue__admin">Ajouter un administrateur</button>
                    <button @click="deleteUser(user.id)" aria-label="suppréssion utilisateur" class="button__admin">Supprimé l'utilisateur</button>
                </div>
            </div>
        </div>
        <div class="">
            <h3 class="card__subtitle">Gestion des sujets et commentaires</h3>
            <div v-show= "findSpamComment" class="card" v-for="spam of spamsComment" :key="spam.spamcomment_id">
                <p>{{spam.comment}}</p>
                <p>signalé par {{spam.lastname}} {{spam.firstname}}</p>
                <button @click="cancelSpamComment(spam.spamcomment_id)" aria-label="annulation spam topic" class="button__blue__admin">Annuler</button>
                <button @click="deleteSpamComment(spam.spamcomment_id,spam.comment_id)" aria-label="suppréssion topic" class="button__admin">Supprimer</button>
            </div>
            <div v-show= "findSpamTopic" class="card" v-for="spamTopic of spamsTopic" :key="spamTopic.spamtopic_id">
                <h4>{{spamTopic.title}}</h4>
                <p>{{spamTopic.topic}}</p>
                <p>signalé par {{spamTopic.lastname}} {{spamTopic.firstname}}</p>
                <button @click="cancelSpamTopic(spamTopic.spamtopic_id)" aria-label="annulation spam commentaire" class="button__blue__admin">Annuler</button>
                <button @click="deleteSpamTopic(spamTopic.spamtopic_id,spamTopic.topic_id)" aria-label="suppréssion commentaire" class="button__admin">Supprimer</button>
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
    } else {
        this.$store.dispatch('getAllUsers');
        this.$store.dispatch('getSpamComment');
        this.$store.dispatch('getSpamTopic');
        }
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
            window.location.reload();
        },
        deleteUser: function (id) {
            this.$store.dispatch('deleteUser', id)
            window.location.reload();
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
        findisadmin: function (isadmin) {
            if (isadmin != 0) {
                return true;
            } else {
                return false;
            }
        },
        findUser: function (user_id) {
            if (this.$store.state.user.userId === user_id) {
                return true;
            } else {
                return false;
            }
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

