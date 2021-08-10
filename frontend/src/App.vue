<template>
  <div>
    <div id="nav">
      <nav-bar></nav-bar>
    </div>
    <router-view/>
  </div>
</template>

<script>

import navBar from "@/components/navBar.vue";

export default {
  name:'App',
  components: {
    navBar
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


#app {
  max-width: 100%;
}

body {
  background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding:32px;
}

img {
  max-width: 400px;
  border-radius: 8px;
}

.card {
  max-width: 100%;
  width: 540px;
  background:white;
  border-radius: 16px;
  padding:32px;
  margin-bottom: 10px;
  margin-right: 10px;
}

.card__title {
  text-align:center;
  font-weight: 800;
}

.card__subtitle {
  text-align: center;
  color:#666;
  font-weight: 500;
}

  .button {
    background: #2196F3;
    color:white;
    border-radius: 8px;
    font-weight: 800;
    font-size: 15px;
    border: none;
    width: 100%;
    padding: 16px;
    transition: .4s background-color;
    margin-bottom: 5px;
  }

  .button__delete {
    background-color: red;
    color:white;
    border-radius: 8px;
    font-weight: 800;
    font-size: 15px;
    border: none;
    width: 100%;
    padding: 16px;
    transition: .4s background-color;
  }

  .card__action {
    color:#2196F3;
    text-decoration: underline;
  }

  .card__action:hover {
    cursor:pointer;
  }

  .button:hover {
    cursor:pointer;
    background: #1976D2;
  }

  .button--disabled {
    background:#cecece;
    color:#ececec
  }
  .button--disabled:hover {
    cursor:not-allowed;
    background:#cecece;
  }
  .button__delete:hover {
      cursor:pointer;
      background: #9e0e40;
    }
  .link {
    text-decoration: none;
  }
  .link:hover{
    cursor: pointer;
  }
  .button__admin {
    background: red;
    color:white;
    border-radius: 8px;
    font-weight: 800;
    font-size: 15px;
    border: none;
    width: 45%;
    padding: 10px;
    transition: .4s background-color;
    margin-left: 5px;
  }
  .button__admin:hover {
    cursor:pointer;
    background: #9e0e40;
  }
  .button__blue__admin {
    background: #2196F3;
    color:white;
    border-radius: 8px;
    font-weight: 800;
    font-size: 15px;
    border: none;
    width: 45%;
    padding: 10px;
    transition: .4s background-color;
    margin-right: 10px;
  }
  .button__blue__admin:hover {
    cursor:pointer;
    background: #1976D2;
  }
  .button__modify {
    background: #2196F3;
    color:white;
    border-radius: 8px;
    font-weight: 800;
    font-size: 15px;
    border: none;
    width: 30%;
    padding: 10px;
    transition: .4s background-color;
    margin-left: 5px;
  }
  .button__modify:hover {
    cursor:pointer;
    background: #1976D2;
  }
  .button__sup {
    background: red;
    color:white;
    border-radius: 8px;
    font-weight: 800;
    font-size: 15px;
    border: none;
    width: 30%;
    padding: 10px;
    transition: .4s background-color;
    margin-left: 5px;
  }
  .button__sup:hover {
    cursor:pointer;
    background: #9e0e40;
  }
  .navbar{
        text-decoration: none;
        padding: 20px;
        font-weight: 900;
        color:rgb(63, 61, 61);
    }
</style>
