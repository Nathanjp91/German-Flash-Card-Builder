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
      @click="swapSelected(image.id)"
      class='ma-1 pa-1'
      @focus='focused=image.id'
      :color="getColour(image.id)"
      hover
      @keyup.space='swapSelected(image.id)'
    >
      <v-img
        :src='image.urls.thumb'
        max-height="200"
        max-width="200"
      >
      </v-img>

    </v-card>
  </v-card>
</template>

<script>
export default {
  props: {
    unsplash: Array,
  },
  data: () => ({
    selected: [],
    focused: null,
  }),
  methods: {
    getColour: function(id) {
      if (this.focused === id && this.selected.includes(id)) { return 'purple' }
      if (this.focused === id) { return 'orange' }
      if (this.selected.includes(id)) {return 'primary'}
      else return "white"
    },
    addSelected: function(id) {
      if (!this.selected.includes(id)) { this.selected.push(id) }
    },
    removeSelected: function(id) {
      this.selected = this.selected.filter((el) => el !== id)
    },
    swapSelected: function(id) {
      if (!this.selected.includes(id)) { this.selected.push(id) }
      else { this.selected = this.selected.filter((el) => el !== id) }
    }
  }
}
</script>

<style>
.selectedClass {
  border: 4px solid cornflowerblue;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.notSelectedClass {
  width: 100;
}
.v-card {
  background-color: crimson;
  color: crimson;
}
</style>