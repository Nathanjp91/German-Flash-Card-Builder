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
    gender: 'Masculine'
  }),
  mounted() {
    // try to infer the gender based on preset rules
    // const masculineEndings = ["ant", "ast", "ich", "ig", "ismus", "ling", "or", "us"]
    // const feminineEndings = []
    // const neutralEndings = []
  }
}
</script>

<style>

</style>