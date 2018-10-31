export default {
  mounted () {
    // register event listener
    this.$bus.$on('extendSearchEvent', this.onExtendSearchEvent)
    this.enableDefaultItemsInAdvancedSearch()
  },
  computed: {
    itemsForAdvancedSearch () {
      return this.localStorageHeaders.filter(header => header.selectedForSearch)
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
      console.log('clicked', item)
    },
    /**
     * Remove chip
     * @param item that should be removed
     */
    onChipClose (item) {
      this.localStorageHeaders.filter(header => {
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
          // TEMP parsed key and values
          // let querySelector = Object.keys(item[key])[0]
          // let queryValue = item[key][querySelector]
          if (header.value === key) {
            header.selectedForSearch = true // enable
            header.advancedSearchItem = item[key]
          }
          return header
        })
      })
      this.$updateHeaderDom(this.localStorageHeaders)
    }
  }
}
