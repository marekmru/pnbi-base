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

    <v-data-table v-bind="localAttrs" :pagination.sync="pagination">
      <template slot="items" slot-scope="props">
        <tr>
          <td v-for="(key, value, index) in localStorageHeaders" :key="index">
            {{props.item[key.value] | tablePlusFilter(key.format)}}
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>

</template>

<script>
// import columns filterung feature
import ColumnFilterMixin from './columnFilterMixin.js'
import FixedMixin from './FixedMixin.js'
export default {
  name: 'pnbi-datatable-plus',
  mixins: [ColumnFilterMixin, FixedMixin],
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
  created() {},
  data: function () {
    return {
      pagination: {}
    }
  }
}

</script>

<style lang="scss" scoped>
</style>
