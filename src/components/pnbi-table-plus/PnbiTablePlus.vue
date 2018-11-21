<template>

  <div class="pnbi-datatable" ref="toolbar">

    <!-- customise dialog here -->
    <customise-dialog
      :localStorageHeaders="localStorageHeaders"
      @saveHeaders="updateHeaders()"
      @filterHeadersBySearch="filterHeadersBySearch($event)"
      @selectAllHeaders="selectAllHeaders($event)"></customise-dialog>

    <!-- Advanced search -->
    <!-- <pnbi-dialog title="Advanced search" :open="searchPlusDialogVisible" @close="searchPlusDialogVisible=false">
      <div slat="dialog-content">
        <v-list>
          <v-list-tile v-for="header in localStorageHeaders" :key="header.text" :class="{'highlighted': header.highlight}">
            <v-list-tile-content>
              <v-checkbox :label="header.text" @change="searchPlusDialogVisible=false" v-model="header.selectedForSearch" :value="header.selectedForSearch"
                style="align-items:center">
              </v-checkbox>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </div>
    </pnbi-dialog> -->

    <!-- Toolbar with chips -->
    <v-toolbar dense flat v-show="itemsForAdvancedSearch.length > 0">
      <v-menu v-if="item.selectedForSearch" v-for="item in itemsForAdvancedSearch" :key="item.value" offset-y :close-on-content-click="false" light>
        <v-chip close slot="activator" @click="openChipDialog(item)" @input="onChipClose(item)">
          {{item.text}} <span v-for="(value, key) in item.advancedSearchItem" :key="key" style="padding-left: 4px">
            "<span class="chip-text">{{item.chipText}}</span>
            <span class="chip-value">{{value}}</span>"
          </span>
        </v-chip>
        <!-- numbro.js menu -->
        <!-- <card-numbro v-if="item.style === 'numbro.js'"
          :originItem="item" class="card-wrapper"></card-numbro> -->
        <!-- moment.js menu -->
        <card-moment v-if="item.style === 'moment.js'"
          :item="item" @itemUpdate="onItemUpdate" class="card-wrapper"></card-moment>
        <!-- default menu -->
        <card-default v-if="item.style !== 'numbro.js' && item.style !== 'moment.js'"
          :item="item" @itemUpdate="onItemUpdate" class="card-wrapper"></card-default>
      </v-menu>
    </v-toolbar>

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
import ExtendsSearchMixin from './extendsSearchMixin.js'
import UpdateAndSaveMixin from './updateAndSaveMixin.js'
import is from 'is'
// import CardNumbro from './CardNumbro'
import CardMoment from './CardMoment'
import CardDefault from './CardDefault'
import CustomiseDialog from './CustomiseDialog'

export default {
  name: 'PnbiDatatablePlus',
  components: {
    // CardNumbro,
    CardMoment,
    CardDefault,
    CustomiseDialog
  },
  mixins: [ExtendsSearchMixin, UpdateAndSaveMixin],
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
    advancedDefault: {
      type: Array,
      default: null
    }
  },
  methods: {
    onItemUpdate (item) {
      this.itemsForAdvancedSearch = this.itemsForAdvancedSearch.map(val => {
        if (val.value === item.value) {
          val = item
        }
        return val
      })
      // TODO close current menu .headline
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
      chipText: null,
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
