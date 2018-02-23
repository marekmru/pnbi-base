<template>
  <v-text-field name="budget" label="Verfügbares Budget (€)" v-model="internalValue" @keydown="onKeyDown"
  ></v-text-field>
</template>

<script>
import numeral from 'numeral'
export default {
  props: {
    value: { type: Number, default: null }
  },
  methods: {
    onKeyDown (event) {
      if (
        (event.keyCode >= 48 && event.keyCode <= 57) ||
        (event.keyCode >= 96 && event.keyCode <= 105) ||
        event.keyCode === 8 ||
        event.keyCode === 9 ||
        event.keyCode === 37 ||
        event.keyCode === 39 ||
        event.keyCode === 46 ||
        event.keyCode === 190
      ) {
      } else {
        event.preventDefault()
      }
    }
  },

  computed: {
    internalValue: {
      // getter
      get: function () {
        const ret = numeral(this.value / 1000).format('0,0')
        return ret
      },
      set: function (newValue) {
        /*         if (isNaN(newValue)) {
          newValue = 0
        } */
        this.$emit('input', numeral(newValue).value() * 1000)
      }
    }
  }
}
</script>

<style scoped>

</style>
