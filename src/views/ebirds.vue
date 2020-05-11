<template>
  <v-container>
    <v-row>
      <v-col cols="3"><v-text-field v-model="clickedRegionCode"></v-text-field></v-col>
      <v-col cols="2">
        <v-btn @click="handleGetPlace">Get Place</v-btn>
      </v-col>
    </v-row>
    <v-container id="mapBox"> </v-container>
    <v-data-table :headers="headers" :items="getListRecentObservations"></v-data-table>
  </v-container>
</template>

<script>
import mapBoxGL from "@/config/map";

import ebirdStore from "@/store/ebirdAPIStore";

export default {
  data: () => {
    return {
      searchPlace: "",
      clickedRegionCode: ""
    };
  },
  computed: {
    getListRecentObservations() {
      return ebirdStore.getters.getListRecentObservations;
    },
    headers() {
      return ["locName", "comName", "subId", "sciName"].map(x => ({ value: x, text: x }));
    }
  },
  mounted() {
    // console.log(mapBoxGL);
    const map = new mapBoxGL.Map({
      container: "mapBox",
      style: "mapbox://styles/mapbox/streets-v11"
    });
    map.on("click", async e => {
      // The event object (e) contains information like the
      // coordinates of the point on the map that was clicked.
      console.log(`A click event has occurred at  ${e.lngLat}`);
      const [longitude, latitude] = e.lngLat.toArray();
      const shortCode = await ebirdStore.dispatch("reverseGeocoding", { longitude, latitude });
      this.clickedRegionCode = shortCode.toUpperCase();
      console.log(shortCode);
    });
  },
  methods: {
    async fetchAllCountries() {
      await ebirdStore.dispatch("getListOfCountries");
    },
    async handleGetPlace() {
      const regionCode = this.clickedRegionCode;
      await ebirdStore.dispatch("fetchRecentObservations", {
        regionCode: regionCode.toUpperCase(),
        params: {
          back: 1,
          maxResults: 20
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#mapBox {
  height: calc(100vh - 100px);
}
</style>
