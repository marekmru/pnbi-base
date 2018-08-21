<template>
  <pnbi-page header-type="2" large>
    <div slot="page-header-content">
      <h2 class="headline white--text">Information about current item</h2>
      <ul class="white--text">
        <li>KPI 1</li>
        <li>KPI 2</li>
      </ul>
    </div>

    <pnbi-card headline="Pagename"  >
      <!-- Optional Slot-->
      <div slot="primary-controls"></div>
      <!-- Default Slot-->
      <div>Any Content can be placed here with any tag</div>
      <!-- Optional Slot-->
      <div slot="card-actions"></div>
    </pnbi-card>

  </pnbi-page>
</template>
<script>
import config from '@/api/config'

import PnbiTable from 'pnbi-base/src'
export default {
  components: {PnbiTable},
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
    },
    filteredHeaders () {
      return this.headers.filter(h => h.selected)
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
  methods: {

    show (col) {
      return this.headers.find(h => h.value === col).selected
    }
  },
  beforeDestroy () {
  }
}
</script>
<style lang="css" scoped></style>
