<template>
  <div>
    <v-container fluid class='ma-0 pa-0'>
      <v-row>
        <v-col>
          <div class='text-h6'>Present Tense</div>
        </v-col>
        <v-col>
          <div class='text-h6'>Simple Past</div>
        </v-col>
      </v-row>
      <v-row >
        <v-col>
          <v-text-field
            dense
            hide-details
            label="ich"
            v-model="conjugation.ich"
          ></v-text-field>
        </v-col>
        <v-col> 
          <v-text-field
            dense
            hide-details
            label="ich"
            v-model="simplePast.ich"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            dense
            hide-details
            label="du"
            v-model="conjugation.du"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            dense
            hide-details
            label="du"
            v-model="simplePast.du"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            dense
            hide-details
            label="er/sie/es"
            v-model="conjugation.erSieEs"
          ></v-text-field>
        </v-col>
        <v-col><v-text-field
            dense
            hide-details
            label="er/sie/es"
            v-model="simplePast.erSieEs"
          ></v-text-field></v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            dense
            hide-details
            label="wir"
            v-model="conjugation.wir"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            dense
            hide-details
            label="wir"
            v-model="simplePast.wir"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            dense
            hide-details
            label="ihr"
            v-model="conjugation.ihr"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            dense
            hide-details
            label="ihr"
            v-model="simplePast.ihr"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            dense
            hide-details
            label="Sie"
            v-model="conjugation.Sie"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            dense
            hide-details
            label="Sie"
            v-model="simplePast.Sie"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            hide-details
            :items="auxiliaryVerbOptions"
            v-model="pastParticiple.auxiliaryVerb"
            label="Auxiliary Verb"
            dense
          ></v-select>
        </v-col>
        <v-col>
          <v-text-field
            dense
            hide-details
            label="Past Participle"
            v-model="pastParticiple.word"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    regular: true,
    conjugation: {
      ich: "",
      du: "",
      erSieEs: "",
      wir: "",
      ihr: "",
      Sie: "",
    },
    simplePast: {
      ich: "",
      du: "",
      erSieEs: "",
      wir: "",
      ihr: "",
      Sie: "",
    },
    pastParticiple: {
      word: '',
      auxiliaryVerb: ''
    },
    auxiliaryVerbOptions: ['haben', 'sein']
  }),
  props: {
    baseWord: String,
  },
  computed: {

  },
  watch: {
    baseWord() {
      if (!this.baseWord.endsWith("en")) {
        return;
      }
      const stem = /(.*)en/.exec(this.baseWord.toLowerCase())[1];
      this.conjugation = {
        ich: stem + "e",
        du: stem + "st",
        erSieEs: stem + "t",
        wir: this.baseWord,
        ihr: stem + "t",
        Sie: this.baseWord,
      };
      this.simplePast = {
        ich: stem + "te",
        du: stem + "test",
        erSieEs: stem + "te",
        wir: stem + "ten",
        ihr: stem + "tet",
        Sie: stem + "ten",
      };
      this.pastParticiple = {
        word: stem.endsWith('t') ? 'ge' + stem + 'et' : 'ge' + stem + 't',
        auxiliaryVerb: 'haben'
      }
    },
  },
};
</script>

<style>
</style>