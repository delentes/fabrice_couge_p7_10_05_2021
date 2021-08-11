import { createStore } from 'vuex'

const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:3000/api'
});

let user = localStorage.getItem('user');
if (!user) {
  user = {
    userId: -1,
    isadmin: 0,
    token: '',
  };
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common['Authorization'] ='Bearer '+user.token;
  } catch (ex) {
    user = {
      userId: -1,
      isadmin: 0,
      token: '',
    };
  }
}
export default createStore({
  state: {
    status: '',
    user: user,
    userInfos: {
      lastname: '',
      firsname: '',
      email: '',
      password:'',
    },
    usersInfos:{
      id: '',
      lastname: '',
      firsname: '',
      email: '',
      isadmin:'',
    },
    topic:{
      topic_id: '',
      title: '',
      topic: '',
      image_url: '',
    },
    topicInfos:{
      topic_id: '',
      title: '',
      topic: '',
      image_url: '',
      lastname: '',
      firsname: '',
    },
    comments:{
      topic_id: '',
      comment: '',
      image_url: '',
      user_id: '',
    },
    spamsComment:{
      spamcomment_id: '',
      comment_id: '',
    },
    oneSpamComment:{
      spamcomment_id: '',
      comment_id: '',
      user_id: '',
    },
    spamsTopic:{
      spamtopic_id: '',
      topic_id: '',
    },
    oneSpamTopic:{
      spamtopic_id: '',
      topic_id: '',
      user_id: '',
    },
    like:{
      user_id: '',
      topic_id: '',
      like_topic: '',
    },
    countLike: '',
    liked:{
      like_topic: '',
    },
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser: function (state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
      instance.defaults.headers.common['Authorization'] ='Bearer '+user.token;
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },
    setUsersInfos: function (state, usersInfos) {
      state.usersInfos = usersInfos;
    },
    logout: function (state) {
      state.user = {
        userId: -1,
        token: '',
        isadmin: 0,
      },
      localStorage.removeItem('user');
    },
    topicStatus: function(state, topic) {
      state.topic = topic;
    },
    topicInfosStatus: function(state, topicInfos) {
      state.topicInfos = topicInfos;
    },
    commentsStatus: function(state,comments) {
      state.comments = comments;
    },
    spamCommentStatus: function(state, spamsComment) {
      state.spamsComment = spamsComment;
    },
    oneSpamCommentStatus: function(state, oneSpamComment) {
      state.oneSpamComment = oneSpamComment;
    },
    spamTopicStatus: function(state, spamsTopic) {
      state.spamsTopic = spamsTopic;
    },
    oneSpamTopicStatus: function(state, oneSpamTopic) {
      state.oneSpamTopic = oneSpamTopic;
    },
    addLikeTopicStatus: function(state, addLike) {
      state.addLike = addLike;
    },
    countLikeStatus: function(state, countLike) {
      state.countLike = countLike;
    },
    likedStatus: function(state, liked) {
      state.liked = liked;
    }

  },
  actions: {
    // User logic

    // Login
    login: ({commit}, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/auth/login', userInfos)
        .then((response) => {
          commit('setStatus', '');
          commit('logUser', response.data);
          resolve(response);
        })
        .catch((error) => {
          commit('setStatus', 'error_login');
          reject(error);
        });
      });
    },

    // Create account
    createAccount: ({commit}, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/auth/signup', userInfos)
        .then((response) => {
          commit('setStatus', 'created');
          resolve(response);
        })
        .catch((error) => {
          commit('setStatus', 'error_create');
          reject(error);
        });
      });
    },

    // User informations
    getUserInfos: ({commit, state}) => {
      instance.get('/auth/profile/'+state.user.userId)
      .then((response) => {
        commit('userInfos', response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    },

    // Delete user account
    deleteAccount: ({commit, state} ) => {
      return new Promise((resolve, reject) => {
        instance.delete('/auth/profile/'+state.user.userId)
        .then((response) => {
          commit('setStatus', '');
          resolve(response);
        })
        .catch((error) => {
          commit('setStatus', 'error_delete');
          reject(error);
        });
      });
    },

    // Logical topic

    // Create a topic
    createTopic: ({commit}, formData) => {
      return new Promise((resolve, reject) => {
        instance.post('/topics/topic', formData)
        .then((response) => {
          commit('topicStatus', 'topicCreate');
          resolve(response);
        }).catch((error) => {
          commit('topicStatus', 'error_createTopic');
          reject(error);
        });
      });
    },

    // Get all topics
    getTopics: ({commit}) => {
      instance.get('/topics/topic')
      .then((response) => {
          commit('topicStatus', response.data);
      })
      .catch((error) => {
          console.log(error);
      });
    },

    // Get a topic
    getOneTopic: ({commit},topic_id) => {
      instance.get('/topics/topic/'+topic_id)
      .then((response) => {
        commit('topicInfosStatus', response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    },

    // Modify topic
    modifyTopic: async ({commit},formData) => {
      await instance.post('/topics/topic/modify',formData)
      .then((response) => {
        commit('topicInfosStatus', response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    },

    // Delete topic
    deleteTopic: ({commit}, topic_id) => {
      return new Promise((resolve, reject) => {
        instance.delete('/topics/topic/'+topic_id)
        .then((response) => {
          commit('topicStatus', 'topicDelete');
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
      });
    },

    // Signal topic
    signalTopic: ({commit}, topic_id) => {
      instance.post('/topics/topicSpam', topic_id)
      .then((response) => {
        commit('spamTopicStatus', response);
      })
      .catch((error) => {
        console.log(error)
      })
    },

    // Logical like

    // Add like
    addLike: ({commit}, like) => {
      instance.post('/topics/topic/like', like)
      .then((response) => {
        commit('addLikeTopicStatus', response);
      })
      .catch((error) => {
        console.log(error);
      })
    },

    // Count like
    countLike: ({commit}, Like) => {
      instance.post('/topics/topic/count', Like)
      .then((response) => {
        commit('countLikeStatus', response.data);
      })
      .catch((error) => {
        console.log(error);
      })
    },

    // Liked
    liked: ({commit}, liked) => {
      instance.post('/topics/topic/liked', liked)
      .then ((response) => {
        
        commit('likedStatus', response.data);
      })
      .catch((error) => {
        console.log(error);
      })
    },

    // Logical comment

    // Get comments by topic
    getComment: ({commit},topic_id) => {
      return new Promise((resolve, reject) => {
        instance.get('/topics/comment/'+topic_id)
          .then((response) => {
            console.log(response.data);
            commit('commentsStatus',response.data);
            resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
      })
      
    },

    // Create comment
    createComment: ({commit},formData) => {
      return new Promise((resolve,reject) => {
        instance.post('/topics/comment', formData)
        .then((response) => {
          commit('commentsStatus', 'commentCreate');
          resolve(response);
        })
        .catch((error) => {
          commit('commentStatus', 'error_commentCreate');
          reject(error);
        });
      });
    },

    // Modify comment
    modifyComment: ({commit},formData) => {
      return new Promise((resolve,reject) => {
        instance.post('/topics/comment/modify',formData)
        .then((response) => {
          commit('commentsStatus', 'commentModify');
          resolve(response);
        })
        .catch((error) =>{
          commit('commentsStatus', 'error_commentModify')
          reject(error);
        });
      });
    },

    // Delete comment
    deleteComment: ({commit}, comment_id) => {
      return new Promise((resolve, reject) => {
        instance.delete('/topics/comment/'+comment_id)
        .then((response) => {
          commit('commentsStatus', 'commentDelete');
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
      });
    },

    // Signal comment
    signalComment: ({commit}, comment_id) => {
      instance.post('/topics/commentSpam', comment_id)
      .then((response) => {
        commit('spamCommentStatus', response);
      })
      .catch((error) => {
        console.log(error)
      })
    },

    // logical admin

    // Get all users
    getAllUsers: ({commit}) => {
      instance.get('/auth/admin/profile')
      .then((response) => {
        commit('setUsersInfos', response.data);
      })
      .catch((error) => {
        console.log(error);
      })
    },

    // Get comment spam
    getSpamComment: ({commit}) => {
      return new Promise((resolve, reject) => {
        instance.get('/topics/spamComment')
        .then((response) => {
          commit('spamCommentStatus', response.data);
          resolve(response);
        })
        .catch((error) => {
          commit('spamCommentStatus', 'error');
          reject(error)
        })
      })
    },

    // Get one spam comment
    getOneSpamComment: ({commit}, comment_id) =>{
      return new Promise((resolve, reject) => {
        instance.get('/topics/spamComment/'+comment_id)
        .then((response) => {
          commit('oneSpamCommentStatus', response.data);
          resolve(response);
        })
        .catch((error) => {
          commit('oneSpamCommentStatus', 'error');
          reject(error)
        })
      })
      
    },

    // Cancel comment spam
    cancelSpamComment:({commit}, spamcomment_id) => {
      instance.post('/topics/spamComment', spamcomment_id)
      .then((response) => {
        commit('SpamCommentStatus', response);
      })
      .catch((error) => {
        console.log(error);
      })
    },

    // Delete comment spam
    deleteSpamComment:({commit}, spamcomment) => {
      instance.post('/topics/deleteCommentSpam',spamcomment)
      .then((response) => {
        commit('spamCommentStatus', response);
      })
      .catch((error) => {
        console.log(error);
      })
    },
    
    // Get topic spam
    getSpamTopic: ({commit}) => {
      return new Promise((resolve, reject) => {
        instance.get('/topics/spamTopic')
        .then((response) => {
          commit('spamTopicStatus', response.data);
          resolve(response);
        })
        .catch((error) => {
          commit('spamTopicStatus', 'error_spamTopic' )
          reject(error)
        })
      })
    },

    // Get one topic spam
    getOneSpamTopic: ({commit}, topic_id) =>{
      return new Promise((resolve, reject) => {
        instance.get('/topics/spamTopic/'+topic_id)
      .then((response) => {
        commit('oneSpamTopicStatus', response.data);
        resolve(response)
      })
      .catch((error) => {
        commit('oneSpamTopicStatus', 'error_oneSpamTopic')
        reject(error)
      })
      })
      
    },

    // Cancel topic spam
    cancelSpamTopic:({commit}, spamtopic_id) => {
      instance.post('/topics/spamtopic', spamtopic_id)
      .then((response) => {
        commit('spamTopicStatus', response);
      })
      .catch((error) => {
        console.log(error);
      })
    },

    // Delete topic spam
    deleteSpamTopic:({commit}, spamtopic) => {
      instance.post('/topics/deleteTopicSpam',spamtopic)
      .then((response) => {
        commit('spamTopicStatus', response);
      })
      .catch((error) => {
        console.log(error);
      })
    },
    
    // Delete user
    deleteUser: ({commit}, id) => {
      return new Promise((resolve, reject) => {
        instance.post('/auth/admin/delete', id= {id} )
        .then((response) => {
          commit('setStatus', '')
          resolve(response);
        })
        .catch((error) => {
          commit('setStatus','error_delete')
          reject(error);
        });
      });
    },

    // Add an admin
    addAdmin: ({commit}, id) => {
      return new Promise((resolve, reject) => {
        instance.post('/auth/admin/updateadmin', id= {id})
        .then((response) => {
          commit('setStatus', '')
          resolve(response);
        })
        .catch((error) => {
          commit('setStatus', 'error_addAdmin')
          reject(error);
        })
      })
    }
  },

  modules: {
  }
})
