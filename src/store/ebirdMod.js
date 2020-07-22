import {
  getRecentObservations,
  getListOfCountries,
  reverseGeocodingService
} from "@/services/ebirdServices";

export default {
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
    },
    async fetchAllCountries(context) {
      const response = await getListOfCountries();
      context.commit("SET_LIST_COUNTRIES", response);
    },
    async reverseGeocoding(context, { longitude, latitude }) {
      const response = await reverseGeocodingService(longitude, latitude);
      return response.data.features[0].properties.short_code;
    }
  }
};
