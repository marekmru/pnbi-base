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
    const headline = this.headline.length
    const title = this.headline.length
    if (headline) {
      this.$el.querySelector('.card-headline').classList.add('headline')
    } else if (title) {
      this.$el.querySelector('.card-headline').classList.add('title')
    }
  },
  computed: {
    label () {
      const headline = this.headline.length
      const title = this.title.length
      if (headline) {
        return this.headline
      } else if (title) {
        return this.title
      }
    }
  }
}
