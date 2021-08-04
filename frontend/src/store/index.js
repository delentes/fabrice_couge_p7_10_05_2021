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
    usersInfos:{
      id: '',
      lastname: '',
      firsname: '',
      email: '',
      isadmin:'',
    },
    comment:{
      topic_id: '',
      comment: '',
      image_url: '',
      user_id: '',

    }
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
    topicInfosStatus: function(state, topicInfos){
      state.topicInfos = topicInfos;
    },
    commentStatus: function(state,comment) {
      state.comment = comment
    },
    
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
    createTopic: ({commit}, topic ) => {
      console.log('test topic',topic)
      return new Promise((resolve, reject) => {
        instance.post('/topics/create',topic)
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
    //  creer un state topicInfos et une mutation topicInfosStatus
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

    // Logical comment

    // Get comments by topic
    getComment: ({commit}) => {
      instance.get('')
      .then((response) => {
        commit('commentStatus',response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    },

    // Create comment
    createComment: ({commit},comment) => {
      return new Promise((resolve,reject) => {
        instance.post('', comment)
        .then((response) => {
          commit('commentStatus', 'commentCreate');
          resolve(response);
        })
        .catch((error) => {
          commit('commentStatus', 'error commentCreate');
          reject(error);
        });
      });
    },

    // logical admin

    // Get all users
    getAllUsers: ({commit}) => {
      instance.get('/auth/admin/profile')
      .then((response) => {
        commit('setUsersInfos', response.data);
      })
      .catch((error) => {
        console.log(error)
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
