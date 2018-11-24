<template lang="html">

  <v-list>
    <v-radio-group v-model="selected">

      <!-- default -->
      <v-list-tile>
      <v-list-tile-content>
          <v-radio value="$eq">
            <div slot="label">Datum</div>
          </v-radio>
        </v-list-tile-content>
        <v-list-tile-action class="list_action">
          <v-menu ref="normMenuVisible"
            :close-on-content-click="false"
            v-model="normMenuVisible"
            :return-value.sync="normMenuVisible"
            lazy transition="scale-transition"
            offset-y
            full-width
            min-width="290px">
            <!-- <v-text-field single-line slot="activator" v-model="normDate" label="Default" prepend-icon="event" readonly></v-text-field>
            <v-date-picker no-title v-model="normDate" @input="$refs.lower.save(normDate)" show-current="false"></v-date-picker> -->
            <v-text-field
              slot="activator"
              :value="normDate"
              clearable
              label="Formatted with datefns"
              readonly></v-text-field>
              <v-date-picker no-title v-model="normDate" @input="$refs.lower.save(normDate)" show-current="false"></v-date-picker>
          </v-menu>
        </v-list-tile-action>
      </v-list-tile>

      <!-- lower -->
      <v-list-tile>
        <v-list-tile-content>
            <v-radio value="$lt">
              <div slot="label">Kleiner als</div>
            </v-radio>
          </v-list-tile-content>
          <v-list-tile-action class="list_action">
            <v-menu ref="lower" :close-on-content-click="false" v-model="lower" :return-value.sync="lower" lazy transition="scale-transition" offset-y full-width min-width="290px">
              <v-text-field single-line slot="activator" v-model="lowerDate" label="Start" prepend-icon="event" readonly></v-text-field>
              <v-date-picker no-title v-model="lowerDate" @input="$refs.lower.save(lowerDate)" show-current="false"></v-date-picker>
            </v-menu>
        </v-list-tile-action>
      </v-list-tile>

      <!-- greater -->
      <v-list-tile>
        <v-list-tile-content>
          <v-radio value="$gt">
            <div slot="label">Größer als </div>
          </v-radio>
        </v-list-tile-content>
        <v-list-tile-action class="list_action">
          <v-menu ref="greater" :close-on-content-click="false" v-model="greater" :return-value.sync="lower" lazy transition="scale-transition" offset-y full-width min-width="290px">
            <v-text-field single-line slot="activator" v-model="greaterDate" label="Start" prepend-icon="event" readonly></v-text-field>
            <v-date-picker no-title v-model="greaterDate" @input="$refs.greater.save(biggerDate)" show-current="false"></v-date-picker>
          </v-menu>
        </v-list-tile-action>
      </v-list-tile>

      <v-layout>
        <v-flex>
          <v-btn flat small primary @click="applyFilter()">Aktualisieren</v-btn>
          <!-- <v-btn flat small>Schließen</v-btn> -->
        </v-flex>
      </v-layout>

    </v-radio-group>
  </v-list>

</template>

<script>
export default {
  // current item is the advancedSearchItem
  props: ['item'],
  data: function () {
    return {
      localItem: this.item,
      date: null,
      selected: null,
      normMenuVisible: null,
      lower: null,
      greater: null,
      normDate: '',
      lowerDate: '',
      greaterDate: ''
    }
  },
  mounted () {
    this.defineChipText()
  },
  watch: {
    selected (newValue) {
      this.defineChipText(newValue)
    }
  },
  methods: {
    applyFilter () {
      this.$emit('itemUpdate', this.localItem)
    },
    /**
     * updated item object with some Information from the chipmenu
     * returned item to the parrent
     * @param selectedKey string
     */
    defineChipText (selectedKey) {
      let key = Object.keys(this.localItem.advancedSearchItem)[0]
      let value = this.localItem.advancedSearchItem[key]
      if (selectedKey) {
        key = selectedKey
      } else {
        this.selected = key
      }
      this.normDate = null
      this.lowerDate = null
      this.greaterDate = null
      switch (key) {
        case '$eq':
          this.localItem.chipText = ''
          this.normDate = value
          break
        case '$lt':
          this.localItem.chipText = 'kleiner als'
          this.lowerDate = value
          break
        case '$gt':
          this.localItem.chipText = 'größer als'
          this.greaterDate = value
          break
      }
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
