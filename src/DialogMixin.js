/**
 * @mixin
 */
export default {
  props: {
    /**
     * Sets value required default to false
     */
    value: {
      required: false
    },
    /**
     * Sets dialog status open or closed
     */
    open: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    /**
     * Handles open/closed state of dialog
     */
    isOpen: {
      get () {
        return this.open
      },
      set () {
        this.$emit('close')
      }
    }
  }
}
