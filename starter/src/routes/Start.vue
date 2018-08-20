<template>
  <pnbi-page header-type="2" large>
    <div slot="page-header-content">
      <h2 class="headline white--text">Information abut current item</h2>
      <ul class="white--text">
        <li>KPI 1</li>
        <li>KPI 2</li>
      </ul>
    </div>
    <pnbi-card :headline="$route.meta.title">
      <div slot="primary-controls">
        primary-controls
      </div>
      <div>
        default slot<br>
        <a href="https://github.com/marekmru/pnbi-base/blob/candidate/README.md" target="_blank">pnbi-base readme</a>
      </div>
    </pnbi-card>

  </pnbi-page>
</template>
<script>

export default {
  mounted () {
  },
  props: {
    propName: {
      type: Number,
      default: 0
    }
  },
  components: {},
  computed: {
    name () {
      return 'test'
    }
  },
  data: () => {
    return {}
  },
  methods: {},
  beforeDestroy () {
  }
}
</script>
<style lang="css" scoped></style>
