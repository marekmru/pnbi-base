export default {
  props: {
    headline: {
      default: '',
      type: String,
      required: false
    },
    title: {
      required: false,
      type: String,
      default: ''
    }
  },
  mounted () {
    if (this.headline.length) {
      this.$el.querySelector('.card-headline').classList.add('headline')
    } else if (this.title.length) {
      this.$el.querySelector('.card-headline').classList.add('title')
    }
  },
  computed: {
    label () {
      const headline = this.headline.length
      const title = this.title.length
      if (headline) {
        return this.headline.toUpperCase()
      } else if (title) {
        return this.title.toUpperCase()
      }
    }
  }
}
