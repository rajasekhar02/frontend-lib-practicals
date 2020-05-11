<template>
  <v-container class="home">
    <v-card class="mx-auto" max-width="344" outlined>
      <v-row ref="row" justify="center" align="center"></v-row>
    </v-card>
  </v-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import * as PIXI from "pixi.js";

export default {
  name: "Home",
  inject: ["store2"],
  data: () => ({
    items: [
      { title: 1, icon: "mdi-file" },
      { title: 1, icon: "mdi-file" },
      { title: 1, icon: "mdi-file" },
      { title: 1, icon: "mdi-file" }
    ],
    sprite: null
  }),
  mounted() {
    const app = new PIXI.Application({ backgroundColor: 0x1099bb });
    this.$refs.row.appendChild(app.view);
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    this.sprite = PIXI.Sprite.from(require("@/assets/bunny.png"));
    this.sprite.anchor.set(0.5);
    this.sprite.x = app.screen.width / 2;
    this.sprite.y = app.screen.height / 2;
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
    this.sprite.on("pointerdown", this.onClick);
    app.stage.addChild(this.sprite);
  },
  methods: {
    onClick() {
      this.sprite.scale.x *= 1.25;
      this.sprite.scale.y *= 1.25;
      this.store2.store2.commit("SET_NAME", "asdfasdf");
    }
  }
};
</script>
