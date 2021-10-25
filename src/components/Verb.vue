<template>
  <div
    @keyup.ctrl='ctrl = true'
    @keydown.ctrl='ctrl = false' 
  >
  <v-container grid-list-xs>
    <v-row>
      <v-subheader>Past Perfect</v-subheader>
    </v-row>
    <v-row dense class='ma-0 pa-1'>
      <v-col>
        <v-select
          :items="auxiliaryVerbOptions"
          v-model="pastParticiple.auxiliaryVerb"
          label="Auxiliary Verb"
          width="100"
        ></v-select>
      </v-col>
      <v-col>
        <v-text-field
          v-model='pastParticiple.word'
          label="Perfect Form"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
    <v-simple-table dense fixed-header>
      <template v-slot:default>
        <thead>
          <tr>
            <th class='ma-1 pa-1 case-column text-center text-h7'>Case</th>
            <th class='ma-1 pa-1 text-center text-h7'>Present</th>
            <th class='ma-1 pa-1 text-center text-h7'>Simple Past</th>
            <th class='ma-1 pa-1 text-center text-h8'>aux verb</th>
            <th class='ma-1 pa-1 text-center text-h7'>Future I</th>
            <th class='ma-1 pa-1 text-center text-h7'>Future II</th>
            <th class='ma-1 pa-1 text-center text-h7'>end verb</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class='case-column ma-1 pa-1'>ich</td>
            <td> <input type="text" v-model='conjugation.ich' class='table-input py-0 px-2 text-center'> </td>
            <td> <input type="text" v-model='simplePast.ich' class='table-input py-0 px-2 text-center'> </td>
            <td> werde </td>
            <td> {{conjugation.ich}} </td>
            <td> {{pastParticiple.word}} </td>
            <td> {{pastParticiple.auxiliaryVerb}} </td>
          </tr>
          <tr>
            <td class='case-column ma-1 pa-1'>du</td>
            <td> <input type="text" v-model='conjugation.du' class='table-input py-0 px-2 text-center'> </td>
            <td> <input type="text" v-model='simplePast.du' class='table-input py-0 px-2 text-center'> </td>
            <td> wirst </td>
            <td> {{conjugation.du}} </td>
            <td> {{pastParticiple.word}} </td>
            <td> {{pastParticiple.auxiliaryVerb}} </td>
          </tr>
          <tr>
            <td class='case-column ma-1 pa-1'>er/sie/es</td>
            <td> <input type="text" v-model='conjugation.erSieEs' class='table-input py-0 px-2 text-center'> </td>
            <td> <input type="text" v-model='simplePast.erSieEs' class='table-input py-0 px-2 text-center'> </td>
            <td> wird </td>
            <td> {{conjugation.erSieEs}} </td>
            <td> {{pastParticiple.word}} </td>
            <td> {{pastParticiple.auxiliaryVerb}} </td>
          </tr>
          <tr>
            <td class='case-column ma-1 pa-1'>wir</td>
            <td> <input type="text" v-model='conjugation.wir' class='table-input py-0 px-2 text-center'> </td>
            <td> <input type="text" v-model='simplePast.wir' class='table-input py-0 px-2 text-center'> </td>
            <td> werden </td>
            <td> {{conjugation.wir}} </td>
            <td> {{pastParticiple.word}} </td>
            <td> {{pastParticiple.auxiliaryVerb}} </td>
          </tr>
          <tr>
            <td class='case-column ma-1 pa-1'>ihr</td>
            <td> <input type="text" v-model='conjugation.ihr' class='table-input py-0 px-2 text-center'> </td>
            <td> <input type="text" v-model='simplePast.ihr' class='table-input py-0 px-2 text-center'> </td>
            <td> werdet </td>
            <td> {{conjugation.ihr}} </td>
            <td> {{pastParticiple.word}} </td>
            <td> {{pastParticiple.auxiliaryVerb}} </td>
          </tr>
          <tr>
            <td class='case-column ma-1 pa-1'>Sie</td>
            <td> <input type="text" v-model='conjugation.Sie' class='table-input py-0 px-2 text-center'> </td>
            <td> <input type="text" v-model='simplePast.Sie' class='table-input py-0 px-2 text-center'> </td>
            <td> werden </td>
            <td> {{conjugation.Sie}} </td>
            <td> {{pastParticiple.word}} </td>
            <td> {{pastParticiple.auxiliaryVerb}} </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-divider></v-divider>
    <example-handler></example-handler>
  </div>
</template>

<script>
import ExampleHandler from "./ExampleHandler.vue";

export default {
  components: {
    ExampleHandler,
  },
  data: () => ({
    ctrl: false,
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

<style scoped>
.conjugation-table {
  list-style: none;
}
.case-column {
  width: 5rem;
  text-align: center;
  border-right: 1px solid lightgray;
  background: lightsteelblue;
}
.table-input {
  width: 100%;
  height: 100%;
  border: none;
  border-bottom: 1px solid lightgray;
}
.table-input:focus-visible {
  outline: none;
  border-bottom: 2px solid lightsteelblue;
}
.theme--light.v-data-table.v-data-table--fixed-header thead th {
  background: lightsteelblue;
}
</style>