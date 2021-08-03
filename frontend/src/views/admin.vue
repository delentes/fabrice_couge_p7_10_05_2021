<template>
    <h1>Gestion administrateur</h1>
    <div class="card" v-for="user of this.$store.state.usersInfos" :key="user.id">
        <p>{{user.lastname}} {{user.firstname}}</p>
        <p>{{user.email}}</p>
        <button class="button__admin">Supprimé l'utilisateur</button>
        <button class="button__admin">Ajouter un administrateur</button>
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
    },
    ...mapState(['usersInfos']),
    methods: {
        addAdamin:function () {

        },
        deleteUser: function () {

        },
    }
}
</script>


