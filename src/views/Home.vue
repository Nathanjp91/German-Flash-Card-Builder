<template>
<v-card>
  <div class="ma-1 pa-1">
    <v-select
      v-model="type"
      :items="items"
      label="Type"
      outlined
      single-line
      v-on:change="baseWord = ''"
    ></v-select>
    <v-text-field label="Word" v-model="baseWord"></v-text-field>
    <v-text-field label="Meaning" v-model="meaning" v-on:blur="onWordChange"></v-text-field>
    <noun v-bind:baseWord="baseWord" v-if="type === 'Noun'"/>
    <verb v-bind:baseWord="baseWord" v-else-if="type === 'Verb'"/>
    <adverb v-bind:baseWord="baseWord" v-else-if="type === 'Adverb'"/>
    <adjective v-bind:baseWord="baseWord" v-else-if="type === 'Adjective'" />
    <v-progress-circular v-if="makingRequest" indeterminate color="primary" :size="70" :width="7"></v-progress-circular>
    <image-selector v-if="unsplash.length > 0 && !makingRequest" v-bind:unsplash="unsplash"/>
  </div>
</v-card>
</template>

<script>
import Noun from "../components/Noun.vue";
import Verb from "../components/Verb.vue";
import Adverb from "../components/Adverb.vue";
import Adjective from "../components/Adjective.vue";
import ImageSelector from "../components/ImageSelector.vue"
import Axios from "axios";
import { mapState } from "vuex";

export default {
  name: "Home",
  data: () => ({
    type: "Noun",
    items: ["Noun", "Verb", "Adverb", "Adjective"],
    baseWord: "",
    meaning: "",
    makingRequest: false,
    unsplash: [],
  }),
  components: {
    Noun,
    Verb,
    Adverb,
    Adjective,
    ImageSelector,
  },
  computed: {
    ...mapState({
      apiKey: state => state.credentials.unsplashApiKey
    }),
  },
  methods: {
    onWordChange() {
      if (this.makingRequest) {
        this.unsplash = []
        return;
      }
      this.makingRequest = true;
      setTimeout(() => {
        Axios.get(
          `https://api.unsplash.com/search/photos?page=1&query=${this.meaning}&client_id=${this.apiKey}`
        ).then((resp) => {
          this.unsplash = resp.data.results;
        });
        this.makingRequest = false;
      }, 1000);
    },
    reset() {},
  },
};
</script>
