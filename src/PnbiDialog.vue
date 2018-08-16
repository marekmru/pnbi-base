<template>
  <v-dialog :scrollable="scrollable" lazy v-model="isOpen" :max-width="width">
    <v-card tile>
      <v-toolbar dense card dark color="accent">
        <v-toolbar-title class="ml-0">
          {{title}}
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text class="px-3 py-3">
        <slot name="dialog-content"></slot>
      </v-card-text>
      <v-card-actions class="pl-3 pr-3 py-3" style="background-color: rgba(100,100,100, .025)">
        <v-spacer></v-spacer>
        <slot name="dialog-actions"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>
import DialogMixin from './DialogMixin'
export default {
  props: {
    width: {
      type: String | Number,
      default: '640px'
    },
    scrollable: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true,
      default: ':title'
    }
  },
  mixins: [ DialogMixin ]/* ,
  data () {
    return {

    }
  },
  components: {
  },
  created () {
  },
  mounted () {

  },
  beforeDestroy () {
  },

  watch: {

  },
  computed: {

  },
  methods: {

  } */
}
</script>
<style scoped>
</style>
