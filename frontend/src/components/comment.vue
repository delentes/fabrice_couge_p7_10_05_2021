<template>
    <div v-show= "findcomment" v-for="comment of comments" :key="comment.comment_id" class="card">
        <div v-if="commentModify[comment.comment_id]">
            <p v-if="commentModify[comment.comment_id].modification === false">{{comment.comment}}</p>
            <input v-if="commentModify[comment.comment_id].modification === true" v-model="commentModify[comment.comment_id].text" class="form-row__input" type="text" >
            <div class="form-row">
                <img v-if="commentModify[comment.comment_id].modification === false" v-bind:src="comment.image_url" alt="">
                <input @change="onFileSelected" v-if="commentModify[comment.comment_id].modification === true" class="form-row__input" name="image" type="file" accept="image/png, image/jpg, image/jpeg, image/gif">
            </div>
                <p class="form-row">Par : {{comment.firstname}} {{comment.lastname}}</p>
            <div v-if="commentModify[comment.comment_id].modification === false" class="form-row">
                <button v-if="!findUserComment(comment.id)" aria-label="signaler commentaire" @click="signalSpam(comment.comment_id)" class="button__modify">Signaler</button>
                <button v-if="findUserComment(comment.id)" aria-label="modifier commentaire" @click="switchToModifyComment(comment.comment_id)" class="button__modify">Modifier</button>
                <button v-if="findUserComment(comment.id)" aria-label="supprimer commentaire" @click="deleteComment(comment.comment_id)" class="button__sup">Supprimer</button>
            </div>
            <div v-if="commentModify[comment.comment_id].modification === true" class="form-row">
                <button @click="switchToComment(comment.comment_id)" aria-label="annuler modification" class="button__modify">Annuler</button>
                <button @click="modifyComment(comment.comment_id,comment.topic_id)" aria-label="envoyer modification" class="button__modify">Envoyer</button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    name: 'comment',
    data: function() {
        return {
            mode: 'comment',
            commentModify: {},
        }
    },
    
    mounted: async function () {
       await this.$store.dispatch('getComment', this.$route.params.id)
        for (const comment of this.comments) {
            this.commentModify[comment.comment_id] = {
                text: comment.comment,
                modification: false,
            }
        }
    },
    computed: {
        findcomment: function () {
            if (this.$store.state.comments != 0) {
                return true;
            } else {
                return false;
            }
        },
        ...mapState(['comments','spamsComment',]),
    },
    methods: {
        switchToModifyComment: function (comment_id) {
            this.commentModify[comment_id].modification = true
        },
        switchToComment: function (comment_id) {
            this.commentModify[comment_id].modification = false
        },
        findUserComment: function (user_id) {
            if (this.$store.state.user.userId === user_id) {
                return true;
            } else {
                return false;
            }
        },
        onFileSelected (event) {
            this.selectedFile = event.target.files[0]
        },
        modifyComment: async function (comment_id) {
            const self = this
            const formData = new FormData()
            if (this.selectedFile) {
                formData.append('image', this.selectedFile)
                formData.append('name', this.selectedFile.name)
            }
            formData.append('comment',this.commentModify[comment_id].text)
            formData.append('user_id',this.$store.state.user.userId)
            formData.append('comment_id',comment_id)
            await this.$store.dispatch('modifyComment', formData)
            .then(function() {
                self.selectedFile = '';
                window.location.reload();
            })
            .catch(function(error) {
                console.log(error);
            });
        },
        deleteComment: function (comment_id) {
            this.$store.dispatch('deleteComment', comment_id)
            window.location.reload();
        },
        signalSpam: function (comment_id) {
            this.$store.dispatch('signalComment', {
                comment_id: comment_id,
            })
            window.location.reload();
        },
    },
}
</script>
<style scoped>
    .form-row {
        display: flex;
        justify-content: center;
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