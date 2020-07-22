<template>
  <div>
    <v-text-field v-model="name" :counter="10" label="Name" required></v-text-field>
    <v-btn @click="addComment">
      button
    </v-btn>
    {{ comments }}
  </div>
</template>

<script>
import { Stitch, RemoteMongoClient, AnonymousCredential } from "mongodb-stitch-browser-sdk";

export default {
  data: () => {
    return {
      db: null,
      comments: [],
      client: null,
      name: ""
    };
  },
  async mounted() {
    this.client = Stitch.initializeDefaultAppClient("blogtutorial-ahjzr");
    const mongodb = this.client.getServiceClient(RemoteMongoClient.factory, "Blog");
    this.db = mongodb.db("blog");
    await this.displayCommentsOnLoad();
  },
  methods: {
    async displayComments() {
      try {
        const docs = await this.db
          .collection("comments")
          .find({}, { limit: 1000 })
          .toArray();
        console.log(docs);
        this.comments = docs.map(doc => doc.comment);
      } catch (err) {
        console.log(err);
      }
    },
    async displayCommentsOnLoad() {
      try {
        await this.client.auth.loginWithCredential(new AnonymousCredential());
        this.displayComments();
      } catch (err) {
        console.log(err);
      }
    },
    async addComment() {
      console.log(this);
      console.log("add comment", this.client.auth.user.id);
      this.db
        .collection("comments")
        .insertOne({ owner_id: this.client.auth.user.id, comment: this.name })
        .then(this.displayComments);
    },
    async updateComment() {
      console.log(this);
      console.log("add comment", this.client.auth.user.id);
      this.db
        .collection("comments")
        .insertOne({ owner_id: this.client.auth.user.id, comment: this.name })
        .then(this.displayComments);
    }
  }
};
</script>

<style lang="scss" scoped></style>
