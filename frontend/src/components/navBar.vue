<template>
    <nav>
        <router-link class="navbar"  to = "/">Accueil </router-link>
        <router-link class="navbar" v-show = "switchNoLogin" to = "/login"> Se connecter </router-link>
        <router-link class="navbar" v-show = "switchLogin" to = "/profile"> Vos infos </router-link>
        <router-link class="navbar" v-show = "switchLogin" to = "/Topics"> Rejoindre les sujets </router-link>
        <router-link class="navbar" v-show = "switchAdmin" to = "/admin"> Page administrateur </router-link>
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
        switchNoLogin: function () {
            if (this.$store.state.user.userId == -1) {
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
