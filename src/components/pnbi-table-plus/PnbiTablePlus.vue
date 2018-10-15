<template>

  <div class="pnbi-datatable">

    <pnbi-dialog :title="dialogTitle" :open="customiseDialog" width="500">
      <div slot="dialog-content">
        <v-list>
          <v-subheader>
            {{dialogSubtitle}}
          </v-subheader>
          <draggable :list="localStorageHeaders" @start="drag=true" @end="updateHeaders($event)">
            <v-list-tile v-for="header in localStorageHeaders" :key="header.text">
              <!-- @click="doNothing()" -->
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
  //import FixedMixin from './FixedMixin.js'
  import is from 'is'
  import draggable from 'vuedraggable'
  import moment from 'moment'
  import languages from './numbroLanguages.js'

  export default {
    name: 'PnbiDatatablePlus',
    components: {
      draggable
    },
    mixins: [ColumnFilterMixin],
    filters: {
      formatData: function (value, key) {
        if (!value) return ''

        switch (key.style) {
          case 'numbro.js':
            if (key.format) {
              value = numbro(value).format(key.format)
            } else {
              value = numbro(value).format('0,0')
            }
            break
          case 'moment.js':
            if (key.format) {
              value = moment(value).format(key.format)
            } else {
              value = moment(value).format('l')
            }
            break
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
    created() {
      /*
       * Check for installed locale
       * compare if browser locale is defined in numbroLanguages.js
       * default: us
       * TODO: global solution, not only for datatable plus
       */
      Object.entries(languages).forEach(([key, value]) => {
        if (value.languageTag === navigator.language) {
          numbro.registerLanguage(languages[key])
          numbro.setLanguage(value.languageTag)
        }
      })
    },
    methods: {
      isNumber(val, key) {
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
      /*onDraggableEndEvent (evt) {
        this.updateHeaders()
      } ,
      //????????
      doNothing () {} */
    },
    computed: {

      compPagination: {
        get: function () {
          return this.localAttrs.pagination
        },
        set: function (pagination) {
          //https://vuejs.org/v2/guide/components-custom-events.html#Event-Names
          //For these reasons, we recommend you always use kebab-case for event names.
          //this.$emit('pagination-event', pagination)
          //https://vuejs.org/v2/guide/components-custom-events.html#sync-Modifier
          this.$emit('update:pagination', pagination)
          this.$nextTick(function () {
            this.$updateHeaderDom(this.localStorageHeaders)
          })
        }
      }
    },
    data: function () {
      return {
        drag: null
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