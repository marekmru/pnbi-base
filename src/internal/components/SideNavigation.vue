<script>
export default {
}
</script>
<template>
  <v-layout class="sidenav" row>
    <v-flex>
      <v-list dense class="grey lighten-4 pb-0">
        <v-list-tile :to="{name: 'dummy'}">
          <v-list-tile-action>
            <v-icon>loyalty</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-content class="mandant">
              <span>Navigation Item</span>
            </v-list-tile-content>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<style scoped lang="scss">

</style>
