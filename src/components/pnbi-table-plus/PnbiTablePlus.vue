<template>

  <div class="pnbi-datatable">

    <pnbi-dialog :title="dialogTitle"
      :open="customiseDialog"
      width="500">
      <div slot="dialog-content">
        <v-list>
          <v-subheader>
            {{dialogSubtitle}}
          </v-subheader>
          <v-list-tile v-for="header in localStorageHeaders" :key="header.text">
            <v-list-tile-title>
              <v-checkbox :label="header.text" @change="updateHeaders()" v-model="header.selected" :value="header.selected"></v-checkbox>
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </div>
      <div slot="dialog-actions">
        <v-btn dark color="primary" @click="customiseDialog = false" flat>
          {{dialogCloselabel}}
        </v-btn>
      </div>
    </pnbi-dialog>

    <v-data-table v-bind="computedAttrs" :pagination.sync="pagination">
      <template slot="items" slot-scope="props">
        <tr>
          <td v-for="(key, value, index) in localStorageHeaders"
            :key="index" nowrap class="tdcell"
            :title="props.item[key.value]"
            :class="{'text-xs-right': isNumber(props.item[key.value], key.value)}">
            {{props.item[key.value] | formatData(key)}}
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>

</template>

<script>
import numbro from 'numbro'
import ColumnFilterMixin from './columnFilterMixin.js'
import FixedMixin from './FixedMixin.js'
import is from 'is'

/*
* Check for installed locale
* all locales are inside of languages.js
* default: us
*/
import languages from './languages.js'
Object.entries(languages).forEach(([key, value]) => {
  if (value.languageTag === navigator.language) {
    numbro.registerLanguage(languages[key])
    numbro.setLanguage(value.languageTag)
  }
})

export default {
  name: 'pnbi-datatable-plus',
  mixins: [ColumnFilterMixin, FixedMixin],
  filters: {
    formatData: function (value, key) {
      if (!value) return ''
      // transform numbers
      if (typeof (value) === 'number') {
        if (key.format) {
          if (key.style) {
            value = numbro(value).formatCurrency(key.format)
          } else {
            value = numbro(value).format(key.format)
          }
        } else {
          value = numbro(value).format('0,0')
        }
      }
      return value
    }
  },
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
    }
  },
  created () {},
  computed: {
    computedAttrs () {
      return this.localAttrs
    }
  },
  data: function () {
    return {
      pagination: {}
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
</style>
