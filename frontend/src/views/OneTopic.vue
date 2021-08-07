<template>
    <div>
        <h1 class="card__title">Sujet de discution</h1>
        <div class="card">
            <h1 class="card__subtitle" v-if="mode == 'topic'">{{topicInfos.title}}</h1>
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
            <div v-if="mode == 'topic'">
                <button @click="signalTopic(topicInfos.topic_id)" class="button__sup">Signaler</button>
                <button v-show="validateUser" @click="switchToModifyTopic()" class="button__modify">Modifier</button>
                <button v-show="validateUser" @click="deleteTopic(topicInfos.topic_id)" class="button__sup">Supprimer</button>
            </div>
            <div v-if="mode == 'modify'">
                <button @click="switchToOneTopic()" class="button__sup">Annuler</button>
                <button @click="modifyTopic(topicInfos.topic_id)" class="button__modify">Envoyer</button>
            </div>
        </div>
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
        
    },
    computed: {
        validateUser: function () {
            if(this.$store.state.user.userId === this.$store.state.topicInfos.user_id) {
                return true;
            } else {
                return false;
            }
        },
        ...mapState(['topicInfos'])
    },
    methods: {
        switchToModifyTopic: function () {
            this.mode = 'modify';
        },
        switchToOneTopic: function () {
            this.mode = 'topic';
        },
        deleteTopic: function (topic_id) {
            this.$store.dispatch('deleteTopic', topic_id)
            this.$router.push('/topics')
        },
        onFileSelected (event) {
            this.selectedFile = event.target.files[0]
        },
        modifyTopic: async function (topic_id) {
            const self = this
            const formData = new FormData()
            if (this.selectedFile == '') {
                formData.append('image', this.selectedFile)
                formData.append('name', this.selectedFile.name)
            }
            formData.append('title',this.title)
            formData.append('topic',this.topic)
            formData.append('user_id',this.$store.state.user.userId)
            formData.append('topic_id',topic_id)
            await this.$store.dispatch('modifyTopic', formData)
            .then(function() {
                self.$router.push('/Topics');
            })
            .catch(function(error) {
                console.log(error);
            });
        },
        signalTopic: function (topic_id) {
            this.$store.dispatch('signalTopic', {
                topic_id: topic_id,
            })
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
    .oneTopic__center{
        justify-content: center;
    }
</style>