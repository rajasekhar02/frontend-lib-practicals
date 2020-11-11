<template>
  <div>
    <div ref="quillEditor" id="quillEditor"></div>
  </div>
</template>

<script>
import Quill from "quill";

export default {
  data: () => {
    return {
      options: {
        modules: {
          toolbar: "#toolbar"
        },
        placeholder: "Compose an epic...",
        readOnly: true,
        theme: "snow"
      },
      editor: null
    };
  },
  mounted() {
    this.initComponet();
  },
  methods: {
    initComponet() {
      this.editor = new Quill(this.$refs.quillEditor, this.options);
      this.initEvents();
    },
    initEvents() {
      this.editor.on("selection-change", (range, oldRange, source) => {
        this.$emit("selection-change", range, oldRange, source);
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
