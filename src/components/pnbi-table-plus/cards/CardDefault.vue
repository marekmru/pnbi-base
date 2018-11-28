<template lang="html">
  <v-card>
    <v-card-text>
      <v-text-field autofocus ref="focus" label="Enthält ..." v-model="localItem.searchValue.$in"></v-text-field>
      <!-- <p class="caption">Verknüpfe die Suche in der Spalte "{{item.text}}" mit Suchen aus anderen Spalten.</p> -->
    </v-card-text>
    <v-card-actions>
      <v-btn flat small primary @click="applyFilter">Aktualisieren</v-btn>
      <!-- <v-btn flat small>Schließen</v-btn> -->
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  // current item is the advancedSearchItem
  props: ['item'],
  data: function () {
    return {
      localItem: this.item
    }
  },
  mounted () {
    console.log(this.localItem);
    //this.localItem.chipText = this.localItem.value
  },
  methods: {
    applyFilter () {
      this.$emit('itemUpdate', this.localItem)
    }
  }
}
</script>

<style>
.custom-list {
  padding: 16px;
}
.list_action {
  margin-left: 40px !important;
}
.v-menu__content {
  margin-top: 8px;
}
</style>
