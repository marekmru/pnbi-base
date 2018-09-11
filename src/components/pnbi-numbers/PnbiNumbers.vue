<template>
  <div :class="{'error--text': !isValid}" class="fn-input">
    <v-text-field :class="{'error--text': !isValid}" name="budget" :disabled="disabled" :label="label" autocomplete="off" v-model.number="internalValue" @keydown.native.stop="onKeyDown" :suffix="suffix"></v-text-field>
    <!-- <slot name="validation-slot"></slot>-->
  </div>
</template>

<script>
// plugin to perform toLocalString()
import numeral from 'numeral'
import is from 'is'
export default {
  // props are readonly
  
  props: {
    // input value
    value: { type: Number, default: null },
    // e.g. default t€ ==> 10 * 10000
    multiplikator: { type: Number, required: true, default: 1000 },
    disabled: { type: Boolean, default: false },
    label: { type: String },
    // currently parent validates number
    valid: { type: Boolean, default: true },
    // alternative:  toLocalString('de-DE')
    suffix: { type: String }
  },
  /** allowed: numbers dots commas up down + / * -  */
  methods: {
    onKeyDown (event) {
      if (event.keyCode === 38) { // up
        this.internalValue = (this.value || 0) + 1000
        return false
      }
      if (event.keyCode === 40) { //  down
        this.internalValue = Math.max(this.value - 1000, 0)
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
        event.keyCode === 190
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
          return numeral(this.value / this.multiplikator).format('0,0')
        }
      },
      set: function (newValue) {
        if (newValue === '') {
          this.$emit('input', null)
          return
        }
        //
        this.$emit('input', numeral(newValue).value() * this.multiplikator)
      }
    }
  }
}
</script>

<style scoped>
.input-group__details_custom {
  margin-top: -24px;
}
</style>
