<template>
  <pnbi-page header-type="2" large>
    <div slot="page-header-content">
      <h2 class="headline white--text">Information about current item</h2>
      <ul class="white--text">
        <li>KPI 1</li>
        <li>KPI 2</li>
      </ul>
    </div>

    <pnbi-datatable headline="Headline" @search="request.search = $event">

      <div slot="primary-controls ">
        fff
      </div>

      <!-- secondary slot -->

      <!-- default slot -->
        <pnbi-datatable-plus
          :items="items" :headers="headers" tableIdentifier="123" fixed-headers
          :loading="loading" :total-items="totalItems" :search="request.search" @padinationEvent="onPaginationEvent">
          <tr slot="row" slot-scope="props">
            <td>{{props.props.item.name}}</td>
            <td>{{props.props.item.age}}</td>
            <td>{{props.props.item.value}}</td>
          </tr>
        </pnbi-datatable-plus>

    </pnbi-datatable>

  </pnbi-page>
</template>
<script>

export default {
  mounted () {
    this.getDataFromApi()
      .then(data => {
        this.items = data.items
        this.totalItems = data.totalItems
      })
  },
  props: {
    propName: {
      type: Number,
      default: 0
    }
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
      headers: [
        {text: 'Name 2', value: 'name'},
        {text: 'Age', value: 'age'},
        {text: 'Value', value: 'value'}
      ]
    }
  },
  methods: {
    onPaginationEvent (data, event) {
      this.request.pagination = data
      this.getDataFromApi()
        .then(data => {
          this.items = data.items
          this.totalItems = data.totalItems
        })
    },
    getDataFromApi () {
      this.loading = true
      return new Promise((resolve, reject) => {
        let items = [
          {name: 'ab', age: 1, value: 10},
          {name: 'abc', age: 2, value: 11},
          {name: 'abcd', age: 3, value: 5},
          {name: 'abcd', age: 4, value: 5},
          {name: 'abcd', age: 5, value: 5},
          {name: 'abcd', age: 6, value: 5},
          {name: 'abcd', age: 7, value: 5},
          {name: 'abcd', age: 8, value: 5},
          {name: 'abcd', age: 9, value: 5},
          {name: 'abcd', age: 10, value: 5},
          {name: 'abcd', age: 11, value: 5},
          {name: 'abcd', age: 12, value: 5},
          {name: 'abcd', age: 13, value: 5},
          {name: 'abcd', age: 14, value: 5},
          {name: 'abcd', age: 15, value: 5},
          {name: 'abcd', age: 16, value: 5},
          {name: 'abcd', age: 17, value: 5},
          {name: 'abcd', age: 18, value: 5},
          {name: 'abcd', age: 19, value: 5},
          {name: 'abcd', age: 20, value: 5}
        ]
        while (items.length < 300) {
          items.push({
            name: 'abc' + Math.random(),
            age: Math.random() * Math.random(),
            value: 56
          })
        }
        const { sortBy, descending, page, rowsPerPage } = this.request.pagination

        // BE search
        if (this.request.search) {
          console.log('this.request.search', this.request.search)
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

        setTimeout(() => {
          this.loading = false
          resolve({
            items,
            totalItems
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
