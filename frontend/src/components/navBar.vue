<template>
    <nav>
        <v-app-bar>
            <v-btn :to="home">
                <span>Acceuil</span>
            </v-btn>
            <v-btn :to="login">
                <span>Se Connecter</span>
            </v-btn>

            <v-btn :to="profile" >
                <span>votre profile</span>
            </v-btn>
        </v-app-bar>
    </nav>
    
</template>
<script>
export default {
    name: 'navBar',
    data: () => ({
        home:"/",
        login: "/login",
        profile: "/profile"
    }),
}

</script>
<style scoped>

</style>