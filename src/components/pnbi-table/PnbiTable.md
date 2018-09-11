
### Usage

Usually used inside a pnbi-page with headline as VIP or title as secondary Table Element

```jsx
<pnbi-datatable headline="Pagename" button-label="New project">
  <!-- Optional Slot-->
  <div slot="primary-controls">
  </div>
  <!-- Optional Slot-->
  <div slot="secondary-controls">
  </div>

  <!-- Default Slot-->
<<<<<<< HEAD
  <v-data-table :headers="headers" :items="items"
  search="" :rows-per-page-items="[10,25,50, {'text':'Alle','value':-1}]"
  rows-per-page-text="Elemente pro Seite">
  <template slot="items" slot-scope="props">
    <td>{{props.item.name}}</td>
    <td>{{props.item.age}}</td>
  </template>
=======
  <v-data-table :headers="[]" :items="[]" 
  search="" :rows-per-page-items="[10,25,50, {'text':'Alle','value':-1}]" 
  rows-per-page-text="Elemente pro Seite" :loading="true">
>>>>>>> 8171ed4c919825f5e85af96421c6009a8d5f397b
  </v-data-table>

</pnbi-datatable>
```
