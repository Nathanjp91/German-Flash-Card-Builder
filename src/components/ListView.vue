<template>
  <v-list flat>
    <v-subheader>Cards</v-subheader>
    <v-text-field
      label="filter"
      class='ma-1 pa-1'
      v-model="filter"
    ></v-text-field>
    <v-list-item dense v-for="(card, index) in summaries" :key="index"
    @mouseenter="highlight = index"
        @mouseout="highlight = -1"
        >
        <v-btn text>{{ card }}</v-btn>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    filter: '',
    highlight: -1,
  }),
  computed: {
    ...mapState({
      cards: (state) => state.cards,
    }),
    summaries: function () {
      return this.filtered.map((card) => {
        return `${card.type[0]} - ${card.content.word} - ${card.content.images.length} images`;
      });
    },
    filtered: function() {
      if (this.filter === '') { return this.cards}
      return this.cards.filter((card) => card.content.word.toLowerCase().includes(this.filter))
    }
  },
};
</script>

<style>
</style>