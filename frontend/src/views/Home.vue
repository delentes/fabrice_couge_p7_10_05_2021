<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Bienvenue sur le forum de GROUPOMANIA"/>
    <div>
      
    </div>
    
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
const axios = require('axios')

export default {
  name: 'Home',
  components: {
    HelloWorld
  },

  methods: {
    getTopics: ({commit}, topic) => {
      axios.get('/', topic)
      .then(function (response) {
        console.log(response)
        commit('topic', response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  },
}
</script>
