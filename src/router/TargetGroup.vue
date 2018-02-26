<template>
  <v-container fluid>
    <v-card>
      <v-card-title primary-title>
        <v-layout column class="bc-table">
          <v-layout row>
            <div class="px-2 pt-1 pb-3 bc-table-cell bc-table-cell--head">
              <div>Typ</div>
            </div>

            <v-flex xs3 class="px-2 pt-1 pb-3 bc-table-cell bc-table-cell--head">Merkmal</v-flex>
            <v-flex xs3 class="px-2 pt-1 pb-3 bc-table-cell bc-table-cell--head">Einstellung</v-flex>
            <v-flex xs5 class="px-2 pt-1 pb-3 bc-table-cell bc-table-cell--head">Auswahl</v-flex>
            <v-layout xs1 class="px-2 pt-1 pb-3 bc-table-cell">
            </v-layout>
          </v-layout>
          <div v-for="model in charModel" :key="item.Pseudo_Variable_Name">
            <tg-char :data="model" :tid="$route.params.tid"></tg-char>
          </div>
        </v-layout>
      </v-card-title>
      <v-card-actions>
        <!--    <pre>{{charModel}}</pre> -->
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import TgChar from '@/components/sub/TGCharacteristic'
import { mapActions } from 'vuex'
import is from 'is'
export default {
  mounted () {
    this.getProject(this.$route.params.id)
    this.resetConfig()
  },
  components: {
    TgChar
  },
  computed: {
    targetGroup: {
      get: function () {
        const tg = this.$store.getters.targetGroupById(this.$route.params.tid)

        return tg
      }
    },
    tgCharConfig: {
      get: function () {
        return this.$store.getters.config('targetGroupVariables')
      }
    },
    charModel: {
      get: function () {
        if (is.defined(this.targetGroup)) {
          const config = this.tgCharConfig.map(val => val.Variable)
          const charDataSource = []
          config.forEach(val => {
            const sub = this.targetGroup[val]
            Object.keys(sub).forEach(key => {
              const raw = {
                model: sub[key],
                Pseudo_Variable_Name: key
              }
              charDataSource.push(raw)
            })
          })
          return charDataSource
        }
      }
    }
  },
  watch: {},
  methods: {
    ...mapActions(['getProject', 'resetConfig'])
  },
  data () {
    return {
      item: {}
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
