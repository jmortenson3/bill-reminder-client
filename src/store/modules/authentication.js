import { userService } from '../../services/user';
import { router } from '../../router';

// localStorage.removeItem('user');
const user = JSON.parse(localStorage.getItem('user'));

const state = user
        ? { status: { loggedIn: true, loginFailed: false }, user }
        : { status: { loginFailed: false }, user: {} };

const actions = {
  login: ({ commit }, { username, password }) => {
    commit('LOGIN_REQUEST', { username });
    userService.login(username, password)
      .then(user => {
        if (user.data) {
          user.data.username = username;
          localStorage.setItem('user', JSON.stringify(user.data));
          commit('LOGIN_SUCCESS', user.data);
          router.push('/bills');
        } else {
          commit('LOGIN_FAILURE', 'Login failed');
        }
      })
      .catch(err => {
        commit('LOGIN_FAILURE', err);
      });
  },
  // register also logs in the user
  register: ({ commit }, { username, password }) => {
    console.log(`Creating user account with username ${username} and password ${password}`);
    commit('LOGIN_REQUEST', { username });
    userService.register(username, password)
      .then(user => {
        if (user.data) {
          user.data.username = username;
          localStorage.setItem('user', JSON.stringify(user.data));
          commit('LOGIN_SUCCESS', user.data);
          router.push('/bills');
        } else {
          commit('LOGIN_FAILURE', 'Register failed.');
        }
      })
      .catch(err => {
        commit('LOGIN_FAILURE', err);
      });
  },
  logout: ({ commit }) => {
    userService.logout();
    commit('LOGOUT');
  }
}

const getters = {
  getUser: state => state.user,
  getLoginStatus: state => state.status
}

const mutations = {
  LOGIN_REQUEST: (state, user) => {
    state.status = { loginFailed: false, loggedIn: true };
    state.user.token = user.token;
    state.user.username = user.username;
  },
  LOGIN_SUCCESS: (state, user) => {
    state.status = { loginFailed: false, loggedIn: true };
    state.user.token = user.token;
    state.user.username = user.username;
  },
  LOGIN_FAILURE: (state, err) => {
    state.status = { loginFailed: true, error: err };
    state.user = {};
  },
  LOGOUT: (state) => {
    state.status = { loginFailed: false };
    state.user = {};
  }
}

export const authentication = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}