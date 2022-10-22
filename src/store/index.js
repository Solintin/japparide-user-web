import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import createPersistedState from "vuex-persistedstate";
export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    currentUser: undefined,
    currentUserData: undefined,
    isLoggedIn: false,
    loading: false,
  },

  actions: {
    setUser({ commit }, user) {
      commit("SET_USER", user);
      // Cookies.set("token", user.token);
    },
    setUserData({ commit }, user) {
      commit("SET_USER_DATA", user);
      // Cookies.set("token", user.token);
    },

    setLoading({ commit }, loadingState) {
      commit("SET_LOADING", loadingState);
    },

    logout({ commit }) {
      commit("LOGOUT");
    },
  },

  mutations: {
    SET_USER(state, user) {
      state.currentUser = user;
      state.isLoggedIn = true;
    },
    SET_USER_DATA(state, user) {
      state.currentUserData = user;
    },

    SET_LOADING(state, loadingState) {
      state.loading = loadingState;
    },
    LOGOUT(state) {
      state.currentUser = undefined;
      state.currentUserData = undefined;
      state.isLoggedIn = false;
      state.loading = false;
    },
  },
  getters: {
    data: (state) => state,
    currentUserData: (state) => state.currentUserData,
    currentUser(state) {
      return state.currentUser;
    },
  },
  modules: {},
});
