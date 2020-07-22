<template>
  <v-container>
    <v-row>
      <v-col cols="3"><v-text-field v-model="clickedRegionCode"></v-text-field></v-col>
      <v-col cols="2">
        <v-btn @click="handleGetPlace">Get Place</v-btn>
      </v-col>
    </v-row>
    <v-container class="map-box-holder">
      <v-container id="mapBox"></v-container>
      <v-container class="card-deck" v-scroll>
        <v-card class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">OVERLINE</div>
              <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
              <v-list-item-subtitle
                >Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn text>View</v-btn>
            <v-btn text>Locate Similar</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-container>
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
      clickedRegionCode: "",
      map: null,
      markerAddedToMap: []
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
    this.map = new mapBoxGL.Map({
      container: "mapBox",
      style: "mapbox://styles/mapbox/streets-v11"
    });
    this.addControlToMap();
    this.map.on("click", async e => {
      // The event object (e) contains information like the
      // coordinates of the point on the map that was clicked.
      const [longitude, latitude] = e.lngLat.toArray();
      const shortCode = await ebirdStore.dispatch("reverseGeocoding", { longitude, latitude });
      this.clickedRegionCode = shortCode.toUpperCase();
    });
  },
  methods: {
    async fetchAllCountries() {
      await ebirdStore.dispatch("getListOfCountries");
    },
    addControlToMap() {
      this.map.addControl(new mapBoxGL.NavigationControl());
    },
    async handleGetPlace() {
      if (this.markerAddedToMap.length > 0) {
        this.markerAddedToMap.forEach(marker => {
          marker.remove();
        });
      }
      const regionCode = this.clickedRegionCode;
      await ebirdStore.dispatch("fetchRecentObservations", {
        regionCode: regionCode.toUpperCase(),
        params: {
          back: 1,
          maxResults: 20
        }
      });
      this.getListRecentObservations.forEach(obs => {
        const marker = new mapBoxGL.Marker();
        marker.setLngLat([obs.lng, obs.lat]);
        marker.addTo(this.map);
        this.markerAddedToMap.push(marker);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.map-box-holder {
  position: relative;
  #mapBox {
    height: calc(100vh - 100px);
  }
  .card-deck {
    position: absolute;
    background-color: transparent;
    bottom: 0px;
    left: 0px;
    right: 0px;
    padding-bottom: 25px;
  }
}
</style>
