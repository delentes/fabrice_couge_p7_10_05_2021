<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
  <div class="topic__page"></div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    msg: String
  }
}
fetch("http://localhost:3000/api/")
.then(data => data.json())
.then(jsonListTopics => {
  for (const jsonTopic of jsonListTopics) {
    document.querySelector(".topic__page").innerHTML += `<div class="topic">
                                                          <h5>${jsonTopic.title}</h5>
                                                          <p>${jsonTopic.topic}</p>
                                                          <img src="${jsonTopic.image_url}">
                                                          <p>par ${jsonTopic.lastname}${jsonTopic.firstname}</p>
                                                          <a href="../topic.html?id=${jsonTopic.id}">Voir les commentaires</a>
                                                        </div>
                                                        `;
  };
})
.catch((error) => {
  console.log(error);
});
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
