<template>
  <div>
    <v-radio-group v-model="gender">
      <v-radio label="Masculine" color='purple' value="Masculine"></v-radio>
      <v-radio label="Neutral" color='green' value="Neutral"></v-radio>
      <v-radio label="Feminine" color='orange' value="Feminine"></v-radio>
    </v-radio-group>
  </div>
</template>

<script>
export default {
  data: () => ({
    gender: 'Masculine',
  }),
  props: {
    baseWord: String
  },
  watch: {
    baseWord() {
      // try to infer the gender based on preset rules
      const masculineEndings = ["ant", "ast", "ich", "ig", "ismus", "ling", "or", "us", "el", "er", "en"]
      const feminineEndings = ["a", "anz", "ei", "enz", "heit", "ie", "ik", "in", "keit", "schaft", "sion", "tät", "taet", "tion", "ung", "ur", "e"]
      const neutralEndings = ["chen", "lein", "ma", "ment", "sel", "tel", "tum", "um", "nis", "sal"]
      
      masculineEndings.forEach(ending => {
        if (this.baseWord.toLowerCase().endsWith(ending)) {
          console.log(ending)
          this.gender = 'Masculine'
          return
        }
      });
      feminineEndings.forEach(ending => {
        if (this.baseWord.toLowerCase().endsWith(ending)) {
          console.log(ending)
          this.gender = 'Feminine'
          return
        }
      });
      neutralEndings.forEach(ending => {
        if (this.baseWord.toLowerCase().endsWith(ending)) {
          console.log(ending)
          this.gender = 'Neutral'
          return
        }
      });
    }
  },
  methods: {
    submit() {

    }
  }
}
</script>

<style>

</style>