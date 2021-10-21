<template>
  <v-list flat>
    <v-subheader>
      {{ cards.length }} Cards - {{nouns.length}}n/{{verbs.length}}v/{{others.length}}o
      <v-spacer></v-spacer>
      <v-btn icon color='primary'><v-icon>mdi-reload</v-icon></v-btn>
      <v-btn icon color='primary'><v-icon>mdi-upload</v-icon></v-btn>
      <v-btn icon color='primary'><v-icon>mdi-download</v-icon></v-btn>

    </v-subheader>
    <v-text-field
      label="filter"
      class="ma-1 pa-1"
      v-model="filter"
    ></v-text-field>
    <v-virtual-scroll
      :items='filtered'
      :bench="15"
      height="300"
      item-height="40"
    >
      <template
        v-slot:default="{ item }"
      >
      <v-list-item :key="item.word">
        <v-btn :color='cardColor(item)' class='lighten-3' width="100%">{{ cardText(item) }}</v-btn>
      </v-list-item>
      </template>
    </v-virtual-scroll>
  </v-list>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    filter: "",
    highlight: -1,
  }),
  methods: {
    cardText: function(card) {
      return `${card.type[0]} - ${card.word} - ${card.images.length} images`;
    },
    cardColor: function(card) {
      if (card.type === 'verb') { return 'yellow' }
      else if (card.type === 'noun') {
        if(card.gender === 'Masculine') { return 'purple' }
        if(card.gender === 'Neutral') { return 'green' }
        if(card.gender === 'Feminine') { return 'orange' }
      }
      else return 'grey'
    }
  },
  computed: {
    ...mapState({
      cards: (state) => state.cards,
    }),
    summaries: function () {
      return this.filtered.map((card) => {
        return `${card.type[0]} - ${card.word} - ${card.images.length} images`;
      });
    },
    filtered: function () {
      if (this.filter === "") {
        return this.cards;
      }
      return this.cards.filter((card) =>
        card.content.word.toLowerCase().includes(this.filter)
      );
    },
    nouns: function() {
      return this.cards.filter((card) => card.type === 'noun')
    },
    verbs: function() {
      return this.cards.filter((card) => card.type === 'verb')
    },
    others: function() {
      return this.cards.filter((card) => !(card.type === 'verb' || card.type === 'noun'))
    }
  },
};
</script>

<style>
</style>