<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">Flash Card Builder</div>

      <v-spacer></v-spacer>
      <v-btn depressed plain @click.stop="drawer = !drawer">
        <v-icon>settings</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer right absolute temporary v-model="drawer" width='600px'>
      <settings />
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Settings from './components/Settings.vue'
export default {
  name: "App",
  components: {
    Settings
  },
  data: () => ({
    drawer: false,
  }),
  mounted() {},
};
</script>
