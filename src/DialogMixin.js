export default {
  props: {
    value: {
      required: false
    },
    open: {
      type: Boolean,
      default: false
    }
  },
  computed: {
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
