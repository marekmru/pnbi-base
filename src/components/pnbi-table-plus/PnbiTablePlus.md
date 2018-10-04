### Usage

This is a wrapper for v-data-table and acceps all attributes and slots from
 original v-data-table.

```jsx
<template>
  <pnbi-datatable headline="Datatable plus" @search="request.search = $event" :button-label="false" customize-label="Customize">

      <pnbi-datatable-plus
        v-if="items.length > 2"
        :items="items" :headers="headers"
        tableIdentifier="123"
        :loading="loading"
        :total-items="totalItems"
        :search="request.search"
        @paginationEvent="onPaginationEvent"
        dialog-title="Tabele anpassen"
        dialog-subtitle="Wähle Spalten, die angezeigt werden sollen"
        dialog-closelabel="Schließen">
      </pnbi-datatable-plus>

    </pnbi-datatable>
  </template>

  <script>
    export default {
      data() {
        return {
          items: [],
          totalItems: 0,
          loading: true,
          request: {
            pagination: {},
            search: null
          },
          newBudget: null,
          projectName: null,
          headers: []
        };
      },
       mounted () {
        this.getDataFromApi()
          .then(data => {
            console.log('data-mounted', data)
            this.items = data.tableResponce.items
            this.headers = data.tableResponce.headers
            this.totalItems = data.tableResponce.totalItems
          })
      },
      methods: {
        onPaginationEvent (data, event) {
          this.request.pagination = data
          this.getDataFromApi()
            .then(data => {
              this.items = data.tableResponce.items
              this.headers = data.tableResponce.headers
              this.totalItems = data.tableResponce.totalItems
            })
        },
        getDataFromApi () {
          this.loading = true
          return new Promise((resolve, reject) => {
            let tableResponce = {}
            let items = []
            while (items.length < 300) {
              items.push({
                name: 'abc123',
                age: Math.floor(Math.random() * 10000) + 1,
                price: 1212349.55,
                value1: 0.33555,
                value2: 'Lorem ipsum dolor sit amet',
                value3: 445566555.778999553,
                value4: Math.floor(Math.random() * 5000) + 1,
                value5: '2018-10-04T00:00:00',
                value6: '2018-10-04T00:00:00',
                value7: 7,
                value8: 8
              })
            }

            const { sortBy, descending, page, rowsPerPage } = this.request.pagination

            // BE search
            if (this.request.search) {
              items = items.filter(i => {
                return i.age === parseInt(this.request.search)
              })
            } else {
              this.request.search = null
            }

            const totalItems = items.length

            // BE sorting
            if (this.request.pagination.sortBy && items.length > 1) {
              items = items.sort((a, b) => {
                const sortA = a[sortBy]
                const sortB = b[sortBy]

                if (descending) {
                  if (sortA < sortB) return 1
                  if (sortA > sortB) return -1
                  return 0
                } else {
                  if (sortA < sortB) return -1
                  if (sortA > sortB) return 1
                  return 0
                }
              })
            }

            // BE paging
            if (rowsPerPage > 0 && items.length > 1) {
              items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
            }

            // collect data
            tableResponce.items = items
            tableResponce.totalItems = totalItems
            tableResponce.headers = [
              { text: 'Name', value: 'name' },
              { text: 'no format & numbro', value: 'age', style: 'numbro.js' },
              { text: 'currency €', value: 'price', format: '0,0.00', style: 'numbro.js' },
              { text: 'Percent', value: 'value1', format: '0.0%', style: 'numbro.js' },
              { text: 'String', value: 'value2' },
              { text: 'Value 3', value: 'value3', format: '6 a', style: 'numbro.js' },
              { text: 'just number', value: 'value4' },
              { text: 'no format & moment', value: 'value5', style: 'moment.js' },
              { text: 'format  & moment', value: 'value6', format: 'DD/MM/YYYY', style: 'moment.js' }
            ]

            setTimeout(() => {
              this.loading = false
              resolve({
                tableResponce
              })
            }, 1000)
          })
        }
      }
    }
  </script>
```

### How to use serverside pagination?

Disabled by default. Enable it by defining folowing props:

Define `total-items` prop. Total-items prop will disable the built-in frontend sorting and pagination. Define `loading` prop. Use Loading prop to display a progress bar while fetching data.

Define listener for events: `@paginationEvent="onPaginationEvent"` this event is fired if user change something in the pagination. So you take new pagination object and make a request to the backend:

```js static
onPaginationEvent (data, event) {
  // update pagination
  this.request.pagination = data
  this.getDataFromApi(this.request)
    .then(data => {
      this.items = data.items
      this.totalItems = data.totalItems
    })
}
```

Your data object:
```javascript
  data: () => {
    return {
      items: [],
      totalItems: 0,
      loading: true,
      request: {
        pagination: {},
        search: null
      },
      headers: [
        {text: 'Name 2', value: 'name'},
        {text: 'Age', value: 'age'},
        {text: 'Value', value: 'value'}
      ]
    }
  }
```

#### Backend API definition

Wrap API endpoint request params in request object and send to Backend:
1. `page` -  page number (int)
2. `rowsPerPage` -  rows count per page (int)
3. `sortBy` - column to sort by (string)
4. `descending` - flag for sorting (boolean)

Request Example:
```javascript
{
  "request": {
    "pagination": {
      "descending":false,
      "page":1,
      "rowsPerPage":5,
      "sortBy":"name"
      },
    "search": null
  }
}
```

Response should include:
1. `totalItems` - length of found items list
2. `items` - plain list of items

Response example:
```jsx
{
  "responce": {
      "items": [],
      "totalItems": 100
  }
}
```
