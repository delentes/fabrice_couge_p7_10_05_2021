<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
      <div v-for ="response in responses" v-bind:key="response.id">
        <h4>{{titleTopic}}</h4>
        <p>{{topic}}</p>
        <img src = {{ image }}>
        <p>{{nom}}{{prenom}}</p>
        <p>{{date}}</p>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    msg: String
  },
/*  data: function () {
    return {
      titleTopic = response.title,
      topic = response.topic,
      image = response.image_url,
      nom = response.lastname,
      prenom = response.firstname,
      date = response.creation_date,
    }
  },*/
  methods: {
    topic: async function () {
      try {
        let responses = await fetch('https://localhost:3000/api/');
        if (!responses.ok) {
          throw new Error (`Erreur HTTP ! statut: ${responses.status}`);
        }
        return await responses.json();
      }
      catch(e) {
        console.log(e);
      }
    }
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
