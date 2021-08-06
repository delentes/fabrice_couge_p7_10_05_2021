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
            <div v-show= "findspam" class="card" v-for="spam of spams" :key="spam.topic_id">
                <h4>{{spam.title}}</h4>
                <p>{{spam.topic}}</p>
                <button>Annuler</button>
                <button class="button__admin">Supprimer</button>
            </div>
            <div v-show= "findspam" class="card" v-for="spam of spams" :key="spam.comment_id">
                <p>{{spam.comment}}</p>
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
    this.$store.dispatch('getSpam');
    },
    computed: {
        findspam: function () {
            if (this.$store.state.spams != 0) {
                return true;
            } else {
                return false;
            }
        },
        ...mapState(['usersInfos','spams'])
    },
    
    methods: {
        addAdmin: function (id) {
            this.$store.dispatch('addAdmin', id)
        },
        deleteUser: function (id) {
            this.$store.dispatch('deleteUser', id)
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

