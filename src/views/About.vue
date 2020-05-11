<template>
  <div class="about">
    <v-container>
      <v-content>
        <v-row>
          <v-col>
            <v-text-field v-model="tempCompanyName"></v-text-field>
          </v-col>
          <v-col>
            <v-btn text @click="handleBtnClick">Fetch Details</v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col v-for="(i, index) in cardData" :key="index" cols="4">
            <v-card>
              <v-row>
                <v-col cols="3" align-self="center">
                  <v-avatar>
                    <v-img :src="i.imageUrl"></v-img>
                  </v-avatar>
                </v-col>
                <v-col>
                  <v-row>{{ i.name }}</v-row>
                  <v-row>{{ i.id }}</v-row>
                  <v-row>{{ i.slug }}</v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-content>
    </v-container>
  </div>
</template>
<script>
import gql from "graphql-tag";

export default {
  inject: ["store2"],
  data: () => {
    return { tools: "", companyName: "", tempCompanyName: "" };
  },
  computed: {
    cardData() {
      return (this.tools.edges || []).map(x => x.node);
    }
  },
  apollo: {
    tools: {
      query: gql`
        query Tools($companyName: String!) {
          tools(query: $companyName) {
            edges {
              node {
                name
                title
                slug
                canonicalUrl
                id
                imageUrl
                ossRepo
                description
                websiteUrl
              }
            }
          }
        }
      `,
      variables() {
        return {
          companyName: this.companyName
        };
      }
    }
  },
  methods: {
    handleBtnClick() {
      this.companyName = this.tempCompanyName;
    }
  }
};
</script>
