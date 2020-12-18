<template>
  <v-dialog
    scrollable
    persistent
    lazy
    v-model="isOpen"
    max-width="720"
  >
    <v-card
      tile
      v-if="isOpen"
    >
      <v-toolbar
        dense
        card
        dark
        :color="titleType"
      >
        <v-toolbar-title>
          {{ headline }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text class="px-3 py-3">
        <div v-if="alertMessage.html || alertMessage.json">
          <p
            v-if="alertMessage.html"
            v-html="alertMessage.html"
          ></p>
          <div v-if="alertMessage.json">
            <pre class="mt-2 pa-1">{{alertMessage.json}}</pre>
          </div>
        </div>
        <div v-else>
          <pre class="mt-2 pa-1">{{alertMessage.data}}</pre>
        </div>
      </v-card-text>
      <v-card-actions class="pl-3 pr-3 pb-3 pt-0">
        <v-spacer></v-spacer>
        <v-btn
          v-if="is500"
          type="button"
          @click="onReload"
          flat
          color="secondary"
        >
          Seite neu laden
        </v-btn>
        <v-btn
          v-else-if="showLoginButton"
          type="button"
          @click="$emit('logout')"
          flat
          color="secondary"
        >
          Zum Login
        </v-btn>
        <v-btn
          type="button"
          flat
          @click="isOpen = false"
          color="primary"
        >
          Schließen
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import DialogMixin from '../../DialogMixin'
export default {
  methods: {
    onReload () {
      window.location.reload()
    }
  },
  computed: {
    showLoginButton () {
      return (this.alertMessage.status_code || this.alertMessage.data.status_code) === 401 || (this.alertMessage.status_code || this.alertMessage.data.status_code) === 403
    },
    titleType () {
      if ((this.alertMessage || {}).status_code != null) {
        if (this.alertMessage.status_code === 406) {
          return 'accent'
        }
      }
      return 'error'
    },
    headline () {
      if ((this.alertMessage || {}).headline != null) {
        return this.alertMessage.headline
      }
      return `Fehler ${this.alertMessage.status_code || this.alertMessage.data.status_code}`
    },
    is500 () {
      return (this.alertMessage || {}).status_code === 500
    }
  },
  props: {
    alertMessage: {
      type: Object,
      required: false,
      default: () => {
        return {
          status_code: 406,
          html: '<div></div>'
        }
      }
    }
  },
  mixins: [ DialogMixin ]
}
</script>

<style lang="scss" scoped>
</style>
