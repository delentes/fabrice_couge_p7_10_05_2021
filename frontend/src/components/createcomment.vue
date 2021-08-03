<template>
    <div class="card">
        <h1 class="card__title">Ajouter un commentaire</h1>
        <div class="form-row">
            <input v-model="comment" class="form-row__input" type="text" placeholder="Votre commentaire">
        </div>
        <div class="form-row">
            <input class="form-row__input" type="file" accept="image/png, image/jpg, image/jpeg, image/gif">
        </div>
        <div class="form-row">
            <button class="button">Envoyer</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'createComment',
    data: function (){
        return {
            comment:'',
            image_url:'',
        }
    },
    methods:{
        createComment: function () {

        }
    },
}
</script>