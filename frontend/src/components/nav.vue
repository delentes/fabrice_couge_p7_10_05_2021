<template>
    <nav>
        <v-app-bar>
            <v-btn :to="home">
                <span>Acceuil</span>
            </v-btn>
            <div v-if="status = ''">
                <v-btn :to="login">
                    <span>Se Connecter</span>
                </v-btn>
            </div>
            <v-btn :to="profile" >
                <span>votre profile</span>
            </v-btn>
        </v-app-bar>
    </nav>
    
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'navBar',
    data: () => ({
        home:"/",
        login: "/login",
        Profile: "/profile"
    }),
    computed: {
        ...mapState(['status'])
    }
}

</script>
<style scoped>

</style>