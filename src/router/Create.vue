<template>
  <v-container text-center fluid>
    <v-form v-model="rules.valid" ref="form" lazy-validation v-if="project.data">
      <v-layout row>
        <v-flex xs12 sm6 class="pl-0 pr-4">

          <v-text-field @focus="focus" label="Projektname" @keyup="onChangeProjectName" v-model="project.data.meta.campaign" :rules="rules.nameRules" required></v-text-field>
          <h4 class="pb-3 pt-2 bc-title-line">Eckdaten</h4>
          <v-select disabled v-bind:items="config.client" v-model="project.data.meta.client" label="Kunde"></v-select>
          <v-select v-bind:items="config.campaignType" v-model="project.data.meta.campaignType" label="Kampagnenart"></v-select>
          <v-text-field name="desc" label="Beschreibung" multi-line rows="2" v-model="project.data.meta.description"></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 class="pl-4 pr-0">
          <div class="input-group">
            <v-switch color="primary" v-bind:label="`${project.data.public?'Öffentliches': 'Privates'} Projekt`" v-model="project.data.public"></v-switch>
          </div>
          <h4 class="pb-3 pt-2 bc-title-line">Zielsetzung</h4>
          <v-select v-bind:items="config.kpis" item-text="Values" item-value="Value_Code" return-object v-model="project.data.goals.priority" label="Maximiere"></v-select>

          <v-layout row align-center="true">
            <v-checkbox class="mr-3" color="primary" v-model="$budgetOptType1"></v-checkbox>
            <v-flex xs12>
              <text-number-input :disabled="$budgetOptType2" v-model="project.data.goals.budget"></text-number-input>
            </v-flex>
          </v-layout>
          <v-layout row align-center>
            <v-checkbox class="mr-3" color="primary" v-model="$budgetOptType2"></v-checkbox>
            <v-flex xs12>
                <v-text-field name="zielwert" label="Vorgegebener Zielwert (%)" :disabled="$budgetOptType1" v-model="project.data.goals.kpi"></v-text-field>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>

</template>

<script>
import config from '@/assets/config.v2.json'
import projects from '@/api/projects'
// import numeral from 'numeral'
import TextNumberInput from '@/components/sub/TextNumberInput'
import is from 'is'
// import config from '@/api/config'
import { mapActions, mapGetters } from 'vuex'
export default {
  mounted () {
    this.getProject(this.$route.params.id)
  },
  components: {
    TextNumberInput
  },
  computed: {
    ...mapGetters({
      project: 'project'
    }),
    $budgetOptType1: {
      get: function () {
        if (is.defined(this.project.data.goals)) {
          const checked = !is.null(this.project.data.goals.budget)
          return checked
        }
        return false
      },
      set: function (newValue) {
        if (newValue) {
          this.project.data.goals.budget = 3000000
          this.project.data.goals.kpi = null
        } else {
          this.project.data.goals.budget = null
          this.project.data.goals.kpi = 100
        }
      }
    },
    $budgetOptType2: {
      get: function () {
        if (is.defined(this.project.data.goals)) {
          const checked = !is.null(this.project.data.goals.kpi)
          return checked
        }
        return false
      },
      set: function (newValue) {
        if (newValue) {
          this.project.data.goals.budget = null
          this.project.data.goals.kpi = 100
        } else {
          this.project.data.goals.budget = 3000000
          this.project.data.kpi = null
        }
      }
    }
  },
  watch: {
    project: val => {}
  },
  methods: {
    ...mapActions(['getProject']),
    focus () {
      this.rules.errorNameUnique = false
      this.$refs.form.validate()
    },
    onChangeProjectName (value) {
      console.log(value)

      if (this.project.data.meta.campaign.length > 5) {
        projects
          .uniqueProjectName(this.project.data.meta.campaign)
          .then(unique => {
            this.rules.errorNameUnique = !unique
            console.log(this.rules.errorNameUnique)

            this.$refs.form.validate()
          })
      }
    }
  },
  data () {
    return {
      config,
      rules: {
        errorNameUnique: false,
        valid: false,
        nameRules: [
          v => !!v || 'Der Projektname ist ein Pflichtfeld',
          v =>
            v.length > 5 ||
            'Der Projektname muss mindestens 6 Zeichen lang sein.',
          v =>
            !this.rules.errorNameUnique ||
            'Der Projektname ist bereits vergeben.'
        ]
      }
    }
  },
  created () {}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
