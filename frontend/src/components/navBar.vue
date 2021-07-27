<template>
    <nav>
        <v-app-bar>
            <router-link to = "/">Acceuil</router-link> |
            <router-link to = "/login">Se connecter</router-link> |
            <router-link to = "/profile">Vos info</router-link>
        </v-app-bar>
    </nav>
    
</template>
<script>
export default {
    name: 'navBar',
    
}

</script>
<style scoped>

</style>