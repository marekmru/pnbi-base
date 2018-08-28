export default {
  created() {
    this.localStorageName = this.tableIdentifier + '_tableheaders'
    const data = window.localStorage.getItem(this.localStorageName)
    if (data == null) {
      window.localStorage.setItem(this.localStorageName, '{}')
      this.saveToLocalStorage()
    }
    this.localStorageHeaders = this.loadFromLocalStorage().headers
  },
  mounted() {
    this.$updateHeaderDom(this.localStorageHeaders)
  },
  computed: {
    localAttrs: {
      get: function () {
        let temp = JSON.parse(JSON.stringify(this.$attrs))
        temp.headers = this.localStorageHeaders.filter(val => val.selected)
        return temp
      },
      set: function (newVal) {
        console.log('newVal', newVal)
      }
    }
  },
  data() {
    return {
      localStorageName: null,
      localStorageHeaders: []
    }
  },
  watch: {
    pagination: function () {
      // pagination event used by tableplus for triggering request.
      this.$emit('padinationEvent', this.pagination)
      this.$updateHeaderDom(this.localStorageHeaders)
    },
    localAttrs: function () {
      // watch for changes in localAttrs
      this.$updateHeaderDom(this.localStorageHeaders)
    }
  },
  methods: {
    saveToLocalStorage(headers) {
      if (headers == null) {
        headers = this.$attrs.headers.map(val => {
          val.selected = true
          return val
        })
      }
      const storageObject = this.loadFromLocalStorage()
      storageObject.headers = headers
      window.localStorage.setItem(this.localStorageName, JSON.stringify(storageObject))
    },
    loadFromLocalStorage() {
      return JSON.parse(window.localStorage.getItem(this.localStorageName))
    },
    updateHeaders() {
      this.saveToLocalStorage(this.localStorageHeaders)
      this.$updateHeaderDom(this.localStorageHeaders)
    },
    $updateHeaderDom(headers) {
      const tbody = this.$el.querySelector('tbody')
      this.$nextTick(function () {
        headers.forEach(function (h, index) {
          // get columns that should be filtered
          const cols = tbody.querySelectorAll(`tr td:nth-child(${index + 1})`)
          // toggle columns
          cols.forEach(c => {
            if (h.selected !== true) {
              c.style.display = 'none'
            } else {
              c.style.display = 'table-cell'
            }
          })
        })
      })
    }
  }
}
