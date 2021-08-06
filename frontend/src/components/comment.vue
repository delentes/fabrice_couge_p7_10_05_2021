<template>
    <div v-show= "findcomment" v-for="comment of comments" :key="comment.comment_id" class="card">
        <p>{{comment.comment}}</p>
        <div class="form-row">
            <img v-bind:src="comment.image_url" alt="">
        </div>
            <p class="form-row">Par : {{comment.firstname}} {{comment.lastname}}</p>
        <div>
            <button class="button__sup">Signaler</button>
            <button v-if="findUser(comment.user_id)" @click="modifyComment(comment.comment_id)" class="button__modify">Modifier</button>
            <button v-if="findUser(comment.user_id)" @click="deleteComment(comment.comment_id)" class="button__sup">Supprimer</button>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    name: 'comment',
    
    mounted: function () {
        this.$store.dispatch('getComment',this.$store.state.topicInfos.topic_id)
    },
    computed: {
        findcomment: function () {
            if (this.$store.state.comments != 0) {
                return true;
            } else {
                return false;
            }
        },
        
        ...mapState(['comments']),
    },
    methods: {
        findUser: function (user_id) {
            if (this.$store.state.user.userId == user_id) {
                return true;
            } else {
                return false;
            }
        },
        modifyComment: function (comment_id) {
            this.$store.dispatch('modifyComment', comment_id)
        },
        deleteComment: function (comment_id) {
            this.$store.dispatch('deleteComment', comment_id)
        },
        signalSpam: function () {

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