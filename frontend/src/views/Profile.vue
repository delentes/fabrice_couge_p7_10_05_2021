<template>
  <div class="card">
    <h1 class="card__title">Espace perso</h1>
    <p class="card__subtitle">Vos données personnels</p>
    <p>Prénom: {{this.$store.state.user.data.firstname}} {{user.email}}</p>
    <p>Nom: {{this.$store.state.user.data.lastname}}</p>
    <p>Email: {{this.$store.state.user.data.email}}</p>

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
      this.$router.push('/login');
      return;
    }
    this.$store.state.user.data;
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