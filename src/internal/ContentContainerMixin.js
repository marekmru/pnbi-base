/**
 * @mixin
 */
export default {
  props: {
    /**
     * Sets headline
     */
    headline: {
      default: '',
      type: String,
      required: false
    },
    /**
     * Sets title
     */
    title: {
      required: false,
      type: String,
      default: ''
    }
  },

  mounted() {
    if (this.headline.length) {
      this.$el.querySelector('.card-headline').classList.add('headline')
    } else if (this.title.length) {
      this.$el.querySelector('.card-headline').classList.add('title')
    }
  },
  computed: {
    label() {
      try {
        const headline = this.headline.length
        const title = this.title.length
        if (headline) {
          return this.headline.toUpperCase()
        } else if (title) {
          return this.title.toUpperCase()
        }
      } catch (err) {
        console.warn(err)
      }
      return ''
    }
  }
}
