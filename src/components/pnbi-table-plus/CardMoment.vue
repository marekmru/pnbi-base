<template lang="html">

  <v-list>
    <v-radio-group v-model="selected">
      <v-list-tile>
        <v-list-tile-content>
            <v-radio value="smaller">
              <div slot="label">Kleiner als</div>
            </v-radio>
          </v-list-tile-content>
          <v-list-tile-action class="list_action">
            <v-menu ref="startMenu" :close-on-content-click="false" v-model="startMenu" :return-value.sync="startDate" lazy transition="scale-transition" offset-y full-width min-width="290px">
              <v-text-field single-line slot="activator" v-model="startDate" label="Start" prepend-icon="event" readonly></v-text-field>
              <v-date-picker no-title v-model="startDate" @input="$refs.startMenu.save(startDate)" show-current="false"></v-date-picker>
            </v-menu>
        </v-list-tile-action>
      </v-list-tile>

      <v-list-tile>
        <v-list-tile-content>
          <v-radio value="bigger">
            <div slot="label">Größer als </div>
          </v-radio>
        </v-list-tile-content>
        <v-list-tile-action class="list_action">
          <v-menu ref="startMenu" :close-on-content-click="false" v-model="startMenu" :return-value.sync="startDate" lazy transition="scale-transition" offset-y full-width min-width="290px">
            <v-text-field single-line slot="activator" v-model="startDate" label="Start" prepend-icon="event" readonly></v-text-field>
            <v-date-picker no-title v-model="startDate" @input="$refs.startMenu.save(startDate)" show-current="false"></v-date-picker>
          </v-menu>
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
      date: null,
      selected: null,
      startMenu: false,
      startDate: null
    }
  }
}
</script>

<style>
.list_action {
  margin-left: 40px !important;
}
.v-menu__content {
  margin-top: 8px;
}
</style>
