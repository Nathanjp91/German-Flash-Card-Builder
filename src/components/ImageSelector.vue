<template>
  <v-card
    class="d-flex flex-wrap"
    color="lighten-2"
    flat
    tile
  >
    <v-card
      v-for="image in unsplash"
      :key='image.id'
      @click="swapSelected(image)"
      class='ma-1 pa-1'
      @focus='focused=image.id'
      :color="getColour(image)"
      hover
      @keyup.space='swapSelected(image)'
    >
      <v-img
        :src='image.urls.thumb'
        max-height="200"
        max-width="200"
      >
      <div v-if="checked.includes(image.id)">
        <v-icon class='primary--text text-h3'>mdi-check-circle-outline</v-icon>
      </div>
      </v-img>

    </v-card>
    <div v-if="unsplash.length === 0">
      <v-card
      v-for="image in selected"
      :key='image.id'
      @click="swapSelected(image)"
      class='ma-1 pa-1'
      @focus='focused=image.id'
      :color="getColour(image)"
      hover
      @keyup.space='swapSelected(image)'
    >
      <v-img
        :src='image.url'
        max-height="200"
        max-width="200"
      >
      <div v-if="checked.includes(image.id)">
        <v-icon class='primary--text text-h3'>mdi-check-circle-outline</v-icon>
      </div>
      </v-img>

    </v-card>
    </div>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    unsplash: Array,
  },
  data: () => ({
    focused: null,
  }),
  computed: {
    selected: {
      get() {
        return this.$store.state.currentCard.images
      },
      set(value) {
        this.$store.commit('updateCard', {images: value})
      } 
    },
    checked() {
      return this.selected.map((image) => image.id)
    }
  },
  methods: {
    ...mapActions([
      'updateCard'
    ]),
    getColour: function(image) {
      if (this.focused === image.id) { return 'orange' }
      if (this.checked.includes(image.id)) {return 'primary'}
      else return "white"
    },
    swapSelected: function(image) {
      if (!this.checked.includes(image.id)) { this.selected = [...this.selected, {id: image.id, url: image.urls.regular}] }
      else { this.selected = this.selected.filter((el) => el.id !== image.id) }
    }
  }
}
</script>

<style>
.v-card {
  background-color: crimson;
  color: crimson;
}
</style>