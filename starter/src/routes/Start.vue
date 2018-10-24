<template>
  <pnbi-page header-type="2" large>
    <div slot="page-header-content">
      <h2 class="headline white--text">Information about current item</h2>
      <ul class="white--text">
        <li>KPI 1</li>
        <li>KPI 2 2</li>
      </ul>
    </div>

    <pnbi-datatable headline="Datatable plus"
      @search="search = $event" :button-label="false"
      customize-label="Customize"
      :uppercase-labels="true">

      <!-- primary controls-->

      <!-- secondary slot -->

      <!-- default slot -->

      <pnbi-datatable-plus
        v-if="items.length > 2"
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
        dialog-searchlabel="Suche">
      </pnbi-datatable-plus>

    </pnbi-datatable>

  </pnbi-page>
</template>
<script>
import { Validator } from 'vee-validate'

const dictionary = {
  en: {
    messages: {
      alpha: () => 'Some English Message'
    }
  },
  ar: {
    messages: {
      alpha: 'حاجة عربي'
    }
  }
}

// Override and merge the dictionaries
Validator.localize(dictionary)

const validator = new Validator({ first_name: 'alpha' })

validator.localize('ar') // now this validator will generate messages in Arabic.

export default {
  mounted () {
    this.getDataFromApi()
      .then(data => {
        console.log('data-c', data)
        this.items = data.tableResponce.items
        this.headers = data.tableResponce.headers
        this.totalItems = data.tableResponce.totalItems
      })
  },
  components: {
  },
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
  watch: {
    pagination: function () {
      this.onPaginationEvent()
    }
  },
  methods: {
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
        tableResponce.totalItems = totalItems
        tableResponce.headers = [
          { text: 'Name', value: 'name' },
          { text: 'numbro 2', value: 'age', style: 'numbro.js', format: '0,0' },
          { text: 'currency €', value: 'price', format: '0,0.00', style: 'numbro.js' },
          { text: 'Percent', value: 'value1', format: '0.0%', style: 'numbro.js' },
          { text: 'String', value: 'value2' },
          { text: 'Value 3', value: 'value3', format: '6 a', style: 'numbro.js' },
          { text: 'just number', value: 'value4' },
          { text: 'no format & moment', value: 'value5', style: 'moment.js' },
          { text: 'format  & moment', value: 'value6', format: 'DD/MM/YYYY', style: 'moment.js' }
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
