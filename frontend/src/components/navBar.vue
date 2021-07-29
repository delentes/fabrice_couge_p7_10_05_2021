<template>
    <nav>
        <router-link  to = "/">Accueil </router-link>
        <router-link  to = "/login">| Se connecter </router-link>
        <router-link v-show = "switchLogin" to = "/profile">| Vos info </router-link>
        <router-link v-show = "switchLogin" to = "/postTopic">| Ajouter un sujet </router-link>
            
    </nav>
</template>
<script>
import { mapState } from 'vuex'


export default {
    name: 'navBar',
    
    computed: {
        switchLogin: function () {
            if (this.$store.state.user.userId != -1) {
                return true;
            } else {
                return false;
            }
        },
        switchAdmin: function () {
            if (this.$store.state.user.isadmin === 1) {
                return true;
            } else {
                return false;
            }
        },
    ...mapState(['store'])
    },
}

</script>
<style scoped>

</style>