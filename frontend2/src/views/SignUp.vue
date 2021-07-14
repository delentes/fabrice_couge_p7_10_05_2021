<template>
  <div class="Sign">
    <h1>S'enregistrer</h1>
    <div>
        <label for="firstname">Prénom</label>
        <input id="firstname" type="text">
        <label for="lastname">Nom</label>
        <input id="lastname" type="text">
        <label for="email">Email</label>
        <input id="email" type="email">
        <input id="password" type="password">
    </div>
  </div>
</template>
<script>
  export default {
    name: 'SignUp',
  }
</script>

