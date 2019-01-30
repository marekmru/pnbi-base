<template>
  <v-alert :value="true" color="warning" :icon="icon">
    <span v-if="content.html" class="grey--text" v-html="content.html"></span>
    <span v-else class="grey--text">{{content.label}}</span>
  </v-alert>
</template>

<script>

export default {
  props: {
    icon: {
      type: [String, null],
      default: 'warning'
    },
    text: {
      type: String | null
    },
    html: {
      type: String | null
    },
    data: {
      // deprecated...
      type: Object | null,
      default: () => {
        const dto = {
          label: 'Keine Datensätze vorhanden. Bitte erstellen sie ein neues Element.'
        }
        return dto
      }
    }
  },
  computed: {
    content () {
      if (this.text) {
        return {
          label: this.text
        }
      }
      if (this.html) {
        return {
          html: this.html
        }
      }
      return this.data
    }
  }
}
</script>

<style lang="css" scoped>
.warning {
  background-color: rgba(0, 0, 0, 0.1) !important;
}
</style>
