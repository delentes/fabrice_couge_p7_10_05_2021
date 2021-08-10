<template>
    <div v-show= "findcomment" v-for="comment of comments" :key="comment.comment_id" class="card">
        <p v-if="mode == 'comment'">{{comment.comment}}</p>
        <input v-if="mode == 'modify'" v-model="commentmodify" class="form-row__input" type="text" >
        <div class="form-row">
            <img v-if="mode == 'comment'" v-bind:src="comment.image_url" alt="">
            <input @change="onFileSelected" v-if="mode == 'modify'" class="form-row__input" type="file" accept="image/png, image/jpg, image/jpeg, image/gif">
        </div>
            <p class="form-row">Par : {{comment.firstname}} {{comment.lastname}}</p>
        <div v-if="mode == 'comment'" class="form-row">
            <button v-if="!findUserComment()" @click="signalSpam(comment.comment_id)" class="button__modify">Signaler</button>
            <button v-if="findUserComment()" @click="switchToModifyComment" class="button__modify">Modifier</button>
            <button v-if="findUserComment()" @click="deleteComment(comment.comment_id)" class="button__sup">Supprimer</button>
        </div>
        <div v-if="mode == 'modify'">
            <button @click="switchToComment" class="button__modify">Annuler</button>
            <button @click="modifyComment(comment.comment_id)" class="button__sup">Envoyer</button>
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
            commentmodify: '',
        }
    },
    
    mounted: function () {
        this.$store.dispatch('getComment', this.$route.params.id)
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
        switchToModifyComment: function () {
            this.mode = 'modify';
        },
        switchToComment: function () {
            this.mode = 'comment';
        },
        findUserComment: function () {
            if (this.$store.state.user.userId == this.$store.state.comments.user_id) {
                return true;
            } else {
                return false;
            }
        },
        onFileSelected (event) {
            this.selectedFile = event.target.files[0]
        },
        modifyComment: async function () {
            const formData = new FormData()
            if (this.selectedFile == '') {
                formData.append('image', this.selectedFile)
                formData.append('name', this.selectedFile.name)
            }
            formData.append('comment',this.commentmodify)
            formData.append('user_id',this.$store.state.user.userId)
            await this.$store.dispatch('modifyComment', formData)
            .then(function() {
                window.location.reload();
            })
            .catch(function(error) {
                console.log(error);
            });
        },
        deleteComment: function (comment_id) {
            this.$store.dispatch('deleteComment', {
                comment_id:comment_id,
            })
            window.location.reload();
        },
        signalSpam: function (comment_id) {
            this.$store.dispatch('signalComment', {
                comment_id: comment_id,
            })
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