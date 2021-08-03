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
    commentStatus: function(state,comment) {
      state.comment = comment
    },
    setUsersInfos: function (state, usersInfos) {
      state.usersInfos = usersInfos;
    }
  },
  actions: {
    login: ({commit}, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/auth/login', userInfos)
        .then((response) => {
          commit('setStatus', '');
          commit('logUser', response.data);
          console.log('test1',response.data);
          resolve(response);
        })
        .catch((error) => {
          commit('setStatus', 'error_login');
          reject(error);
        });
      });
    },
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
    getUserInfos: ({commit, state}) => {
      instance.get('/auth/profile/'+state.user.userId)
      .then((response) => {
        commit('userInfos', response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    },
    getTopics: ({commit}, topic) => {
      instance.get('/topics/topic', topic)
      .then((response) => {
          commit('topicStatus', response.data);
      })
      .catch((error) => {
          console.log(error);
      });
    },
    deleteAccount: ({commit, state} ) => {
      commit();
      return new Promise((resolve, reject) => {
        instance.post('/auth/profile/'+state.user.userId)
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
    createTopic: ({commit}, topic ) => {
      return new Promise((resolve, reject) => {
        instance.post('/topics/create',topic)
        .then((response) => {
          commit('topicStatus', 'topicCreate');
          resolve(response);
        }).catch((error) => {
          commit('topicStatus', 'error_createTopic');
          reject(error);
        })
      })
    },
    getOneTopic: ({commit, state}) => {
      instance.get('/topics/topic/'+state.topic.topic_id)
      .then((response) => {
        commit('topicStatus', response.data);
      })
      .catch((error) => {
        console.log(error);
      })
    },
    getAllUsers: ({commit}) => {
      instance.get('/auth/admin/profile')
      .then((response) => {
        commit('setUsersInfos',response.data);
        console.log('testuserinfo',response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    getComment: ({commit}, comment) => {
      instance.get('',comment)
      .then((response) => {
        commit('commentStatus',response.data);
      })
      .catch((error) => {
        console.log(error);
      })
    }
  },

  modules: {
  }
})
