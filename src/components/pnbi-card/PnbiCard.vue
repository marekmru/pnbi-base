<template>
  <v-card class="pnbi-card">
    <v-toolbar flat color="white" class="pnbi-datatable__toolbar pb-0 pt-2">
      <h3 class="accent--text card-headline">{{label}}</h3>
      <v-spacer></v-spacer>
      <!-- @slot Use this slot primary controls -->
      <slot name="primary-controls">
      </slot>
    </v-toolbar>
    <v-card-text class="px-4 py-2">
      <!-- @slot Use this slot to place the button content -->
      <slot></slot>
    </v-card-text>
    <v-card-text class="px-4 py-2" v-if="!!$slots['card-actions']">
      <!-- @slot Use this slot card actions -->
      <slot name="card-actions"></slot>
    </v-card-text>
  </v-card>
</template>

<script>
import ContentContainerMixin from '../../internal/ContentContainerMixin'

export default {
  mixins: [ContentContainerMixin]
}
</script>

<style scoped lang="css">
</style>
