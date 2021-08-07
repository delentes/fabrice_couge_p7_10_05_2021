<template>
    <div class="createComment">
        <div class="card">
            <h1 class="card__subtitle">Ajouter un commentaire</h1>
            <div class="form-row">
                <input v-model="comment" class="form-row__input" type="text" placeholder="Votre commentaire">
            </div>
            <div class="form-row">
                <input class="form-row__input" type="file" accept="image/png, image/jpg, image/jpeg, image/gif">
            </div>
            <div class="form-row">
                <button @click="createComment(topicInfos.topic_id)" class="button" :class="{'button--disabled' : !validatedFields}">Envoyer</button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: 'createComment',
    data: function (){
        return {
            comment: '',
            image_url: '',
        }
    },
    computed:{
        validatedFields: function() {
            if (this.comment != "") {
                return true;
            } else {
                return false;
            }
        },
        ...mapState(['topicInfos'])
    },
    methods:{
        createComment: async function (topic_id) {
            const formData = new FormData()
            formData.append('image', this.selectedFile)
            formData.append('name', this.selectedFile.name)
            formData.append('comment',this.comment)
            formData.append('user_id',this.$store.state.user.userId)
            formData.append('topic_id',topic_id)
            await this.$store.dispatch('createComment', formData)
            .then(function() {
                window.location.reload();
            })
            .catch(function(error) {
                console.log(error);
            });
            
        }
    },
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