<template>
  <v-container fluid>
    <v-layout column>
      <v-flex xs12 sm12 md12 lg12 xl10 offset-xl1>
        <h1 class="bc-page-title">PROJEKTSETUP</h1>
        <v-layout class="elevation-5" column>
          <div class="pa-3 step-background">
            <!-- <transition name="fade"> -->
              <router-view />
<!--             </transition>
 -->          </div>
          <v-stepper v-model="stepsComplete" alt-labels non-linear>
            <v-stepper-header class="pt-3">
              <v-stepper-step @click.native="onClick('create', $event)" v-bind:rules="validationAdapter.metaGoals" editable step="1" :complete="stepsComplete > 1">Projektsetup</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step @click.native="onClick('targetGroups', $event)" v-bind:rules="validationAdapter.targetGroups" step="2" editable :complete="stepsComplete > 2">Zielgruppen</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step v-bind:rules="validationAdapter.mediaChannels" step="3" editable :complete="stepsComplete > 3">Media</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step v-bind:rules="validationAdapter.dateRange" step="4" editable :complete="stepsComplete > 4">Kampagnenzeitraum</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="5" :editable="validationAdapter.allValid()" :complete="stepsComplete > 5">Ergebnis</v-stepper-step>
            </v-stepper-header>
          </v-stepper>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Create from '@/router/Create'
import { mapGetters } from 'vuex'
import is from 'is'
import router from '@/router'
export default {
  mounted () {
    window.setTimeout(() => {
      switch (this.$route.name) {
        case 'create':
          this.stepsComplete = 1
          break
        case 'targetGroups':
          this.stepsComplete = 2
          break
      }
    })
  },
  components: {
    create: Create
  },
  computed: {
    projecrtUrl () {
      return '/project/' + this.$route.params.id
    },
    ...mapGetters({
      validation: 'validation'
    })
  },
  watch: {},
  methods: {
    onClick (message, event) {
      if (event) {
        event.preventDefault()
      }
      router.push(this.projecrtUrl + '/' + message)
    }
  },
  data () {
    return {
      step: null,
      validationAdapter: {
        metaGoals: [
          () => {
            return is.null(this.validation)
              ? false
              : this.validation.meta && this.validation.goals
          }
        ],
        targetGroups: [
          () => {
            return is.null(this.validation)
              ? false
              : this.validation.targetGroups
          }
        ],
        mediaChannels: [
          () => {
            return is.null(this.validation)
              ? false
              : this.validation.mediaChannels
          }
        ],
        dateRange: [
          () => {
            return is.null(this.validation) ? false : this.validation.dateRange
          }
        ],
        allValid (v = this.validation) {
          if (is.undefined(v) || is.null(v)) {
            return false
          }
          return (
            v.meta &&
            v.goals &&
            v.targetGroups &&
            v.mediaChannels &&
            v.dateRange
          )
        }
      },
      pid: undefined,
      stepsComplete: null
    }
  },
  created () {}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.step-background {
  background-color: #fff;
  //min-height: 480px;
}
.stepper {
  box-shadow: none;
}
.stepper__header {
  position: relative;
  max-width: 960px;
  margin: 0 auto;
  box-shadow: none;
  &:before {
    content: "";
    position: absolute;
    height: 2px;
    left: 32px;
    top: 0px;
    right: 32px;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
.stepper__label {
  text-transform: uppercase;
}
</style>
