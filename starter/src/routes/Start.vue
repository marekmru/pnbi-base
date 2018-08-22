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
        <pnbi-datatable-plus :items="items" :headers="headers">
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
  },
  props: {
    propName: {
      type: Number,
      default: 0
    }
  },
  computed: {
    name () {
      return 'test'
    }
  },
  data: () => {
    return {
      headers: [
        {text: 'Name', value: 'name', selected: false},
        {text: 'Age', value: 'age', selected: true},
        {text: 'Value', value: 'value', selected: true}
      ],
      items: [
        {name: 'ab', age: '1', value: 10},
        {name: 'abc', age: '2', value: 11},
        {name: 'abcd', age: '3', value: 5}
      ]
    }
  },
  beforeDestroy () {
  }
}
</script>
<style lang="css" scoped></style>
