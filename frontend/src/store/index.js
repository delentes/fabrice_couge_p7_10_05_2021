import { createStore } from 'vuex'

const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:3000/api'
});

let user = localStorage.getItem('user');
if (!user) {
  user = {
    userId: -1,
    token: '',
  };
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common['Authorization'] = user.token;
  } catch (ex) {
    user = {
      userId: -1,
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
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser: function (state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
      instance.defaults.headers.common['Authorization'] = user.token;
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },
    logout: function (state) {
      state.user = {
        userId: -1,
        token: '',
      },
      localStorage.removeItem('user');
    }
  },
  actions: {
    login: ({commit}, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/auth/login', userInfos)
        .then(function (response) {
          commit('setStatus', '');
          commit('logUser', response.data);
          resolve(response);
          console.log(response.data);
          console.log(user);
          console.log(userInfos);
        })
        .catch(function (error) {
          commit('setStatus', 'error_login');
          reject(error);
        });
      });
    },
    createAccount: ({commit}, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/auth/signup', userInfos)
        .then(function (response) {
          commit('setStatus', 'created');
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'error_create');
          reject(error);
        });
      });
    },
  
    getTopics: ({commit}, topic) => {
      instance.get('/', topic)
      .then(function (response) {
          console.log(response)
          commit('topic', response.data);
      })
      .catch(function (error) {
          console.log(error);
      });
    },
    deleteAccount: ({commit}, ) => {
      commit();
      return new Promise((resolve, reject) => {
        instance.post('/auth/profile/'+localStorage.data.id)
        .then(function (response) {
          commit('setStatus', '');
          resolve(response);
        })
        .catch(function(error) {
          commit('setStatus', 'error_delete');
          reject(error);
        });
      });
    },
    createTopic: ({commit}, ) => {
      commit();
      return new Promise((resolve, reject) => {
        instance.post('topic/create')
        .then(function (response) {
          commit('topicStatus', 'topicCreate');
          resolve(response);
        }).catch(function(error) {
          commit('topicStatus', 'error_createTopic');
          reject(error);
        })
      })
    }
  },

  modules: {
  }
})
