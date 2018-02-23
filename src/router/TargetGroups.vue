<template>
  <v-container fluid v-if="targetGroups">
    <v-layout>
      <v-layout column class="bc-table">
        <v-layout row>
          <v-flex xs2 sm1 md1 class="px-2 pt-1 pb-3 bc-table-cell bc-table-cell--head">Fokus</v-flex>
          <v-flex xs2 sm1 md1 class="px-2 pt-1 pb-3 bc-table-cell bc-table-cell--head">Vergleich</v-flex>
          <v-flex xs3 sm5 class="px-2 pt-1 pb-3 bc-table-cell bc-table-cell--head">Name</v-flex>
          <v-flex xs5 sm5 class="px-2 pt-1 pb-3 bc-table-cell bc-table-cell--head">Potenzial</v-flex>

        </v-layout>
        <v-layout row v-for="targetGroup in targetGroups" :key="targetGroup.id">
          <v-flex xs2 sm1 md1 class="px-2 pt-3 pb-1 bc-table-cell">
            <v-radio-group class="pt-0" v-model="$focusGroup" mandatory>
              <v-radio color="primary" label="" :value="targetGroup.meta.id"></v-radio>
            </v-radio-group>
          </v-flex>
          <v-flex xs2 sm1 md1 class="px-2 pt-3 pb-1 bc-table-cell">
            <v-switch color="primary" v-if="targetGroup.meta.type!='F'" @change="setCompGroup(targetGroup)" v-model="targetGroup.meta.type" true-value="'C'" false-value="'NA'"></v-switch>

          </v-flex>
          <v-flex xs3 sm5 class="px-2 pt-3 pb-1 bc-table-cell">{{targetGroup.meta.title}}</v-flex>
          <v-flex xs2 sm3 class="px-2 pt-3 pb-1 bc-table-cell">{{targetGroup.potential.count | mio}}</v-flex>
          <v-flex xs3 sm2 class="px-2 pt-3 pb-1 bc-table-cell">
            <v-layout row class="bc-small-icons pt-0" justify-end>
              <v-btn icon class="mr-0 mt-0">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn icon class="mr-0 mt-0" @click="duplicateTargetGroup(targetGroup)">
                <v-icon>content_copy</v-icon>
              </v-btn>
              <v-btn icon class="mr-0 mt-0" @click="deleteTargetGroup(targetGroup.meta.id)">
                <v-icon>cancel</v-icon>
              </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-layout>
    <v-btn class="mt-5 ml-0" dark fab small color="primary" @click="_createTargetGroup">
      <v-icon>add</v-icon>
    </v-btn>
  </v-container>

</template>

<script>
import config from '@/assets/config.v2.json'
import is from 'is'
import router from '@/router'
import { mapActions, mapGetters } from 'vuex'
export default {
  mounted () {
    this.getProject(this.$route.params.id)
  },
  components: {},
  computed: {
    ...mapGetters({
      targetGroups: 'targetGroups'
    }),
    $focusGroup: {
      get: function () {
        if (is.defined(this.targetGroups)) {
          const focusTargetGroup = this.targetGroups.find(
            tg => tg.meta.type === 'F'
          )
          return focusTargetGroup ? focusTargetGroup.meta.id : null
        }
      },
      set: function (newValue) {
        if (is.defined(this.targetGroups)) {
          this.setFocusGroup(newValue)
        }
      }
    }
  },
  watch: {},
  methods: {
    ...mapActions([
      'getProject',
      'setFocusGroup',
      'setCompGroup',
      'duplicateTargetGroup',
      'deleteTargetGroup',
      'createTargetGroup'
    ]),
    _createTargetGroup () {
      this.createTargetGroup().then(() => {
        const tid = this.targetGroups.map(val => val.meta.id).sort().reverse()[0]
        router.push({
          name: 'targetGroup',
          params: { id: this.$route.params.id, tid }
        })
      })
    }
  },
  data () {
    return {
      config
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
