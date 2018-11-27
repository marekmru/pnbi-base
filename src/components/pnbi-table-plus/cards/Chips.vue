<template lang="html">
  <v-toolbar dense flat v-show="items.length > 0">
    <v-menu
      v-if="item.selectedForSearch"
      v-for="item in itemsAsChips"
      :key="item.value"
      offset-y light
      :close-on-content-click="false" >
      <v-chip
        close
        slot="activator"
        @click="openChipDialog(item)"
        @input="onChipClose(item)">
          {{item.text}}
          <span v-for="(value, key) in item.items" :key="key" style="padding-left: 4px">
          "<span class="chip-text">{{item.chipText}}</span>
          <span class="chip-value">{{value}}</span>"
        </span>
      </v-chip>
      <!-- numbro.js menu -->
      <!-- <card-numbro v-if="item.style === 'numbro.js'"
        :originItem="item" class="card-wrapper"></card-numbro> -->

      <!-- moment.js menu -->
      <!-- <card-moment v-if="item.style === 'moment.js'"
        :item="item"
        @itemUpdate="this.$emit('updateChip')"
        class="card-wrapper"></card-moment> -->

      <!-- default menu -->
      <!-- <card-default v-if="item.style !== 'numbro.js' && item.style !== 'moment.js'"
        :item="item" @itemUpdate="onItemUpdate" class="card-wrapper"></card-default> -->
    </v-menu>
  </v-toolbar>
</template>

<script>
// import ExtendsSearchMixin from './extendsSearchMixin.js'
// import CardNumbro from './CardNumbro'
import CardMoment from './CardMoment'
import CardDefault from './CardDefault'

export default {
  name: 'chips',
  // mixins: [ExtendsSearchMixin],
  props: {
    items: {
      type: Array,
      default: null
    },
    itemsDefault: {
      type: Array,
      default: null
    }
  },
  components: {
    // CardNumbro,
    CardMoment,
    CardDefault
  },
  data: function () {
    return {
      chipText: null
    }
  },
  computed: {
    itemsAsChips: {
      get () {
        if (this.itemsDefault === null) {
          return true
        }
        // run over defautls
        let temp = this.items
        this.itemsDefault.map( dItem => {
          const key = Object.keys(dItem)[0]
          temp.filter(item => {
            if(item.value === key) {
              item.selectedForSearch = true
              return item
            }
          })
        })
        return temp
      },
      set(items) {
        this.$emit('update:items', items)
      }
    }
  },
  methods: {
    /**
     * Open menu for edit the avancedSearchTerm
     * @param item that should be changed
     */
    openChipDialog (item) {
      item.editDialog = !item.editDialog
    },
    onChipClose (item) {
      this.itemsAsChips = this.itemsAsChips.filter(header => {
        if (header.value === item.value) {
          header.selectedForSearch = false
        }
        return header
      })
    },
  }
}
</script>

<style lang="css">
</style>
