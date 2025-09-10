export default {
  namespaced: true,

  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null
  }),

  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  actions: {
    login({ commit }, { user, token }) {
      commit('setUser', user);
      commit('setToken', token);
    },
    logout({ commit }) {
      commit('logout');
    }
  },
  
  getters: {
    isAuthenticated: state => !!state.token,
    getUser: state => state.user
  }
}