import Vue from "vue";
import { cloneDeep, debounce } from "lodash";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import { createProvider } from "./vue-apollo";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  $cloneDeep: cloneDeep,
  $debounce: debounce,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");
