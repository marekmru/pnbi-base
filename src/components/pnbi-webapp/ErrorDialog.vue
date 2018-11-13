<template>
  <v-dialog scrollable max-width="720" v-model="isOpen" persistent>
    <v-card tile class="pa-3">
      <v-toolbar dense card dark color="error">
        <v-toolbar-title>
          ERROR <!-- {{alertMessage.status_code || alertMessage.data.status_code }} -->
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text class="px-3 py-3">
        TODO
<!--         <div v-if="alertMessage.html || alertMessage.json">
          <p v-if="alertMessage.html" v-html="alertMessage.html"></p>
          <div v-if="alertMessage.json">
            <pre class="mt-2 pa-1">{{alertMessage.json}}</pre>
          </div>
        </div>
        <div v-else>
          <pre class="mt-2 pa-1">{{alertMessage.data}}</pre>
        </div> -->
      </v-card-text>
      <v-card-actions class="pl-3 pr-3 pb-3 pt-0">
 <!--        <v-spacer></v-spacer>
        <v-btn type="button" @click="logout()" flat color="secondary">
          Zum Login
        </v-btn>
        <v-btn type="button" v-if="(alertMessage.status_code || alertMessage.data.status_code) != 401 && (alertMessage.status_code || alertMessage.data.status_code) != 403"
          flat @click="alertOpen = false" color="primary">
          OK
        </v-btn> -->
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
import DialogMixin from '../../internal/DialogMixin'
export default {
  props: {},
  mixins: [DialogMixin],
  created () {},
  mounted () {},
  computed: {
    ...mapGetters([
      'error'
    ])
  },
  watch: {
    error: function (newVal) {
      console.error(newVal)
    }
  },
  data () {
    return {}
  },
  methods: {
    ...mapActions([])
  }
}
</script>

<style scoped lang="scss">
</style>
