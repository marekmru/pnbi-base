<template lang="html">
  <pnbi-dialog title="Advanced search" :open="dialogVisible" @close="dialogVisible=false">
    <div slat="dialog-content">
      <v-list>
        <v-list-tile v-for="header in computedItems" :key="header.text" :class="{'highlighted': header.highlight}">
          <v-list-tile-content>
            <!-- readonly -->
            <v-checkbox
              v-if="header.required"
              readonly
              :label="header.text"
              :class="{required:header.required}"
              @change="updateItems(header)"
              v-model="header.selectedForSearch"
              :value="header.selectedForSearch"
              style="align-items:center">
            </v-checkbox>

            <!-- defaults -->
            <v-checkbox
              v-else
              :label="header.text"
              @change="updateItems(header)"
              v-model="header.selectedForSearch"
              :value="header.selectedForSearch"
              style="align-items:center">
            </v-checkbox>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </div>
  </pnbi-dialog>
</template>

<script>
import EventBus from 'pnbi-base/src/event-bus'
export default {
  name: 'extendSearchDialog',
  props: {
    /**
     * Items for displaying in an list
     */
    items: {
      type: Array,
      default: null
    }
  },
  computed: {
    computedItems: {
      get: function () {
        return this.items
      },
      set: function (items) {
        const temp = this.items.filter(chip => {
          if(chip.selectedForSearch) {
            return chip
          }
        })
        EventBus.$emit('filterUpdate', temp)
      }
    }
  },
  data: function () {
    return  {
      dialogVisible: false
    }
  },
  mounted () {
    this.$bus.$on('openExtendSearchDialog', this.showDialog)
  },
  beforeDestroy(){
    this.$bus.$off('openExtendSearchDialog', this.showDialog)
  },
  methods: {
    showDialog () {
      this.dialogVisible = true
    },
    updateItems (item) {
      this.computedItems = this.computedItems.map(chip => {
        if(chip.value === item.value) {
          chip.searchValue = false
        }
        return chip
      })
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss">
.required {
  opacity: 0.5;
  label {
    &::after {
      content: "required";
      margin-left: 30px;
    }
  }
}
</style>
