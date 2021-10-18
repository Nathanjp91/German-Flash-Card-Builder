<template>
  <v-card>
    <v-container grid-list-xs fluid class='ma-0 pa-0'>
      <v-row no-gutters dense>
        <v-col cols='3'>
          <list-view />
        </v-col>
        <v-col>
          <v-expand-transition>
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
              <div class='text-right'>
                <v-btn color="success">Submit</v-btn>
              </div>
            </div>
          </v-expand-transition>
        </v-col>

      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import Noun from "../components/Noun.vue";
import Verb from "../components/Verb.vue";
import Adverb from "../components/Adverb.vue";
import Adjective from "../components/Adjective.vue";
import ImageSelector from "../components/ImageSelector.vue"
import ListView from "../components/ListView.vue";
import Axios from "axios";
import { mapState } from "vuex";

export default {
  name: "Home",
  data: () => ({
    expanded: false,
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
    ListView,
  },
  computed: {
    ...mapState({
      unsplashApiKey: state => state.credentials.unsplashApiKey,
      oxfordAppID: state => state.credentials.oxfordAppID,
      oxfordAppKey: state => state.credentials.oxfordAppKey
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
          `https://api.unsplash.com/search/photos?page=1&query=${this.meaning}&client_id=${this.unsplashApiKey}`
        ).then((resp) => {
          this.unsplash = resp.data.results;
        });
        // Axios.get(
        //   `https://od-api.oxforddictionaries.com/api/v2/entires/de/${this.baseWord}`, {
        //     headers: {
        //       app_id: this.oxfordAppID,
        //       app_key: this.oxfordAppKey
        //     }
        //   }
        // ).then((resp) => {
        //   console.log(resp)
        // })
        this.makingRequest = false;
      }, 1000);
    },
    reset() {},
  },
};
</script>
