<template>
  <div class="pnbi-datatable dark">
    <v-toolbar flat color="white" class="pnbi-datatable__toolbar pb-1 pt-2">
      <h3 class="accent--text card-headline">{{label}}</h3>
      <v-spacer></v-spacer>
      <slot name="primary-controls">
      </slot>
      <v-flex xs3>
        <v-text-field clearable class="pnbi-datatable__search" solo-inverted flat v-model="search" label="Suche…" append-icon="search"></v-text-field>
      </v-flex>
      <v-btn small color="primary" dark @click="$emit('new')">
        <v-icon class="mr-1" dark left>add</v-icon>
        {{buttonLabel}}
      </v-btn>
    </v-toolbar>
    <div v-if="!!$slots['secondary-controls']" class="px-4 py-3 pnbi-secondary-controls" name="secondary-controls">
    </div>
    <slot>
    </slot>
  </div>
</template>

<script>
import ContentContainerMixin from './internal/ContentContainerMixin'
export default {
  name: 'pnbi-datatable',
  mixins: [ContentContainerMixin],
  props: {
    buttonLabel: {
      type: String | null,
      default: 'Neu'
    },
    flat: {
      type: Boolean | null,
      default: false
    }
  },
  mounted () {
    // :class="{'elevation-1': !flat}"
    if (this.flat === false) {
      this.$el.classList.add('elevation-1')
    } else {
      this.$el.classList.add('flat')
    }
  },
  watch: {
    search (newValue) {
      this.$emit('search', newValue)
    }
  },
  data () {
    return {
      search: null
    }
  }
}
</script>
<style lang="scss" scoped>
.pnbi-secondary-controls {
  background-color: #fff;
}
</style>
<style lang="css">
.pnbi-webapp table.v-table thead tr {
  height: 34px;
}
.application.pnbi-webapp table.v-table thead tr th {
  font-weight: 600;
  text-transform: uppercase;
}
.application.pnbi-webapp .v-icon.pnbi-icon {
  color: rgb(158, 158, 158);
  font-size: 16px;
}
</style>

<style lang="css" scoped>
.flat >>> .v-toolbar__content {
  padding-left: 0;
  padding-right: 0;
}
div >>> .pnbi-datatable__toolbar .v-toolbar__content {
  xxheight: 54px !important;
}
div >>> .v-input.pnbi-datatable__search {
  height: 30px !important;
  min-height: 30px !important;
}
div >>> .v-input.pnbi-datatable__search .v-label {
  font-size: 14px;
}
div >>> .v-input.pnbi-datatable__search .v-input__control {
  min-height: 32px;
}
.pnbi-datatable >>> thead tr {
  height: 34px;
}
.pnbi-datatable >>> thead tr th {
  font-weight: 600;
}

.pnbi-datatable .v-alert.warning {
  margin-top: 0px;
  margin-left: -24px;
  margin-right: -24px;
}
.pnbi-datatable.dark {
}
/*shared*/
.pnbi-datatable.dark {
  xxxbackground-color: #3f515d;
  xxxcolor: #fff;
}

.pnbi-datatable.dark >>> thead tr th {
  xxxbackground-color: #fafafa;
  color: rgba(0, 0, 0, 0.87);
  color: #3f515d;
}

.pnbi-datatable.dark tbody tr:hover {
  /*background: #ccd4da !important;*/
  background: rgba(204, 212, 218, 0.5) !important;
}

.pnbi-datatable.dark thead tr th.column.active,
.pnbi-datatable.dark thead tr th.column:hover,
.pnbi-datatable.dark thead tr th.column.active:hover,
.pnbi-datatable.dark thead tr th.column.active.sortable:hover,
.pnbi-datatable.dark thead tr th.column .icon,
.pnbi-datatable.dark thead tr th.column.active .icon,
.pnbi-datatable.dark thead tr th.column.active,
.pnbi-datatable.dark thead tr th.column:hover,
.pnbi-datatable.dark thead tr th.column.active:hover,
.pnbi-datatable.dark thead tr th.column.active.sortable:hover,
.pnbi-datatable.dark thead tr th.column .icon,
.pnbi-datatable.dark thead tr th.column.active .icon {
  color: rgba(255, 255, 255, 0.9) !important;
}

/*light theme*/
.pnbi-datatable.light {
  background-color: #3f515d;
  padding-top: 32px;
}
.pnbi-datatable tr.active {
  background: rgba(204, 212, 218, 0.6) !important;
}
.pnbi-datatable tr.active + tr.datatable__expand-row .card {
  background-color: rgba(204, 212, 218, 0.6) !important;
}
.pnbi-child-table {
  xxbackground-color: rgba(204, 212, 218, 0.6) !important;
}
.pnbi-child-table .table {
  background-color: rgba(204, 212, 218, 0.6) !important;
}
</style>
