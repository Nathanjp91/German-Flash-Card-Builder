<template>
  <v-card
    class="d-flex flex-wrap"
    color="grey lighten-2"
    flat
    tile
  >
    <v-card
      v-for="image in unsplash"
      :key='image.id'
      v-on:click="swapSelected(image.id)"
    >
    <div
      :class="selected.includes(image.id) ? 'selectedClass' : 'notSelectedClass'"
    >

    </div>
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
    selected: []
  }),
  methods: {
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
  width: 200;
}
.notSelectedClass {
  width: 100;
}
</style>