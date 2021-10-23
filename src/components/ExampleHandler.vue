<template>
  <div>
    <v-divider></v-divider>
    <p v-for="(example, index) in examples" :key=index class='ma-0 pa-0'>
      <v-btn icon @click=removeExample(example)>
        <v-icon color='red'>mdi-delete</v-icon>
      </v-btn>
      {{example}}
      <v-divider></v-divider>
    </p>
    <v-text-field
      v-model="text"
      label="New Example (press enter to submit)"
      @keypress.enter='addExample'
    ></v-text-field>
  </div>
</template>

<script>
export default {
  data: () => ({
    text: ''
  }),
  computed: {
    examples: {
      get() {
        return this.$store.state.currentCard.examples
      },
      set(value) {
        this.$store.commit('updateCard', {examples: value})
      }
    }
  },
  watch: {
    examples() {
      this.text = ''
    }
  },
  methods: {
    addExample() {
      if (this.examples.includes(this.text)) { return }
      if (this.text === '') { return }
      this.examples = [...this.examples, this.text]
      this.text = ''
    },
    removeExample(text) {
      this.examples = this.examples.filter((example) => example !== text)
    }
  }
}
</script>

<style>

</style>