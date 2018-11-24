export default {
  mounted () {
    // register event listener
    this.$bus.$on('extendSearchEvent', this.onExtendSearchEvent)
    this.enableDefaultItemsInAdvancedSearch()
  },
  computed: {
    itemsForAdvancedSearch: {
      get () {
        return this.localStorageHeaders.filter(header => header.selectedForSearch)
      },
      set (item) {
        this.localStorageHeaders = this.localStorageHeaders.map(val => {
          if (val.value === item.value) {
            val = item
          }
          return val
        })
      }
    }
  },
  watch: {
    dialog (val) {
      if (!val) return
      requestAnimationFrame(() => {
        this.$refs.focus.focus()
      })
    }
  },
  methods: {
    /**
     * Open menu for edit the avancedSearchTerm
     * @param item that should be changed
     */
    openChipDialog (item) {
      item.editDialog = !item.editDialog
    },
    /**
     * Remove chip
     * @param item that should be removed
     */
    onChipClose (item) {
      this.itemsForAdvancedSearch = this.itemsForAdvancedSearch.filter(header => {
        if (header.value === item.value) {
          header.selectedForSearch = false
        }
        return header
      })
    },
    /**
     * Show dialog for advanced search
     */
    onExtendSearchEvent () {
      this.searchPlusDialogVisible = !this.searchPlusDialogVisible
    },
    /**
     * Enable defaults that are delivered over advanced-defaults prop
     */
    enableDefaultItemsInAdvancedSearch () {
      if (this.advancedDefault === null) {
        return true
      }
      this.advancedDefault.filter(item => {
        this.localStorageHeaders = this.localStorageHeaders.filter(header => {
          let key = Object.keys(item)[0]
          if (header.value === key) {
            header.selectedForSearch = true
            header.advancedSearchItem = item[key]
          }
          return header
        })
      })
      this.$updateHeaderDom(this.localStorageHeaders)
    }
  }
}
