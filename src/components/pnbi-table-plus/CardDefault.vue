<template lang="html">
  <v-card>
    <v-card-text>
      <v-text-field autofocus ref="focus" label="Enthält ..." v-model="searchItem"></v-text-field>
      <!-- <p class="caption">Verknüpfe die Suche in der Spalte "{{item.text}}" mit Suchen aus anderen Spalten.</p> -->
    </v-card-text>
    <v-card-actions>
      <v-btn flat small primary>Aktualisieren</v-btn>
      <v-btn flat small>Schließen</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['item'],
  computed: {
    searchItem: {
      get () {
        let key = Object.keys(this.item.advancedSearchItem)
        return this.item.advancedSearchItem[key]
      },
      set (newValue) {
        let key = Object.keys(this.item.advancedSearchItem)
        this.item.advancedSearchItem[key] = newValue
      }
    }
  }
}
</script>

<style lang="css">
</style>
