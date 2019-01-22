<template>
  <v-snackbar :timeout="timeout" :color="snack.type" :top="true" :center="true" :multi-line="false" :vertical="false" v-model="show">
    {{ snack.text }}
    <v-btn dark icon flat @click.native="show = false">
      <v-icon>close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
import {
  mapGetters
} from 'vuex'
export default {
  mounted(){
    this.$bus.$on('SHOW_NOTIFICATION', (dto) => {
      this.snack = Object.assign({}, this.snack, dto)
      this.show = true
    })
  },
  watch: {
  },
  computed: {

  },
  data () {
    return {
      show: false,
      timeout: 3000,
      snack: {
        type: 'success', // success // error // info
        text: 'Success'
      }
    }
  }
}
</script>
<style scoped>
</style>