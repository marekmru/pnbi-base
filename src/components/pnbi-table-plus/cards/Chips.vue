<template lang="html">
  <v-toolbar dense flat v-show="items.length > 0">
    <v-menu
      v-if="item.selectedForSearch"
      v-for="item in selectedChips"
      :key="item.value"
      offset-y light
      :close-on-content-click="false" >

      <!-- custom added chips -->
      <v-chip
        close
        slot="activator"
        @input="onChipClose(item)">
          {{item.text}}
          <span
            v-if="key != 'readonly'"
            v-for="(value, key) in item.searchValue"
            :key="key"
            style="padding-left: 4px">
          "<span class="chip-text">{{item.chipText}} </span>
           <span class="chip-value">{{value}}</span>"
        </span>
      </v-chip>

      <!-- numbro.js menu -->
      <!-- <card-numbro v-if="item.style === 'numbro.js'"
        :originItem="item" class="card-wrapper"></card-numbro> -->

      <!-- moment.js menu -->
      <card-moment v-if="item.style === 'moment.js'"
        :item="item"
        @itemUpdate="onItemUpdate($event)"
        class="card-wrapper"></card-moment>

      <!-- default menu -->
      <card-default v-if="item.style !== 'numbro.js' && item.style !== 'moment.js'"
        :item="item"
        @itemUpdate="onItemUpdate($event)"
        class="card-wrapper"></card-default>
    </v-menu>
  </v-toolbar>
</template>

<script>
import EventBus from 'pnbi-base/src/event-bus'
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
    filter: {
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
      internalSelectedChips: null
    }
  },
  computed: {
    computedFilter: {
      get: function () {
        return this.filter
      },
      set: function (filter) {
        this.$emit('update:filter', filter)
      }
    },
    selectedChips: {
      get () {
        if (this.filter === null) {
          return true
        }
        if(this.internalSelectedChips === null) {
          // run over defautls
          let temp = this.items
          this.computedFilter.map( filteritem => {
            const key = Object.keys(filteritem)[0]
            temp.find(item => { // use find
              if(item.value === key) {
                item.selectedForSearch = true
                item.searchValue = filteritem[key]
                return item
              }
            })
          })
          return temp
        } else {
          // return internalChips
          return this.internalSelectedChips
        }
      },
      set(items) {
        this.internalSelectedChips = items
        // console.log(this.internalSelectedChips.map(chip => chip.searchValue));
        const temp = this.internalSelectedChips.filter(chip => {
          if(chip.searchValue) {
            return chip
          }
        })
        EventBus.$emit('filterUpdate', temp)
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
      this.chips = this.selectedChips.filter(header => {
        if (header.value === item.value) {
          header.selectedForSearch = false
        }
        return header
      })
    },
    onItemUpdate (item) {
      this.selectedChips = this.selectedChips.map(chip => {
        if(chip.value === item.value) {
          chip = item
        }
        return chip
      })
    }
  }
}
</script>

<style lang="css">
</style>
