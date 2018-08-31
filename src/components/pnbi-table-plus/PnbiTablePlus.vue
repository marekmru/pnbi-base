<template>

  <div class="pnbi-datatable">

    <v-toolbar flat color="white" class="pnbi-datatable__toolbar pb-1 pt-2">
      <v-menu origin="center center" :close-on-content-click="false" transition="v-scale-transition" bottom>
        <v-btn primary light slot="activator">Columns</v-btn>
        <v-list>
          <v-list-tile v-for="header in $attrs.headers" :key="header.text">
            <v-list-tile-title>
              <v-checkbox :label="header.text" v-model="header.selected" :value="header.selected"></v-checkbox>
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-data-table v-if="myattrs" v-bind="myattrs" :headers="filteredHeaders">
      <template slot="items" slot-scope="props">
        <slot name="row" :props="props"></slot>
      </template>
    </v-data-table>
  </div>

</template>

<script>

export default {
  name: 'PnbiDatatablePlus',
  props: {},
  created () {},
  mounted () {
    this.filterColumns(this.myattrs.headers)
  },
  watch: {
    myattrs: {
      handler: function (val, oldVal) {
        this.filterColumns(val.headers)
      },
      deep: true
    }
  },
  computed: {
    myattrs () {
      let temp = JSON.parse(JSON.stringify(this.$attrs))
      temp = this.settingAttrs(temp)
      return temp
    }
  },
  data () {
    return {
      filteredHeaders: []
    }
  },
  methods: {
    settingAttrs (temp) {
      temp.headers = temp.headers.map(lh => {
        lh.selected = lh.selected
        return lh
      })
      return temp
    },
    filterColumns (headers) {
      this.filteredHeaders = this.myattrs.headers.filter(h => h.selected)
      const tbody = this.$el.querySelector('tbody')
      // run over headers
      headers.map(function (h, index) {
        index++
        // get columns that should be filtered
        const cols = tbody.querySelectorAll(`tr td:nth-child(${index})`)
        // toggle columns
        cols.forEach(c => {
          if (h.selected !== true) {
            c.style.display = 'none'
          } else {
            c.style.display = 'table-cell'
          }
        })
      })
    }
  }
}
</script>
