<template>
    <div>
        <h1 class="card__title">Sujet de discussion</h1>
        <div class="card">
            <h2 class="card__subtitle" v-if="mode == 'topic'">{{topicInfos.title}}</h2>
            <div>
                <input class="form-row__input" v-if="mode == 'modify'"  v-model="title" type="text" placeholder="">
            </div>
            <p v-if="mode == 'topic'">{{topicInfos.topic}}</p>
            <div class="form-row">
                <textarea class="form-row__input input__area" v-if="mode == 'modify'" v-model="topic" name="topic" placeholder=""></textarea>
            </div>
            <div class="form-row">
                <div v-if="mode == 'modify'" class="form-row">
                    <label class="card__subtitle" for="file">Sélectionner une image:</label>
                    <input @change="onFileSelected" class="form-row__input" type="file" name="image" id="file" accept="image/png, image/jpg, image/jpeg, image/gif">
                </div>
            </div>
            <img v-if="mode == 'topic'" class="oneTopic__center" v-bind:src="topicInfos.image_url" alt="">
            <p class="form-row oneTopic__center">Par : {{topicInfos.firstname}} {{topicInfos.lastname}}</p>
            <div v-if="mode == 'topic'" class="form-row like">
                <button @click="addLike()" aria-label="like" class="button__like" :class="{'button__liked' : liked}">Like</button>
                <p>Like: {{countLike.like_topic}}</p>
            </div>
            <div v-if="mode == 'topic'">
                <button v-if="!findUser(topicInfos.user_id)" aria-label="signaler topic" @click="signalTopic(topicInfos.topic_id)" class="button__modify">Signaler</button>
                <button v-if="findUser(topicInfos.user_id)" aria-label="modifier topic" @click="switchToModifyTopic()" class="button__modify">Modifier</button>
                <button v-if="findUser(topicInfos.user_id)" aria-label="supprimer topic" @click="deleteTopic(topicInfos.topic_id)" class="button__sup">Supprimer</button>
            </div>
            <span v-show = "spam">Topic signalé !</span>
            <div class="form-row" v-if="mode == 'modify'">
                <button @click="switchToOneTopic()" aria-label="annuler modification" class="button__sup">Annuler</button>
                <button @click="modifyTopic(topicInfos.topic_id)" aria-label="envoyer modification" class="button__modify">Envoyer</button>
            </div>
        </div>
        <h3 class="card__subtitle">Commentaire</h3>
        <div class="comment">
            <comment></comment>
        </div>
        <div class="createComment">
            <createComment></createComment>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import createComment from '@/components/createcomment.vue';
import comment from '@/components/comment.vue';

export default {
    name: 'topic',
    data: function() {
        return {
            mode: 'topic',
            title: '',
            topic: '',
        }
    },
    
    components:{
        createComment,
        comment,
    },
    mounted: function () {
        this.$store.dispatch('getOneTopic', this.$route.params.id)
        this.$store.dispatch('countLike', {
            topic_id: this.$route.params.id,
        })
        this.$store.dispatch('liked', {
            topic_id: this.$route.params.id,
            user_id: this.$store.state.user.userId,
        })
        this.$store.dispatch('getOneSpamTopic',this.$route.params.id);
        this.title = this.topicInfos.title
        this.topic = this.topicInfos.topic
    },
    computed: {
        liked: function () {
            if(this.$store.state.liked.like_topic == 1) {
                return true;
            } else {
                return false;
            }
        },
        spam: function () {
            if(this.$store.state.oneSpamTopic.spamtopic_id != undefined) {
                return true;
            } else {
                return false;
            }
        },
        
        ...mapState(['topicInfos', 'countLike'])
    },
    methods: {
        switchToModifyTopic: function () {
            this.mode = 'modify';
        },
        switchToOneTopic: function () {
            this.mode = 'topic';
        },
        deleteTopic: async function (topic_id) {
            await this.$store.dispatch('deleteTopic', topic_id);
            this.$router.push('/topics');
        },
        onFileSelected (event) {
            this.selectedFile = event.target.files[0]
        },
        findUser: function (user_id) {
            if (this.$store.state.user.userId == user_id) {
                return true;
            } else {
                return false;
            }
        },
        modifyTopic: async function (topic_id) {
            const self = this
            const formData = new FormData()
            if (this.selectedFile) {
                formData.append('image', this.selectedFile)
                formData.append('name', this.selectedFile.name)
            }
            formData.append('title',this.title)
            formData.append('topic',this.topic)
            formData.append('user_id',this.$store.state.user.userId)
            formData.append('topic_id',topic_id)
            await this.$store.dispatch('modifyTopic', formData)
            .then(function() {
                self.selectedFile = '';
                window.location.reload();
            })
            .catch(function(error) {
                console.log(error);
            });
        },
        signalTopic: function (topic_id) {
            this.$store.dispatch('signalTopic', {
                topic_id: topic_id,
            })
            window.location.reload();
        },
        addLike: function () {
            this.$store.dispatch('addLike', {
                topic_id: this.$store.state.topicInfos.topic_id,
                user_id: this.$store.state.user.userId,
            })
            window.location.reload();
        },
    }
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
    .oneTopic__center{
        justify-content: center;
    }
    .button__like {
    background: #2196F3;
    color:white;
    border-radius: 8px;
    font-weight: 600;
    font-size: 15px;
    border: none;
    padding: 0;
    width: 15%;
    transition: .4s background-color;
    margin-bottom: 10px;
  }
  .button__like:hover {
    cursor:pointer;
    background: #1976D2;
  }
  .button__liked {
    background: #40A497;
    color:white;
    border-radius: 8px;
    font-weight: 600;
    font-size: 15px;
    border: none;
    width: 15%;
    padding: 0;
    transition: .4s background-color;
    margin-bottom: 10px;
  }
  .button__liked:hover {
    cursor:pointer;
    background: green;
  }
  .like {
      justify-content: flex-end;
  }
</style>