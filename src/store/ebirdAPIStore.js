import Vue from "vue";
import Vuex from "vuex";
import {
  getRecentObservations,
  getListOfCountries,
  reverseGeocodingService
} from "@/services/ebirdServices";

Vue.use(Vuex);

const ebirdStore = new Vuex.Store({
  state: {
    listOfAllCountries: [],
    listRecentObservation: []
  },
  getters: {
    getListOfCountries(state) {
      return state.listOfAllCountries;
    },
    getListRecentObservations(state) {
      return state.listRecentObservation;
    }
  },
  mutations: {
    SET_LIST_COUNTRIES(state, listOfAllCountries) {
      state.listOfAllCountries = listOfAllCountries;
    },
    SET_RECENT_OBSERVATION(state, listRecentObservations) {
      state.listRecentObservation = listRecentObservations;
    }
  },
  actions: {
    async fetchRecentObservations(context, { regionCode, params }) {
      const response = await getRecentObservations(regionCode, params);
      context.commit("SET_RECENT_OBSERVATION", response.data);
      console.log(response);
    },
    async fetchAllCountries(context) {
      const response = await getListOfCountries();
      context.commit("SET_LIST_COUNTRIES", response);
      console.log(response);
    },
    async reverseGeocoding(context, { longitude, latitude }) {
      const response = await reverseGeocodingService(longitude, latitude);
      return response.data.features[0].properties.short_code;
    }
  }
});

export default ebirdStore;
