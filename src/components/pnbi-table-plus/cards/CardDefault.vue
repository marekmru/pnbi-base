<template lang="html">
  <v-card>
    <v-card-text>
      <v-text-field
        autofocus
        ref="focus"
        label="Enthält ..."
        :value="localItem.searchValue.$in"
        @input="handleInput($event)">
      </v-text-field>
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
      internalLocalItem: null
    }
  },
  computed: {
    localItem: {
      get: function () {
        if (this.internalLocalItem === null) {
          return this.item
        } else {
          return this.internalLocalItem
        }
      },
      set: function (item) {
        console.log('set localitem', item, this.internalLocalItem);
        this.internalLocalItem = this.localItem
      }
    }
  },
  methods: {
    handleInput(val) {
      this.localItem = Object.assign(this.localItem, {searchValue:{"$in":val}})
    },
    applyFilter () {
      console.log('apply', this.internalLocalItem);
      this.$emit('itemUpdate', this.internalLocalItem)
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
