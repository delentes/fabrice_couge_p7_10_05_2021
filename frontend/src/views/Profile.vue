<template>
  <div class="card">
    <h1 class="card__title">Espace perso</h1>
    <p class="card__subtitle">Vos données personnels</p>
    <p>{{user.prenom}} {{user.nom}} {{user.email}}</p>
    <div class="form-row">
      <button @click="logout()" class="button">
        Déconnexion
      </button>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name:'profile',
  mounted: function () {
    if (this.$store.state.userId == -1) {
      this.$router.push('/');
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
      this.$router.push('/');
    }
  }
}
</script>