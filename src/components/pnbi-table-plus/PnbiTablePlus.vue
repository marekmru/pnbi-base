<template>

  <div class="pnbi-datatable">

    <pnbi-dialog :title="dialogTitle" :open="customiseDialog" @close="customiseDialog=false" width="500">
      <div slot="dialog-content">
        <v-list>
          <v-subheader>
            {{dialogSubtitle}}
          </v-subheader>

          <!-- select all -->
          <v-list-tile>
            <v-list-tile-content>
                <v-checkbox :label="selectAllLabel" @change="selectAllHeaders()" v-model="selectAll"
                  style="align-items:center">
                </v-checkbox>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-text-field clearable class="pnbi-search" append-icon="search" flat solo-inverted full-width label="Search" v-model="searchStr"></v-text-field>
            </v-list-tile-action>
          </v-list-tile>

          <v-divider></v-divider>

          <draggable class="list-scrolWrapper" :list="localStorageHeaders" @start="drag=true" @end="updateHeaders($event)">
            <v-list-tile v-for="header in localStorageHeaders" :key="header.text" :class="{'highlighted': header.highlight}">
              <v-list-tile-content>
                <v-checkbox :label="header.text" @change="updateHeaders()" v-model="header.selected" :value="header.selected"
                  style="align-items:center">
                </v-checkbox>
              </v-list-tile-content>

              <v-list-tile-action class="text-sm-right">
                <v-icon color="grey lighten-1">drag_indicator</v-icon>
              </v-list-tile-action>

            </v-list-tile>
          </draggable>
        </v-list>
      </div>
      <div slot="dialog-actions">
        <v-btn dark color="primary" @click="customiseDialog = false" flat>
          {{dialogCloselabel}}
        </v-btn>
      </div>
    </pnbi-dialog>

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
import ColumnFilterMixin from './columnFilterMixin.js'
import is from 'is'
import draggable from 'vuedraggable'

export default {
  name: 'PnbiDatatablePlus',
  components: {
    draggable
  },
  mixins: [ColumnFilterMixin],
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
     * Defined the dialog title for customised dialog.
     */
    dialogTitle: {
      type: String,
      default: 'Customise table'
    },
    /**
     * Defined the dialog subtitle for customised dialog.
     */
    dialogSubtitle: {
      type: String,
      default: 'Select visible columns'
    },
    /**
     * Defined label for dialog close button
     */
    dialogCloselabel: {
      type: String,
      default: 'Close'
    },
    /**
     * Defined the label for selecting all headers in dialog
     */
    selectAllLabel: {
      type: String,
      default: 'Select all'
    }
  },
  methods: {
    /*
    * Toogle all headers on/off
    */
    selectAllHeaders () {
      this.localStorageHeaders = this.localStorageHeaders.map(header => {
        header.selected = this.selectAll
        return header
      })
      this.updateHeaders()
    },
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
    /**
     * Filter localStorageHeaders
     * set header.found true|false for specific display
     */
    filterlocalStorageHeadersBySearchStr () {
      this.localStorageHeaders = this.localStorageHeaders.map(header => {
        if (this.searchStr === '' || this.searchStr === null) {
          header.highlight = false
        } else {
          header.highlight = !header.text.toLowerCase().includes(this.searchStr)
        }
        return header
      })
    }
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
  watch: {
    searchStr: function () {
      this.filterlocalStorageHeadersBySearchStr()
    }
  },
  data: function () {
    return {
      drag: null,
      selectAll: null,
      searchStr: null
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
  .highlighted {
    opacity: 0.3;
  }
  .list-scrolWrapper {
    max-height: 350px;
    overflow-x: scroll;
  }
</style>
