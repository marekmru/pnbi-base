### Usage

This is a wrapper for v-data-table and acceps all attributes and slots from
 original v-data-table.

```jsx
<pnbi-datatable headline="Tablename" :button-label="false" customize-label="Customise">

  <!-- Optional Slot-->
  <div slot="primary-controls"></div>

  <!-- Optional Slot-->
  <div slot="secondary-controls"></div>

  <!-- Default Slot-->
  <pnbi-datatable-plus
    :items="items" :headers="headers"
    tableIdentifier="123"
    :search="search"
    @padinationEvent="onPaginationEvent"
    dialog-title="Tabele anpassen"
    dialog-subtitle="Wähle Spalten, die angezeigt werden sollen">
    <tr slot="row" slot-scope="props">
      <td>{{props.props.item.name}}</td>
      <td>{{props.props.item.age}}</td>
    </tr>
  </pnbi-datatable-plus>
</pnbi-datatable>
```

### How to use serverside pagination?

Disabled by default. Enable it by defining folowing props:

Define `total-items` prop. Total-items prop will disable the built-in frontend sorting and pagination. Define `loading` prop. Use Loading prop to display a progress bar while fetching data.

Define listener for events: `@paginationEvent="onPaginationEvent"` this event is fired if user change something in the pagination. So you take new pagination object and make a request to the backend:

```javascript
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
