<template>
  <div class="card">
    <h1 class="card__title">Espace perso</h1>
    <p class="card__subtitle">Vos données personnels</p>
    <p>Prénom: {{user.firstname}}</p>
    <p>Nom: {{user.lastname}}</p>
    <p>Email: {{user.email}}</p>

    <div class="form-row">
      <button @click="logout()" class="button">
        Déconnexion
      </button>
      <button @click="deleteAccount" class="button__delete">
        Supprimé le compte
      </button>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name:'profile',
  mounted: function () {
    if (this.$store.state.user.userId == -1) {
      this.$router.push('/login');
      return;
    }
    this.$store.dispatch('getUserInfos');
  },
  computed: {
    ...mapState({
      user: 'userInfos',
    })
  },
  methods: {
    logout: function () {
      this.$store.commit('logout');
      this.$router.push('/login');
    },
    deleteAccount: function () {
      this.$store.dispatch('deleteAccount');
    },
  }
}
</script>