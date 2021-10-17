<template>
  <div class="ma-1 pa-5">
    <div class="text-h4">Settings</div>
    <div>
      <v-text-field
        name="Unsplash Api"
        label="Unsplash Api"
        v-model="unsplashApiKey"
      ></v-text-field>
      <v-text-field
        name="Unsplash key"
        label="Unsplash Key"
        v-model="unsplashApiSecret"
      ></v-text-field>
      <v-text-field
        name="Oxford Dictionary App ID"
        label="Oxford Dictionary App ID"
        v-model="oxfordAppID"
      ></v-text-field>
      <v-text-field
        name="Oxford Dictionary Api Key"
        label="Oxford Dictionary Api Key"
        v-model="oxfordAppKey"
      ></v-text-field>
      <div class="text-right">
        <v-btn color="success" v-on:click="submit">Save</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    unsplashApiKey: "",
    unsplashApiSecret: "",
    oxfordAppID: "",
    oxfordAppKey: "",
  }),
  methods: {
    submit() {
      localStorage.setItem("unsplashApiKey", this.unsplashApiKey);
      localStorage.setItem("unsplashApiSecret", this.unsplashApiSecret);
      localStorage.setItem("oxfordAppID", this.oxfordAppID);
      localStorage.setItem("oxfordAppKey", this.oxfordAppKey);
      this.setCredentials({
        unsplashApiKey: this.unsplashApiKey,
        unsplashApiSecret: this.unsplashApiSecret,
        oxfordAppID: this.oxfordAppID,
        oxfordAppKey: this.oxfordAppKey
      })
    },
    ...mapActions([
      'setCredentials'
    ])
  },
  mounted() {
    this.unsplashApiKey =
      localStorage.getItem("unsplashApiKey") == "null"
        ? ""
        : localStorage.getItem("unsplashApiKey");
    this.unsplashApiSecret =
      localStorage.getItem("unsplashApiSecret") == "null"
        ? ""
        : localStorage.getItem("unsplashApiSecret");
    this.oxfordAppID =
      localStorage.getItem("oxfordAppID") == "null"
        ? ""
        : localStorage.getItem("oxfordAppID");
    this.oxfordAppKey =
      localStorage.getItem("oxfordAppKey") == "null"
        ? ""
        : localStorage.getItem("oxfordAppKey");
    this.setCredentials({
      unsplashApiKey: this.unsplashApiKey,
      unsplashApiSecret: this.unsplashApiSecret,
      oxfordAppID: this.oxfordAppID,
      oxfordAppKey: this.oxfordAppKey
    })
  },
};
</script>

<style>
</style>