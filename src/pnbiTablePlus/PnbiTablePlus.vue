<template>

  <div class="pnbi-datatable">

    <v-dialog
      v-model="customiseDialog"
      width="500">
        <v-card>
          <v-layout row wrap>
            <v-flex>
              <v-toolbar color="accent">
                <v-toolbar-title class="white--text">Customise colums</v-toolbar-title>
              </v-toolbar>
              <v-list>
                <v-subheader>
                  Select visible column
                </v-subheader>
                <v-list-tile v-for="header in localStorageHeaders" :key="header.text">
                  <v-list-tile-title>
                    <v-checkbox :label="header.text" v-model="header.selected" :value="header.selected"></v-checkbox>
                  </v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-flex>
          </v-layout>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="customiseDialog = false" flat>Cancel</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>

    <v-data-table v-bind="localAttrs" :pagination.sync="pagination">
      <template slot="items" slot-scope="props">
        <slot name="row" :props="props"></slot>
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
    tableIdentifier: {
      type: String,
      required: true,
      default: 'default'
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
</style>
