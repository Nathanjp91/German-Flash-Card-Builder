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
              ></v-select>
              <v-text-field label="Word" v-model="baseWord"></v-text-field>
              <v-text-field label="Meaning" v-model="meaning" v-on:blur="updateWord"></v-text-field>
              <noun v-bind:baseWord="baseWord" v-if="type === 'Noun'"/>
              <verb v-bind:baseWord="baseWord" v-else-if="type === 'Verb'"/>
              <adverb v-bind:baseWord="baseWord" v-else-if="type === 'Adverb'"/>
              <adjective v-bind:baseWord="baseWord" v-else-if="type === 'Adjective'" />
              <v-progress-circular v-if="makingRequest" indeterminate color="primary" :size="70" :width="7"></v-progress-circular>
              <image-selector v-if="!makingRequest" v-bind:unsplash="unsplash"/>
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
import { mapState, mapActions } from "vuex";

export default {
  name: "Home",
  data: () => ({
    items: ["Noun", "Verb", "Adverb", "Adjective"],
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
    }),
    type: {
      get() {
        return this.$store.state.currentCard.type
      },
      set(value) {
        this.$store.commit('newCard')
        this.$store.commit('updateCard', {type: value})
      } 
    },
    baseWord: {
      get() {
        return this.$store.state.currentCard.word
      },
      set(value) {
        this.$store.commit('updateCard', {word: value.capitalize()})
      } 
    },
    meaning: {
      get() {
        return this.$store.state.currentCard.meaning
      },
      set(value) {
        this.$store.commit('updateCard', {meaning: value.capitalize()})
      } 
    }
  },
  methods: {
    ...mapActions([
      'updateCard',
      'newCard',
    ]),
    updatetype() {
      this.newCard()
    },
    updateWord() {
      if (this.makingRequest) {
        this.unsplash = []
        return
      }
      if (this.meaning === '') { return }
      this.makingRequest = true;
      setTimeout(() => {
        Axios.get(
          `https://api.unsplash.com/search/photos?page=1&query=${this.meaning}&client_id=${this.unsplashApiKey}`
        ).then((resp) => {
          this.unsplash = resp.data.results;
        });
        this.makingRequest = false;
      }, 1000);
      this.updateCard({images: []})
    },
    reset() {},
  },
  mounted () {
    Object.defineProperty(String.prototype, 'capitalize', {
      value: function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
      },
      enumerable: false
    });
  }
};
</script>
