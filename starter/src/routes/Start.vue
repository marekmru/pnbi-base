<template>
  <pnbi-page header-type="2" large>
    <div slot="page-header-content">
      <h2 class="headline white--text">Information about current item</h2>
      <ul class="white--text">
        <li>KPI 1</li>
        <li>KPI 2</li>
      </ul>
    </div>

    <pnbi-datatable headline="Datatable plus" @search="request.search = $event" :button-label="false" customize-label="Customize">

      <!-- primary controls-->

      <!-- secondary slot -->

      <!-- default slot -->

      <pnbi-datatable-plus
        v-if="items.length > 2"
        :items="items" :headers="headers"
        tableIdentifier="123"
        :loading="loading"
        :total-items="totalItems"
        :search="request.search"
        @paginationEvent="onPaginationEvent"
        dialog-title="Tabele anpassen"
        dialog-subtitle="Wähle Spalten, die angezeigt werden sollen"
        dialog-closelabel="Schließen">
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
      request: {
        pagination: {},
        search: null
      },
      newBudget: null,
      projectName: null,
      headers: []
    }
  },
  methods: {
    onPaginationEvent (data, event) {
      this.request.pagination = data
      this.getDataFromApi()
        .then(data => {
          console.log('data', data)
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
            name: 'abc' + Math.random(),
            age: Math.random() * Math.random(),
            value: 1012349,
            value1: 1,
            value2: 2,
            value3: 3,
            value4: 4,
            value5: 5,
            value6: 6,
            value7: 7,
            value8: 8
          })
        }

        const { sortBy, descending, page, rowsPerPage } = this.request.pagination

        // BE search
        if (this.request.search) {
          items = items.filter(i => {
            return i.age === parseInt(this.request.search)
          })
        } else {
          this.request.search = null
        }

        const totalItems = items.length

        // BE sorting
        if (this.request.pagination.sortBy && items.length > 1) {
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
          { text: 'Age', value: 'age' },
          { text: 'Value', value: 'value', format: '00000' }
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
