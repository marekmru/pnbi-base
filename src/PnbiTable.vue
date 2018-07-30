<template>
  <div class="pnbi-datatable dark">
    <v-toolbar flat color="white" class="pnbi-datatable__toolbar pb-2 pt-2">
      <h3 class="accent--text" :class="{'title': title.length, 'headline': headline.length}">{{label}}</h3>
      <v-spacer></v-spacer>
      <slot name="controls">
      </slot>
      <v-flex xs3>
        <v-text-field clearable class="pnbi-datatable__search" solo-inverted flat v-model="search" label="Suche…" append-icon="search"></v-text-field>
      </v-flex>
      <v-btn small color="primary" dark @click="$emit('new')">
        <v-icon class="mr-2" dark left>add</v-icon>
        {{buttonLabel}}
      </v-btn>
    </v-toolbar>
    <slot name="datatable">
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String | null,
      default: ''
    },
    headline: {
      type: String | null,
      default: ''
    },
    /*     type: {
      type: String | null,
      default: 'full'
    }, */
    buttonLabel: {
      type: String | null,
      default: 'Neu'
    }
  },
  watch: {
    search (newValue) {
      this.$emit('search', newValue)
    }
  },
  computed: {
    label () {
      return this.title.length ? this.title : this.headline
    }
  },
  data () {
    return {
      search: null
    }
  }
}
</script>

<style lang="css" scoped>
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
  height: 30px;
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
