<template lang="html">
  <v-list>
    <v-radio-group v-model="selected">

      <!-- default -->
      <v-list-tile>
        <v-list-tile-content>
            <v-radio value="smaller">
              <div slot="label">Kleiner als</div>
            </v-radio>
          </v-list-tile-content>
          <v-list-tile-action class="list_action">
            <v-text-field single-line hide-details label="dialogSearchlabel" v-model="searchStr"></v-text-field>
        </v-list-tile-action>
      </v-list-tile>

      <v-list-tile>
        <v-list-tile-content>
            <v-radio value="bigger">
              <div slot="label">Größer als</div>
            </v-radio>
          </v-list-tile-content>
          <v-list-tile-action class="list_action">
            <v-text-field single-line label="dialogSearchlabel" v-model="searchStr1"></v-text-field>
        </v-list-tile-action>
      </v-list-tile>

      <v-list-tile>
        <v-list-tile-content>
            <v-radio value="between">
              <div slot="label">Zwischen</div>
            </v-radio>
          </v-list-tile-content>
          <v-list-tile-action class="list_action">
            <v-layout>
              <v-flex>
                <v-text-field single-line label="dialogSearchlabel" v-model="searchStr3"></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field single-line label="dialogSearchlabel" v-model="searchStr4"></v-text-field>
              </v-flex>
            </v-layout>
        </v-list-tile-action>
      </v-list-tile>
      <v-list-tile>
        <v-btn flat small primary>Aktualisieren</v-btn>
        <v-btn flat small>Schließen</v-btn>
      </v-list-tile>
    </v-radio-group>
  </v-list>

  <!-- <v-card>
    <v-card-text>
      <v-text-field autofocus ref="focus" label="Kleiner als ..." v-model="item.avancedSearchTerm"></v-text-field>
      <v-text-field autofocus ref="focus" label="Größer als" v-model="item.avancedSearchTerm"></v-text-field>
      <v-layout>
        <v-flex>
          <v-text-field autofocus ref="focus" label="Start" v-model="item.avancedSearchTerm"></v-text-field>
        </v-flex>
        <v-flex>
          <v-text-field autofocus ref="focus" label="Ende" v-model="item.avancedSearchTerm"></v-text-field>
        </v-flex>
      </v-layout>
      <p class="caption"> {{item.style}} Verknüpfe die Suche in der Spalte "{{item.text}}" mit Suchen aus anderen Spalten.</p>
    </v-card-text>
  </v-card> -->
</template>

<script>
export default {
  props: ['item'],
  data: function () {
    return {
      selected: null,
      searchStr: null,
      searchStr1: null,
      searchStr2: null,
      searchStr3: null,
      searchStr4: null
    }
  }
}
</script>

<style lang="scss">
// .list_action {
//   margin-left: 40px !important;
// }
// .v-list__tile__content {
//   flex: 0 1 auto !important;
// }
</style>
