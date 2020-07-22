import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/pixiComponent.vue";
import ebirdMap from "../views/ebirds.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/pixi",
    name: "PIXI",
    component: Home
  },
  {
    path: "/graphQL",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/About.vue")
  },
  {
    path: "/ebirds",
    name: "Ebrids",
    component: ebirdMap
  },
  {
    path: "/stitch",
    name: "MongoDBStitch",
    component: () => import("../views/mongoStitchComments.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
