<template>
  <pnbi-page header-type="2" large>
    <div slot="page-header-content">
      <h2 class="headline white--text">Information about current item</h2>
      <ul class="white--text">
        <li>KPI 1</li>
        <li>KPI 2</li>
      </ul>
    </div>

    <pnbi-datatable headline="Headline">
      <!-- secondary slot -->
      <!-- default slot -->
      <pnbi-datatable-plus
          :items="items" :headers="headers" :loading="loading" table-identifier="123" :total-items="totalItems"
          @padinationEvent="pagination_test" fixed-header fixed-footer
          :rows-per-page-items="[10,25,50, {'text':'Alle','value':-1}]" rows-per-page-text="Elemente pro Seite">
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
  watch: {
    pagination: {
      handler () {
        this.getDataFromApi()
          .then(data => {
            this.items = data.items
            this.totalItems = data.totalItems
          })
      },
      deep: true
    }
  },
  computed: {
    name () {
      return 'test'
    }
  },
  data: () => {
    return {
      items: [],
      totalItems: 0,
      loading: true,
      pagination: {},
      headers: [
        {text: 'Name 2', value: 'name'},
        {text: 'Age', value: 'age'},
        {text: 'Value', value: 'value'}
      ]
    }
  },
  methods: {
    pagination_test (data, event) {
      console.log('pagi', data)
      this.pagination = data
    },
    getDataFromApi: function () {
      this.loading = true
      return new Promise((resolve, reject) => {
        let items = [
          {name: 'ab', age: '1', value: 10},
          {name: 'abc', age: '2', value: 11},
          {name: 'abcd', age: '3', value: 5},
          {name: 'abcde', age: '4', value: 5},
          {name: 'abcdef', age: '5', value: 5},
          {name: 'abcdefg', age: '6', value: 5},
          {name: 'abcdefgh', age: '7', value: 5},
          {name: 'abcdefghi', age: '8', value: 5},
          {name: 'abcdefghij', age: '9', value: 5},
          {name: 'abcdefghijk', age: '10', value: 5},
          {name: 'abcdefgh', age: '11', value: 5},
          {name: 'abcdefgh', age: '12', value: 5},
          {name: 'abcdefgh', age: '13', value: 5},
          {name: 'abcdefgh', age: '14', value: 5},
          {name: 'abcdefgh', age: '15', value: 5},
          {name: 'abcdefgh', age: '16', value: 5},
          {name: 'abcdefgh', age: '17', value: 5},
          {name: 'abcdefgh', age: '18', value: 5},
          {name: 'abcdefgh', age: '19', value: 5},
          {name: 'abcdefgh', age: '20', value: 5}
        ]
        while (items.length < 300) {
          items.push({
            name: 'abc' + Math.random(),
            age: Math.random() * Math.random(),
            value: 56
          })
        }

        const totalItems = items.length
        const {page, rowsPerPage} = this.pagination
        // console.log('rowsPerPage', rowsPerPage)

        // BE magic
        if (rowsPerPage > 0) {
          items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
        }
        // console.log('items', items)

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
