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
              readonly></v-text-field>
              <v-date-picker no-title v-model="normDate" @input="$refs.normMenuVisible.save(normDate)" show-current="false"></v-date-picker>
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
            <v-menu ref="lowerMenuVisible"
              :close-on-content-click="false"
              v-model="lowerMenuVisible"
              :return-value.sync="lowerMenuVisible"
              lazy transition="scale-transition"
              offset-y full-width
              min-width="290px">
              <v-text-field
                slot="activator"
                :value="lowerDate"
                readonly></v-text-field>
                <v-date-picker no-title v-model="lowerDate" @input="$refs.lowerMenuVisible.save(lowerDate)" show-current="false"></v-date-picker>
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
          <v-menu ref="lowerMenuVisible"
            :close-on-content-click="false"
            v-model="greaterMenuVisible"
            :return-value.sync="greaterMenuVisible"
            lazy transition="scale-transition"
            offset-y full-width
            min-width="290px">
            <v-text-field
              slot="activator"
              :value="greaterDate"
              readonly></v-text-field>
              <v-date-picker no-title v-model="greaterDate" @input="$refs.greaterMenuVisible.save(greaterDate)" show-current="false"></v-date-picker>
          </v-menu>
        </v-list-tile-action>
      </v-list-tile>

        <div class="pt-3">
          <v-btn flat small primary @click="applyFilter()">Aktualisieren</v-btn>
          <!-- <v-btn flat small>Schließen</v-btn> -->
        </div>

    </v-radio-group>
  </v-list>

</template>

<script>
export default {
  // current item is the advancedSearchItem
  props: ['item'],
  data: function () {
    return {
      date: null,
      normMenuVisible: null,
      lowerMenuVisible: null,
      greaterMenuVisible: null,
      normDate: '',
      lowerDate: '',
      greaterDate: ''
    }
  },
  computed: {
    localItem: {
      get: function () {
        let obj = this.item
        obj.myKey = Object.keys(this.item.searchValue)[0]
        obj.myValue = this.item.searchValue[obj.myKey]
        return obj
      },
      set: function () {
        console.log('set localItem');
      }
    },
    selected: {
      get: function () {
        return this.localItem.myKey
      },
      set: function (newKey) {
        this.localItem.myKey = newKey
        this.setChipText(this.localItem.myKey, this.localItem.myValue)
      }
    }
  },
  mounted () {
    this.defineInitChip()
    this.applyFilter()
  },
  watch: {
    // selected (newValue, oldValue) {
    //   console.log('new selected', newValue);
    //   this.defineChipText(newValue, oldValue)
    // },
    // normDate (newValue) {
    //   this.localItem.searchValue.$gt = null
    //   this.localItem.searchValue.$lt = null
    //   this.localItem.searchValue.$eq = newValue
    // }
  },
  methods: {
    applyFilter () {
      this.localItem.searchValue = null
      console.log('local', this.localItem);
      this.$emit('itemUpdate', this.localItem)
    },
    /**
     * updated item object with some Information from the chipmenu
     * returned item to the parrent
     * @param selectedKey string
     */
    defineInitChip () {
      let key = Object.keys(this.localItem.searchValue)[0]
      let value = this.localItem.searchValue[key]
      this.setChipText(key, value)
    },
    setChipText (key, value) {
      this.normDate = null
      this.lowerDate = null
      this.greaterDate = null

      switch(key) {
        case '$eq':
          this.localItem.chipText = ''
          this.normDate = value
          break
        case '$lt':
          this.localItem.chipText = 'lower as'
          this.lowerDate = value
          break
        case '$gt':
          this.localItem.chipText = 'greater as'
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
