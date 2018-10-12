<script>
export default {}
</script>

<template>
  <v-layout class="sidenav" row>
    <v-flex>
      <v-list dense class="grey lighten-4">
        <v-list-tile :to="{name:'start'}">
          <v-list-tile-action>
            <v-icon>map</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="text--accent-4">
              Übersicht
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<style scoped lang="css">

</style>
