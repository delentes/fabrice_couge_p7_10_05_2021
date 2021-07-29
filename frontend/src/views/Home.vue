<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Bienvenue sur le forum de GROUPOMANIA"/>
    <div class="topics">
      <topics></topics>
    </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import topics from '@/components/topics.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    topics,
  },

  methods: {
    
  },
}
</script>
