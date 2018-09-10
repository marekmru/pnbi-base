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
  <v-data-table :headers="[]" :items="[]" 
  search="" :rows-per-page-items="[10,25,50, {'text':'Alle','value':-1}]" 
  rows-per-page-text="Elemente pro Seite" :loading="true">
  </v-data-table>
</pnbi-datatable>
```
