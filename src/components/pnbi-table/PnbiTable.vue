<template>
  <div class="pnbi-datatable dark elevation-1" :class="{'text-uppercase': this.uppercaseLabels}">
    <!--  flat" :class="{'elevation-1': !flat}" -->
    <v-toolbar flat color="white" class="pnbi-datatable__toolbar pb-3 pt-3">
      <h3 class="accent--text card-headline">{{label}}</h3>
      <v-spacer></v-spacer>

      <!-- primary controls -->
      <slot name="primary-controls">
      </slot>

      <!-- customise button for pnbi-datatable-plus -->
      <div v-if="customizeLabel">
        <v-btn small color="accent"
          @click.stop="$bus.$emit('customizeEvent')">{{customizeLabel}}</v-btn>
      </div>
      <div v-if="extendSearch">
        <v-btn small color="accent"
          @click.stop="$bus.$emit('extendSearchEvent')">{{extendSearch}}</v-btn>
      </div>

      <v-flex xs3>
        <v-text-field clearable class="pnbi-datatable__search" solo-inverted flat v-model="search" append-icon="search"></v-text-field>
      </v-flex>
      <v-btn v-if="buttonLabel !== false" small color="primary" dark @click="$emit('new')">
        <v-icon class="mr-1" dark left>add</v-icon>
        {{buttonLabel}}
      </v-btn>
    </v-toolbar>

    <!-- secondary slot -->
    <slot v-if="$slots['secondary-controls']" name="secondary-controls"></slot>

    <!-- default slot -->
    <slot>
    </slot>

  </div>
</template>

<script>
import ContentContainerMixin from '../../internal/ContentContainerMixin'

export default {
  name: 'PnbiDatatable',
  mixins: [ContentContainerMixin],
  props: {
    /**
    * Use for text in creation button.
    * set is to false if button should be hidden
    */
    buttonLabel: {
      type: String | Boolean,
      default: 'Neu',
      required: true
    },
    /**
    * If defined customise button is visible.
    * value is used as button text
    */
    customizeLabel: {
      typ: String | Boolean,
      default: false
    },
    /**
     * Should the labels be uppercase? Dafault: false
     */
    uppercaseLabels: {
      type: Boolean,
      default: false
    },
    /**
     * If defined, enables extended search inside of table
     */
    extendSearch: {
      type: String,
      default: "Extends"
    },
    flat: {
      type: Boolean | null,
      default: false
    }
  },
  mounted () {
    if (this.flat === false) {
      this.$el.classList.add('elevation-1')
    } else {
      this.$el.classList.remove('elevation-1')
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
  height: 36px;
}
/* .application.pnbi-webapp table.v-table thead tr th {
  font-weight: 600;
  text-transform: uppercase;
} */
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
  height: 54px !important;
}
div >>> .v-input.pnbi-datatable__search .v-input__slot {
    background: rgba(0,0,0,.1);
    margin: 0 !important;
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
.pnbi-datatable >>> thead tr th:first-letter {
  text-transform: capitalize;
}
.pnbi-datatable.text-uppercase >>> thead tr th {
  text-transform: uppercase;
}
.pnbi-datatable .v-alert.warning {
  margin-top: 0px;
  margin-left: -24px;
  margin-right: -24px;
}
.pnbi-datatable.dark >>> thead tr th {
  color: #3f515d;
}
.pnbi-datatable.dark tbody tr:hover {
  /*background: #ccd4da !important;*/
  background: rgba(204, 212, 218, 0.5) !important;
}

/* .pnbi-datatable.dark thead tr th.column.active,
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
} */

/*light theme*/

.pnbi-datatable tr.active {
  background: rgba(204, 212, 218, 0.6) !important;
}
.pnbi-datatable tr.active + tr.datatable__expand-row .card {
  background-color: rgba(204, 212, 218, 0.6) !important;
}
.pnbi-child-table .table {
  background-color: rgba(204, 212, 218, 0.6) !important;
}
</style>
