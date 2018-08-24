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
          :items="items" :headers="headers" :loading="loading"               tableIdentifier="123" :total-items="totalItems" @padinationEvent="pagination_test">
          <tr slot="row" slot-scope="props">
            <td>{{props.props.item.name}}</td>
            <td>{{props.props.item.age}}</td>
            <td>{{props.props.item.value}}</td>
          </tr>
        </pnbi-datatable-plus>

        <!-- <v-data-table :headers="filteredHeaders"
        :items="items"
        :rows-per-page-items="[10,25,50, {'text':'Alle','value':-1}]" rows-per-page-text="Elemente pro Seite"
        :loading="!items" class="mytable">
        <template slot="items" slot-scope="props">
          <td v-if="show('name')">{{props.item.name}}</td>
          <td v-if="show('age')">{{props.item.age}}</td>
          <td v-if="show('value')">{{props.item.value}}</td>
        </template>
        </v-data-table> -->

    </pnbi-datatable>

  </pnbi-page>
</template>
<script>
import config from '@/api/config'
// import TablePlusMixin from 'pnbi-base/src/internal/TablePlusMixin'
// import {PnbiTable, PnbiTablePlus} from 'pnbi-base/src'
export default {
  // mixins: [TablePlusMixin],
  mounted () {
    console.log(config)
    this.getDataFromApi()
      .then(data => {
        console.log('data', data)
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
        console.log('getdata')
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
    getDataFromApi () {
      this.loading = true
      return new Promise((resolve, reject) => {
        let items = [
          {name: 'ab', age: '1', value: 10},
          {name: 'abc', age: '2', value: 11},
          {name: 'abcd', age: '3', value: 5},
          {name: 'abcd', age: '4', value: 5},
          {name: 'abcd', age: '5', value: 5},
          {name: 'abcd', age: '6', value: 5},
          {name: 'abcd', age: '7', value: 5},
          {name: 'abcd', age: '8', value: 5},
          {name: 'abcd', age: '9', value: 5},
          {name: 'abcd', age: '10', value: 5},
          {name: 'abcd', age: '11', value: 5},
          {name: 'abcd', age: '12', value: 5},
          {name: 'abcd', age: '13', value: 5},
          {name: 'abcd', age: '14', value: 5},
          {name: 'abcd', age: '15', value: 5},
          {name: 'abcd', age: '16', value: 5},
          {name: 'abcd', age: '17', value: 5},
          {name: 'abcd', age: '18', value: 5},
          {name: 'abcd', age: '19', value: 5},
          {name: 'abcd', age: '20', value: 5}
        ]

        const totalItems = items.length
        const { page, rowsPerPage } = this.pagination
        console.log('rowsPerPage', rowsPerPage)

        // BE magic
        if (rowsPerPage > 0) {
          items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
        }
        console.log('items', items)

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
