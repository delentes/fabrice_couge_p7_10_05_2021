<template>
    <div class="card">
        <h1 class="card__title">Poster un sujet</h1>
        <div class="form__row">
            <input class="form-row__input" type="text" placeholder="Titre du sujet">
        </div>
        <div class="form__row">
            <textarea class="form-row__input" name="topic" placeholder="Votre sujet ici"></textarea>
        </div>
        <div class="form__row">
            <button @click="createTopic()" class="button" :class="{'button--disabled' : !validatedFields}">
                <span>Envoyer</span>
            </button>
        </div>
    </div>
</template>
<script>


export default {
    name: 'createTopic',
    data: function() {
        return {
            title:'',
            topic:'',
        }
    },
    computed:{
        validatedFields: function() {
            if (this.title != "" && this.topic != "") {
                return true;
            } else {
                return false;
            }
        }
    },
    methods: {
        createTopic: function() {
            const self = this;
            this.$store.dispatch('createTopic', {
                title: this.title,
                topic: this.topic,
            }).then(function() {
                self.$router.push('/');
            }).catch(function(error) {
                console.log(error);
            });
        },
    }
}
</script>

<style scoped>
    .form-row {
        display: flex;
        margin: 16px 0px;
        gap: 16px;
        flex-wrap: wrap;
    }
    .form-row__input {
        padding: 8px;
        border: none;
        border-radius: 8px;
        background:#f2f2f2;
        font-weight: 500;
        font-size: 16px;
        flex:1;
        min-width: 100px;
        color: black;
    }
    .form-row__input::placeholder {
        color:#aaaaaa;
    }
</style>