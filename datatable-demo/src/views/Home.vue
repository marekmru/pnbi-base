<template>
  <pnbi-page header-type="2" large>
    <div slot="page-header-content">
      <h3 class="subtitle pt-5 white--text">Pageheader Contains information about content displayed on the page. Important kpis or filter elements.</h3>
    </div>

    <pnbi-datatable headline="Datatable plus"
      @search="search = $event"
      :button-label="false"
      customize-label="Columns"
      extend-search="Advanced">
      <pnbi-datatable-plus
        v-if="items.length"
        :items="items" :headers="headers"
        tableIdentifier="123"
        :loading="loading"
        :total-items="totalItems"
        :search="search"
        :pagination.sync="pagination"
        dialog-title="Tabele anpassen"
        dialog-subtitle="Wähle Spalten, die angezeigt werden sollen"
        dialog-closelabel="Schließen"
        dialog-selectalllabel="Alle auswählen"
        dialog-searchlabel="Nach Spalten suchen"
        @updateSearchQuery="onSeachQueryUpdate">
      </pnbi-datatable-plus>

      <pnbi-empty v-else text="No data available"></pnbi-empty>

    </pnbi-datatable>

  </pnbi-page>
</template>

<script>
// @ is an alias to /src

import moment from 'moment'
import EventBus from 'pnbi-base/src/event-bus'
export default {
  mounted () {
    EventBus.$on('filterUpdate', this.onFilterUpdate)
    this.getDataFromApi()
      .then(data => {
        this.items = data.tableResponce.items
        this.headers = data.tableResponce.headers
        this.totalItems = data.tableResponce.totalItems
      })
  },
  components: {},
  data: () => {
    return {
      items: [],
      totalItems: 0,
      loading: true,
      pagination: {
        page: 1,
        rowsPerPage: 10,
        descending: false,
        sortBy: ''
      },
      search: null,
      newBudget: null,
      projectName: null,
      headers: []
    }
  },
  computed: {
    computedFilters: function () {
      const obj = this.headers.filter(item => {
        if (item.selectedForSearch) {
          return item.searchValue
        }
      })
      return obj
    }
  },
  watch: {
    pagination: function () {
      this.onPaginationEvent()
    }
  },
  methods: {
    // Update filter with this event
    onFilterUpdate (items) {
      this.headers = items
      this.getDataFromApi()
        .then(data => {
          this.items = data.tableResponce.items
          this.headers = data.tableResponce.headers
          this.totalItems = data.tableResponce.totalItems
        })
      // console.log('filter event', this.headers.filter(item => item.searchValue))
    },
    onSeachQueryUpdate (query) {
      // TODO update items
    },
    onPaginationEvent (data, event) {
      this.getDataFromApi()
        .then(data => {
          this.items = data.tableResponce.items
          this.headers = data.tableResponce.headers
          this.totalItems = data.tableResponce.totalItems
        })
    },
    getDataFromApi () {
      this.loading = true
      return new Promise((resolve, reject) => {
        let tableResponce = {}
        let items = []
        while (items.length < 300) {
          items.push({
            name: 'abc123',
            age: Math.floor(Math.random() * 10000) + 1,
            price: 1212349.55,
            value1: 0.33555,
            value2: 'Lorem ipsum dolor sit amet',
            value3: 445566555.778999553,
            value4: Math.floor(Math.random() * 5000) + 1,
            value5: '2018-10-04T00:00:00',
            value6: '2018-10-04T00:00:00',
            value7: 7,
            value8: 8
          })
        }

        const { sortBy, descending, page, rowsPerPage } = this.pagination
        const totalItems = items.length

        console.log('API Request', this.pagination, this.computedFilters)

        // BE sorting
        if (this.pagination.sortBy && items.length > 1) {
          items = items.sort((a, b) => {
            const sortA = a[sortBy]
            const sortB = b[sortBy]

            if (descending) {
              if (sortA < sortB) return 1
              if (sortA > sortB) return -1
              return 0
            } else {
              if (sortA < sortB) return -1
              if (sortA > sortB) return 1
              return 0
            }
          })
        }

        // BE paging
        if (rowsPerPage > 0 && items.length > 1) {
          items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
        }

        // collect data
        tableResponce.items = items
        // tableResponce.items = []
        tableResponce.totalItems = totalItems
        tableResponce.headers = [
          { text: 'Name', value: 'name', required: true, default: { '$in': 'alex' } },
          { text: 'numbro 2', value: 'age', style: 'numbro.js', format: '0,0', default: { '$eq': 100 } },
          { text: 'currency', value: 'price', format: '0,0.00', style: 'numbro.js' },
          { text: 'Percent', value: 'value1', format: '0.0%', style: 'numbro.js' },
          { text: 'String', value: 'value2', format: 'DD/MM/YYYY', style: 'moment.js', required: true, default: { '$lt': moment().add(7, 'days').format('YYYY-MM-DD') } },
          { text: 'Value 3', value: 'value3', format: '6 a', style: 'numbro.js' },
          { text: 'just number', value: 'value4' },
          { text: 'no format & moment', value: 'value5', style: 'moment.js' },
          { text: 'moment', value: 'momentjs', format: 'DD/MM/YYYY', style: 'moment.js' }
        ]

        setTimeout(() => {
          this.loading = false
          resolve({
            tableResponce
          })
        }, 1000)
      })
    }
  },
  beforeDestroy () {
  }
}
</script>
<style lang="css" scoped></style>
