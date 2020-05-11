module.exports = {
  client: {
    service: {
      name: "StackShare",
      url: process.env.APOLLO_ENGINE_API_ENDPOINT,
      headers: {
        "'x-api-key": process.env.VUE_APP_APOLLO_ENGINE_KEY
      }
    }
  }
};
