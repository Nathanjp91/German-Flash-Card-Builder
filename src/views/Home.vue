<template>
  <v-card>
    <v-container grid-list-xs fluid class="ma-0 px-0">
      <v-row no-gutters dense>
        <v-col cols="3" v-if="screenWidth >= 800">
          <list-view />
        </v-col>
        <v-col v-else cols='1' class='ma-0 pa-3'>
          <v-btn icon>
            <v-icon>mdi-format-list-bulleted</v-icon>
          </v-btn>
        </v-col>
        <v-col class="px-3">
          <div class="ma-1 pa-1">
            <v-select
              v-model="type"
              :items="items"
              label="Type"
              outlined
              single-line
              dense
            ></v-select>
            <v-expansion-panels accordion multiple v-model="panels">
              <v-expansion-panel>
                <v-expansion-panel-header>
                  {{ type }}{{ baseWord === "" ? "" : " - " + baseWord
                  }}{{ meaning === "" ? "" : " - " + meaning }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-container grid-list-xs fluid class="ma-0 pa-0">
                    <v-row>
                      <v-text-field
                        class="pr-1"
                        label="Word"
                        v-model="baseWord"
                      ></v-text-field>
                    </v-row>
                    <v-row>
                      <v-text-field
                        class="pr-1"
                        label="Meaning"
                        v-model="meaning"
                      ></v-text-field>
                      <v-text-field
                        class="pl-1"
                        label="Unsplash Search Term"
                        v-model="searchTerm"
                        v-on:blur="updateWord"
                      ></v-text-field>
                    </v-row>
                  </v-container>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  Word Specifics
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <noun
                    v-bind:baseWord="baseWord"
                    v-if="type === 'Noun'"
                  />
                  <verb
                    v-bind:baseWord="baseWord"
                    v-else-if="type === 'Verb'"
                  />
                  <adverb
                    v-bind:baseWord="baseWord"
                    v-else-if="type === 'Adverb'"
                  />
                  <adjective
                    v-bind:baseWord="baseWord"
                    v-else-if="type === 'Adjective'"
                  />
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel >
                <v-expansion-panel-header>
                  Image Selector
                  <v-progress-circular
                    v-if="makingRequest"
                    indeterminate
                    color="primary"
                    :size="70"
                    :width="7"
                  ></v-progress-circular>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <image-selector
                    v-if="!makingRequest"
                    v-bind:unsplash="unsplash"  
                    @focused='panels = [2]'
                  />
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <div class="text-right ma-2 pa-2">
              <v-btn color="success" @click="submit">Submit</v-btn>
            </div>
          </div>
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
import ImageSelector from "../components/ImageSelector.vue";
import ListView from "../components/ListView.vue";
import Axios from "axios";
import { mapState, mapActions } from "vuex";

export default {
  name: "Home",
  data: () => ({
    panels: [0, 1, 2],
    items: ["Noun", "Verb", "Adverb", "Adjective"],
    makingRequest: false,
    unsplash: [],
    searchTerm: "",
  }),
  components: {
    Noun,
    Verb,
    Adverb,
    Adjective,
    ImageSelector,
    ListView,
  },
  watch: {
    meaning() {
      this.searchTerm = this.meaning;
    },
  },
  computed: {
    ...mapState({
      unsplashApiKey: (state) => state.credentials.unsplashApiKey,
    }),
    screenWidth() {
      return this.$vuetify.breakpoint.width
    },
    type: {
      get() {
        return this.$store.state.currentCard.type;
      },
      set(value) {
        this.$store.commit("newCard");
        this.$store.commit("updateCard", { type: value });
      },
    },
    baseWord: {
      get() {
        return this.$store.state.currentCard.word;
      },
      set(value) {
        this.$store.commit("updateCard", { word: value.capitalize() });
      },
    },
    meaning: {
      get() {
        return this.$store.state.currentCard.meaning;
      },
      set(value) {
        this.$store.commit("updateCard", { meaning: value.capitalize() });
      },
    },
  },
  methods: {
    ...mapActions(["updateCard", "newCard", "addCard"]),
    updatetype() {
      this.newCard();
    },
    updateWord() {
      this.panels = this.panels.filter((i) => i !== 0);
      if (this.makingRequest) {
        this.unsplash = [];
        return;
      }
      if (this.searchTerm === "") {
        return;
      }
      this.makingRequest = true;
      setTimeout(() => {
        Axios.get(
          `https://api.unsplash.com/search/photos?page=1&query=${this.searchTerm}&client_id=${this.unsplashApiKey}`
        ).then((resp) => {
          this.unsplash = resp.data.results;
        });
        this.makingRequest = false;
      }, 1000);
      this.updateCard({ images: [] });
    },
    reset() {},
    submit() {
      this.addCard()
      this.unsplash = []
      this.panels = [0, 1, 2];
    },
  },
  mounted() {
    Object.defineProperty(String.prototype, "capitalize", {
      value: function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
      },
      enumerable: false,
    });
  },
};
</script>
