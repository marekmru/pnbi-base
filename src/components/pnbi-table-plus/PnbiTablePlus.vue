<template>

  <div class="pnbi-datatable" ref="toolbar">

    <!-- customise dialog here -->
    <customise-dialog
      :localStorageHeaders="localStorageHeaders"
      @saveHeaders="updateHeaders()"
      @filterHeadersBySearch="filterHeadersBySearch($event)"
      @selectAllHeaders="selectAllHeaders($event)"></customise-dialog>

    <!-- Advanced search -->
    <extend-search-dialog
      :localStorageHeaders="localStorageHeaders"></extend-search-dialog>

    <!-- Toolbar with chips -->
    <chips
      :items.sync="localStorageHeaders"
      :items-default="itemsDefault"></chips>

    <v-data-table v-bind="localAttrs" :pagination.sync="compPagination">
      <template slot="items" slot-scope="props">
        <tr @click="$emit('open-row', props.item)">
          <td v-for="(key, value, index) in localStorageHeaders" :key="index" nowrap class="tdcell" :title="props.item[key.value]"
            :class="{'text-xs-right': isNumber(props.item[key.value], key.value)}">
            {{props.item[key.value] | customFormatter(key)}}
          </td>
        </tr>
      </template>

      <!-- TODO enable custom empty state
      <template slot="no-results">
        <pnbi-empty text="No data to display"></pnbi-empty>
      </template> -->

    </v-data-table>
  </div>

</template>

<script>
import UpdateAndSaveMixin from './updateAndSaveMixin.js'
import is from 'is'
import Chips from './cards/Chips'
import CustomiseDialog from './dialogs/CustomiseDialog'
import ExtendSearchDialog from './dialogs/ExtendSearchDialog'

export default {
  name: 'PnbiDatatablePlus',
  components: {
    Chips,
    CustomiseDialog,
    ExtendSearchDialog
  },
  mixins: [UpdateAndSaveMixin],
  props: {
    /**
     * Uniq identifier for table.
     * used for saving the customised settings in localstorage
     */
    tableIdentifier: {
      type: String,
      required: true,
      default: 'default'
    },
    /**
     * Default columns that are enabled for advanced search
     */
    itemsDefault: {
      type: Array,
      default: null
    }
  },
  methods: {
    isNumber (val, key) {
      const isNumber = is.number(val)
      if (isNumber) {
        this.localAttrs.headers = this.localAttrs.headers.map(header => {
          if (header) {
            if (header.value === key) {
              header.align = 'right'
            }
            return header
          }
        })
      }
      return isNumber
    },

  },
  computed: {
    compPagination: {
      get: function () {
        return this.localAttrs.pagination
      },
      set: function (pagination) {
        // https://vuejs.org/v2/guide/components-custom-events.html#Event-Names
        // For these reasons, we recommend you always use kebab-case for event names.
        // this.$emit('pagination-event', pagination)
        // https://vuejs.org/v2/guide/components-custom-events.html#sync-Modifier
        this.$emit('update:pagination', pagination)
        this.$nextTick(function () {
          this.$updateHeaderDom(this.localStorageHeaders)
        })
      }
    }
  },
  data: function () {
    return {
      localStorageHeaders: [],
      drag: null,
      searchPlusToolbarVisible: false,
      searchPlusDialogVisible: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .tdcell {
    max-width: 350px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /deep/ .v-input__control {
    padding: 0 !important;
    min-height: 32px !important;
  }
  /deep/ .pnbi-search .v-input__slot {
    background: rgba(0,0,0,.1);
    margin: 0 !important;
  }
  /deep/ .v-text-field__details {
    margin-bottom: 0 !important;
  }
  .card-wrapper {
    padding: 8px;
  }
  .caption {
    max-width: 15em;
    margin-bottom: 0;
    color: #7a869a;
  }
</style>
