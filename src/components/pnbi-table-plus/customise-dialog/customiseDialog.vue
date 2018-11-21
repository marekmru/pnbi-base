<template lang="html">
  <pnbi-dialog :title="dialogTitle" :open="customiseDialog" @close="customiseDialog=false" width="500">
    <!-- <div slot="dialog-content">
      <v-list>
        <v-subheader>
          {{dialogSubtitle}}
        </v-subheader>

        <v-list-tile>
          <v-list-tile-content>
              <v-checkbox :label="dialogSelectalllabel" @change="selectAllHeaders()" v-model="selectAll"
                style="align-items:center">
              </v-checkbox>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-text-field clearable class="pnbi-search" append-icon="search" flat solo-inverted full-width :label="dialogSearchlabel" v-model="searchStr"></v-text-field>
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
    </div> -->

    <div slot="dialog-actions">
      <v-btn dark color="primary" @click="customiseDialog = false" flat>
        {{dialogCloselabel}}
      </v-btn>
    </div>
  </pnbi-dialog>
</template>

<script>
export default {
  name: 'customiseDialog',
  props: {
    /**
     * Defined the dialog title for customised dialog.
     */
    dialogTitle: {
      type: String,
      default: 'Customise table'
    }
  }
}
</script>

<style lang="css">
</style>
