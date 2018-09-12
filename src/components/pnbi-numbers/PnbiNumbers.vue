<template>
  <div class="fn-input">
    <v-text-field :disabled="disabled" :label="label" autocomplete="off" v-model="internalValue" @keydown.native.stop="onKeyDown" :suffix="internalSuffix"></v-text-field>
    <slot name="validation-slot">
    </slot>
  </div>
</template>

<script>
import is from 'is'
export default {
  props: {
    value: { type: Number, default: null },
    label: { type: String },
    valid: { type: Boolean, default: true },
    type: { type: String, default: 'currency' },
    suffix: { type: String, default: '€' },
    unit: { type: Number, required: false, default: 1 },
    disabled: { type: Boolean, default: false }
  },

  methods: {
    onKeyDown (event) {
      console.log('keydown: ', event.keyCode)
      if (event.keyCode === 38) { // up
        this.internalValue = (this.value / this.unit) + this.incrementor
        return false
      }
      if (event.keyCode === 40) { //  down
        this.internalValue = Math.max((this.value / this.unit) - this.incrementor, 0)

        return false
      }
      if (
        (event.keyCode >= 48 && event.keyCode <= 57) ||
        (event.keyCode >= 96 && event.keyCode <= 105) ||
        event.keyCode === 8 ||
        event.keyCode === 9 ||
        event.keyCode === 37 ||
        event.keyCode === 39 ||
        event.keyCode === 46 ||
        event.keyCode === 110 ||
        event.keyCode === 188 ||
        event.keyCode === 35 ||
        event.keyCode === 36
      ) {
      } else {
        event.preventDefault()
      }
    }
  },
  computed: {
    isValid () {
      return this.valid
    },
    internalValue: {
      get: function () {
        if (is.number(this.value)) {
          return (this.value / this.unit).toLocaleString('de-DE')
        }
      },
      set: function (newValue) {
        if (newValue === '') {
          this.$emit('input', null)
          return
        }
        if (is.number(newValue)) {
          this.$emit('input', newValue * this.unit)
        } else {
          this.$emit('input', Number(newValue.replace(/\./g, '').replace(/,/g, '.')) * this.unit)
        }
      }
    },
    internalSuffix () {
      if (this.type === 'currency') {
        return (this.unit === 1) ? ('€') : ((this.unit === 1000) ? ('T€') : (''))
      } else {
        return this.type
      }
    },
    incrementor () {
      if (this.unit === 1) {
        return 1000
      }
      return 1
    }
  }
}
</script>

<style scoped>
.input-group__details_custom {
  margin-top: -24px;
}
</style>
