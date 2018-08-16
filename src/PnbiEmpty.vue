<template>
  <v-alert :value="true" color="warning" icon="warning">
    <span v-if="data.label" class="grey--text">{{data.label}}</span>
    <span v-if="data.html" class="grey--text" v-html="data.html"></span>
  </v-alert>
</template>

<script>
export default {
  props: {
    data: {
      type: Object | null,
      default: () => {
      	return { label: 'Keine Datensätze vorhanden. Bitte erstellen sie ein neues Element.'}
      }
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
.warning {
  background-color: rgba(0, 0, 0, 0.1) !important;
}
</style>
