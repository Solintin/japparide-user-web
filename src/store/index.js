import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import createPersistedState from "vuex-persistedstate";
export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    rideInfo: null,
    currentUserData: undefined,
    isLoggedIn: false,
    loading: false,
  },

  actions: {
    setRideInfo({ commit }, data) {
      commit("SET_RIDE_INFO", data);
    },
    setUserData({ commit }, user) {
      commit("SET_USER_DATA", user);
    },

    setLoading({ commit }, loadingState) {
      commit("SET_LOADING", loadingState);
    },

    logout({ commit }) {
      commit("LOGOUT");
    },
  },

  mutations: {
    SET_RIDE_INFO(state, data) {
      state.rideInfo = data;
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
    rideInfo(state) {
      return state.rideInfo;
    },
  },
  modules: {},
});
