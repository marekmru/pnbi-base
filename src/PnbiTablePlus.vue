<template>

  <div class="pnbi-datatable">

    <v-toolbar flat color="white" class="pnbi-datatable__toolbar pb-1 pt-2">
      <v-menu
        origin="center center"
        :close-on-content-click="false"
        transition="v-scale-transition"
        bottom>
        <v-btn primary light slot="activator">Columns</v-btn>
        <v-list>
          <v-list-tile v-if="computedHeaders" v-for="header in computedHeaders" :key="header.text">
            <v-list-tile-title>
              <v-checkbox :label="header.text" v-model="header.selected" :value="header.selected" ></v-checkbox>
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
  name: 'pnbi-datatable-plus',
  props: {},
  created () {
    this.computedHeaders = this.myattrs.headers
    // this.computedHeaders.forEach((h, index) => {
    //   if (index === 1) {
    //     this.computedHeaders[index].selected = true
    //   }
    // })
    // this.read()
    // this.computedHeaders = this.computedHeaders
    const temp = JSON.parse(localStorage.getItem('headers'))
    console.log('read', temp)
    if (temp) {
      this.computedHeaders = temp
      this.myattrs.headers = temp
    } else {
      this.computedHeaders.forEach((h, index) => {
        this.computedHeaders[index].selected = true
      })
    }
  },
  mounted () {
    // this.filterColumns(this.myattrs.headers)
  },
  watch: {
    computedHeaders: {
      handler: function (val, oldVal) {
        this.save()
        this.filterColumns(val)
      },
      deep: true
    }
  },
  computed: {
    filteredHeaders () {
      return this.myattrs.headers.filter(h => h.selected)
    },
    myattrs () {
      let temp = JSON.parse(JSON.stringify(this.$attrs))
      temp = this.settingAttrs(temp)
      return temp
    }
  },
  data () {
    return {
      computedHeaders: []
    }
  },
  methods: {
    save () {
      console.log('save')
      localStorage.setItem('headers', JSON.stringify(this.computedHeaders))
    },
    read () {
      const temp = JSON.parse(localStorage.getItem('headers'))
      console.log('read', temp)
      if (temp) {
        this.computedHeaders = temp
        this.computedHeaders = this.computedHeaders
      }
    },
    headerChanged (index) {
      this.computedHeaders[index].selected = !this.computedHeaders[index].selected
      this.computedHeaders = this.computedHeaders
      console.log(index, this.computedHeaders)
    },
    settingAttrs (temp) {
      temp.headers = temp.headers.map(lh => {
        lh.selected = lh.selected
        return lh
      })
      return temp
    },
    filterColumns (headers) {
      console.log('-', headers, this.computedHeaders)
      // this.computedHeaders = this.computedHeaders.map((h, i) => {
      //   if (i === 1) {
      //     h.selected = true
      //   }
      //   return h
      // })
      // this.filteredHeaders = this.myattrs.headers.filter(h => h.selected)
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

<style lang="scss" scoped>
</style>
