<template>
  <v-layout class="tgchar-row">

    <div class="px-2 pt-2 pb-1 bc-table-cell">
      <div>
        <v-icon class="bc-small-icon">{{icon}}</v-icon>
      </div>
    </div>

    <v-flex xs3 class="px-2 pt-2 pb-1 bc-table-cell">

      <v-select class="pt-0" multi-line :items="list" v-model="selectedCharacteristic" placeholder="Bitte wählen" item-text="Variable" item-value="Variable" return-object dense>
        <template slot="item" slot-scope="data" class="pnbi-select">
          <template>
            <v-list-tile-content class="pl-2">
              <v-list-tile-title v-html="data.item.Variable"></v-list-tile-title>
            </v-list-tile-content>
          </template>
        </template>
      </v-select>
    </v-flex>

    <v-flex xs3 class="px-2 pt-2 pb-1 bc-table-cell">

      <v-select dense class="pt-0" v-if="selectedCharacteristic" placeholder="Bitte wählen" :multiple="multiple" :items="selectedCharacteristic.source" v-model="model" item-text="Values" item-value="Values" return-object></v-select>

    </v-flex>
    <v-flex xs5 class="pl-3 pr-2 pt-3 pb-1 bc-table-cell">{{modelString}}</v-flex>
    <v-layout xs1 class="px-2 pt-2 pb-1 bc-table-cell">
      <v-btn icon class="mr-0 mt-0">
        <v-icon class="bc-small-icon">cancel</v-icon>
      </v-btn>
    </v-layout>
  </v-layout>
</template>

<script>
import is from 'is'
import { mapActions, mapGetters } from 'vuex'
export default {
  mounted () {
    try {
      this.disableTGChar({
        disable: this.data.Pseudo_Variable_Name
      })
    } catch (err) {
      console.log(err)
    }
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    tid: {
      type: String,
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    ...mapActions(['disableTGChar', 'setTgChar'])
  },
  computed: {
    ...mapGetters({
      list: 'targetGroupVariablesMod'
    }),
    multiple () {
      return this.selectedCharacteristic.Auswahltyp === 'Multiple Choice'
    },
    modelString () {
      if (is.array(this.model)) {
        return this.model.join(', ')
      } else {
        return this.model
      }
    },
    icon () {
      if (is.undefined(this.selectedCharacteristic)) {
        return
      }
      const parent = this.list.find(
        val =>
          val.Pseudo_Variable_Name ===
          this.selectedCharacteristic.Pseudo_Variable_Name
      )
      let icon = null
      if (is.defined(parent)) {
        switch (parent.group) {
          case 'Demographie':
            icon = 'person_pin_circle'
            break
          case 'Zusatzmerkmale Automotive':
            icon = 'directions_car'
            break
          case 'Qualitative Merkmale':
            icon = 'track_changes'
            break
          default:
            icon = 'accessibility'
        }
      }
      return icon
    },

    model: {
      get: function () {
        try {
          if (is.array(this.data.model)) {
            // list multiselect
            return this.data.model.map(val => {
              return val.Values
            })
          } else if (is.defined(this.data.model.Values)) {
            // list singleselect
            return this.data.model.Values
          }
        } catch (err) {}
      },
      set: function (value) {
        const payload = {
          tid: this.tid,
          value,
          Pseudo_Variable_Name: this.selectedCharacteristic.Pseudo_Variable_Name
        }
        this.setTgChar(payload)
      }
    },
    tgCharVars: {
      get: function () {
        try {
          return this.list
            .filter(val => is.defined(val.header))
            .map(val => val.header)
        } catch (err) {}
      }
    },
    /*     targetGroup: {
      get: function () {
        return this.$store.getters.targetGroupById(this.$route.params.tid)
      }
    }, */
    selectedCharacteristic: {
      set: function (newVal) {
        let enable
        if (is.null(this.data) === false) {
          enable = this.data.Pseudo_Variable_Name
        }
        this.model = newVal
        const payload = {
          disable: newVal.Pseudo_Variable_Name,
          enable
        }
        this.disableTGChar(payload)
      },
      get: function () {
        const selectedDisplay = this.list.find(
          val => val.Pseudo_Variable_Name === this.data.Pseudo_Variable_Name
        )
        return selectedDisplay
      }
    }
  }
}
</script>

<style>
.tgchar-row .bc-small-icon {
  color: rgba(0, 0, 0, 0.75);
}
.tgchar-row .input-group__details {
  min-height: 5px;
}
.tgchar-row .input-group__selections__comma {
  font-size: 14px;
}

.theme--light .list li.subheader {
  font-size: 14px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.87);
  text-transform: uppercase !important;
}
</style>
