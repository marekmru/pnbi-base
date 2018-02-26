<template>
  <v-app>
    <v-content>
      <pnbi-navbar></pnbi-navbar>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  mounted () {
    this.$store.dispatch('loadConfig')
    this.$store.subscribe((mutation, state) => {
      if (mutation.type.includes('_persist')) {
        this.$store.dispatch('$persist')
      }
    })
  },
  data () {
    return {
      title: 'TODO'
    }
  },
  name: 'App'
}
</script>
<style lang="scss">
.bc-page-title {
  display: block;
  font-size: 26px;
  font-weight: 800;
  margin-bottom: 16px;
  margin-top: 0;
  text-transform: uppercase;
}
 .bc-small-icon {
  transform: scale(0.75);
  transform-origin: center;
  color: rgba(0, 0, 0, 0.75);
} 
.bc-small-icons {
  transform: scale(0.75);
  transform-origin: right top;
  /*   .btn--icon {
  }
  i.icon {
  } */
}
.bc-title-line {
  display: flex;
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  white-space: nowrap;
  &:after {
    -ms-flex-item-align: center;
    -ms-grid-row-align: center;
    align-self: center;
    background-color: #37474f;
    border-radius: 1px 0 0 1px;
    content: "";
    display: inline-block;
    flex-grow: 1;
    height: 2px;
    line-height: 1px;
    margin-left: 20px;
    text-align: center;
    vertical-align: middle;
    width: 100%;
  }
}
.bc-table-cell--head {
  font-weight: 600;
  text-transform: uppercase;
}
.bc-table {
  .bc-table-cell {
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  }
}
</style>