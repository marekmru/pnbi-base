<template>

  <div class="pnbi-datatable">

    <v-toolbar flat color="white" class="pnbi-datatable__toolbar pb-1 pt-2">
      <v-menu
        origin="center center"
        :close-on-content-click="false"
        transition="v-scale-transition"
        bottom>
        <v-btn primary light slot="activator">Columns</v-btn>
          <v-card>
            <v-layout row wrap>
              <v-flex>
                <v-list>
                  <v-subheader>
                    Select visible column
                  </v-subheader>
                  <v-list-tile v-for="header in localStorageHeaders" :key="header.text">
                    <v-list-tile-title>
                      <v-checkbox :label="header.text" v-model="header.selected" @change="updateHeaders" :value="header.selected"></v-checkbox>
                    </v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-flex>
              <!--
              <v-flex>
                 save user present
                 <v-form class="pa-4" @submit.prevent="saveColumnsPreset()">
                  <v-text-field solo v-model="name" label="Save your select as preset"></v-text-field>
                  <v-btn @click="saveColumnsPreset">Save</v-btn>
                 </v-form>
              </v-flex>
              -->
            </v-layout>
          </v-card>
      </v-menu>
    </v-toolbar>

    <v-data-table v-bind="localAttrs" @update:pagination="update()" :pagination.sync="pagination">
      <template slot="items" slot-scope="props" >
        <slot name="row" :props="props"></slot>
      </template>
    </v-data-table>
  </div>

</template>

<script>
// import columns filterung feature
import ColumnFilterMixin from './columnFilterMixin.js'
export default {
  name: 'pnbi-datatable-plus',
  mixins: [ColumnFilterMixin],
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
