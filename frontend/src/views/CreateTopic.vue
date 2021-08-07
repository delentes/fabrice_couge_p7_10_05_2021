<template>
    <div class="card">
        <h1 class="card__title">Poster un sujet</h1>
        <div class="form-row">
            <input v-model="title" class="form-row__input" type="text" placeholder="Titre du sujet">
        </div>
        <div class="form-row">
            <textarea v-model="topic" class="form-row__input input__area" name="topic" placeholder="Votre sujet ici"></textarea>
        </div>
        <div class="form-row">
            <label class="card__subtitle" for="file">Sélectionner une image:</label>
            <input @change="onFileSelected" class="form-row__input" type="file" name="image" id="file" accept="image/png, image/jpg, image/jpeg, image/gif">
        </div>
        <div class="form-row">
            <button @click="createTopic()"  class="button" :class="{'button--disabled' : !validatedFields}" >
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
            title: '',
            topic: '',
        }
    },
    mounted: function () {
        if (this.$store.state.user.userId == -1) {
            this.$router.push('/login');
        return;
        }
    },
    computed:{
        validatedFields: function() {
            if (this.title != "" && this.topic != "" && this.selectedFile != '') {
                return true;
            } else {
                return false;
            }
        }
    },
    methods: {
        onFileSelected (event) {
            this.selectedFile = event.target.files[0]
        },
        createTopic: async function() {
            const self = this
            const formData = new FormData()
            formData.append('image', this.selectedFile)
            formData.append('name', this.selectedFile.name)
            formData.append('title',this.title)
            formData.append('topic',this.topic)
            formData.append('user_id',this.$store.state.user.userId)
            await this.$store.dispatch('createTopic', formData)
            .then(function() {
                self.$router.push('/Topics');
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
    .input__area {
        height: 200px;
    }
</style>