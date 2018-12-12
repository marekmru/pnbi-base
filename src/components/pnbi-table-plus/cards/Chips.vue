<template lang="html">
  <v-toolbar dense flat v-show="items.length > 0">
    <v-menu
      v-if="item.selectedForSearch || item.required"
      v-for="item in computedItems"
      :key="item.value"
      offset-y light
      :close-on-content-click="false">

      <!-- custom added chips -->
      <v-chip
        v-if="item.required"
        slot="activator"
        @input="onChipClose(item)">
          {{item.text}}
          <span
            v-if="key != 'required'"
            v-for="(value, key) in item.searchValue"
            :key="key"
            style="padding-left: 4px">
          "<span class="chip-text">{{item.chipText}} </span>
           <span class="chip-value">{{value}}</span>"
        </span>
      </v-chip>

      <v-chip
        v-else
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
      <card-numbro v-if="item.style === 'numbro.js'"
        :item="item"
        @itemUpdate="onItemUpdate($event)"
        class="card-wrapper">
      </card-numbro>

      <!-- moment.js menu -->
      <card-moment v-if="item.style === 'moment.js'"
        :item="item"
        @itemUpdate="onItemUpdate($event)"
        class="card-wrapper"></card-moment>

      <!-- default menu -->
      <!-- <card-default v-if="item.style !== 'numbro.js' && item.style !== 'moment.js'"
        :item="item"
        @itemUpdate="onItemUpdate($event)"
        class="card-wrapper"></card-default> -->
    </v-menu>
  </v-toolbar>
</template>

<script>
import EventBus from 'pnbi-base/src/event-bus'
// import ExtendsSearchMixin from './extendsSearchMixin.js'
import CardNumbro from './CardNumbro'
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
    CardNumbro,
    CardMoment,
    CardDefault
  },
  data: function () {
    return {
      internalItems: null,
      menuOpen: false
    }
  },
  computed: {
    computedItems: {
      get () {
        return this.items
      },
      set(items) {
        this.internalItems = items.map(i => {
          if(i.required) {
            i.searchValue = i.default
            i.selectedForSearch = true
          }
          return i;
        })
        console.log('set computedItems');
        this.$emit('update:items', this.internalItems)
        EventBus.$emit('filterUpdate', this.internalItems)
        const self = this
        // TODO refactore this bad practice
        setTimeout(function () {
          EventBus.$emit('filterUpdate', self.internalItems)
        }, 2000)
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
      // item.selectedForSearch = false
      // const obj = Object.assign(this.selectedChips, obj)
      // EventBus.$emit('filterUpdate', this.computedFilter)
      this.computedItems = this.computedItems.map(header => {
        if (header.value === item.value) {
          header.selectedForSearch = false
        }
        return header
      })
    },
    onItemUpdate (item) {
      this.computedItems = this.computedItems.map(chip => {
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
