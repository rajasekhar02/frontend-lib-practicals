<template>
  <v-app>
    <v-content>
      <v-tabs>
        <v-tab @click="handleClick('/graphQL')" id>
          <router-link to="/graphQL" value="graphQL">GraphQL</router-link>
        </v-tab>
        <v-tab @click="handleClick('/pixi')">
          <router-link to="/pixi" value="pixi">Pixi</router-link>
        </v-tab>
        <v-tab @click="handleClick('/ebirds')">
          <router-link to="/ebirds" value="ebird">Ebird Maps</router-link>
        </v-tab>
        <v-tab @click="handleClick('/stitch')">
          <router-link to="/stitch" value="stitch">Stitch</router-link>
        </v-tab>
      </v-tabs>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import store2 from "./store/newStore";

export default {
  name: "App",

  provide: () => ({
    store2: { store2 }
  }),
  data: () => ({
    //
  }),
  methods: {
    handleClick(value) {
      this.$router.push(value);
      console.log(this.$store);
    }
  }
};
</script>
