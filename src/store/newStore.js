import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const store2 = new Vuex.Store({
  state: {
    name: "store2"
  },
  mutations: {
    SET_NAME: (state, name) => {
      state.name += name;
    }
  },
  actions: {}
});

export default store2;
