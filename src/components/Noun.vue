<template>
  <div>
    <v-text-field
      label="Plural Form"
      v-model='plural'
    ></v-text-field>
    <v-radio-group v-model="gender">
      <v-radio label="Feminine" color="orange" value="Feminine"></v-radio>
      <v-radio label="Neutral" color="green" value="Neutral"></v-radio>
      <v-radio label="Masculine" color="purple" value="Masculine"></v-radio>
    </v-radio-group>
    <example-handler></example-handler>
  </div>
</template>

<script>
import ExampleHandler from "./ExampleHandler.vue";
export default {
  components: {
    ExampleHandler,
  },
  data: () => ({}),
  props: {
    baseWord: String,
  },
  computed: {
    plural: {
      get() {
        return this.$store.state.currentCard.plural;
      },
      set(value) {
        this.$store.commit("updateCard", { plural: value });
      }
    },
    gender: {
      get() {
        return this.$store.state.currentCard.gender;
      },
      set(value) {
        this.$store.commit("updateCard", { gender: value });
      },
    },
  },
  watch: {
    baseWord() {
      // try to infer the gender based on preset rules
      const masculineEndings = [
        "ant",
        "ast",
        "ich",
        "ig",
        "ismus",
        "ling",
        "or",
        "us",
        "el",
        "er",
        "en",
      ];
      const feminineEndings = [
        "a",
        "anz",
        "ei",
        "enz",
        "heit",
        "ie",
        "ik",
        "in",
        "keit",
        "schaft",
        "sion",
        "tät",
        "taet",
        "tion",
        "ung",
        "ur",
        "e",
      ];
      const neutralEndings = [
        "chen",
        "lein",
        "ma",
        "ment",
        "sel",
        "tel",
        "tum",
        "um",
        "nis",
        "sal",
      ];
      this.plural = this.baseWord
      masculineEndings.forEach((ending) => {
        if (this.baseWord.toLowerCase().endsWith(ending)) {
          this.gender = "Masculine";
          return;
        }
      });
      feminineEndings.forEach((ending) => {
        if (this.baseWord.toLowerCase().endsWith(ending)) {
          this.gender = "Feminine";
          return;
        }
      });
      neutralEndings.forEach((ending) => {
        if (this.baseWord.toLowerCase().endsWith(ending)) {
          this.gender = "Neutral";
          return;
        }
      });
    },
  },
  methods: {
    submit() {},
  },
};
</script>

<style>
</style>