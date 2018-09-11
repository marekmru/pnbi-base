### Usage

NUMBERS

<br><br>

##### Example: Title and content

```jsx
<pnbi-card headline="Cardname">
  <!-- Optional Slot-->
  <div slot="primary-controls">
  </div>
  <!-- Default Slot-->
  <div>Any Content can be placed here with any tag</div>
  <!-- Optional Slot-->
  <div slot="card-actions">
  </div>
</pnbi-card>
```

<br><br>

##### Example: Primary controls

```jsx
<pnbi-card headline="Cardname">
  <!-- Optional Slot-->
  <div slot="primary-controls">
  <v-btn color="primary">some controls</v-btn>
  </div>
  <!-- Default Slot-->
  <div>Any Content can be placed here with any tag</div>
  <!-- Optional Slot-->
  <div slot="card-actions">
  </div>
</pnbi-card>
```

<br><br>

##### Example: Card actions

```jsx
<pnbi-card headline="Cardname">
  <!-- Optional Slot-->
  <div slot="primary-controls">
  </div>
  <!-- Default Slot-->
  <div>Any Content can be placed here with any tag</div>
  <!-- Optional Slot-->
  <div slot="card-actions">
  <v-btn color="accent">some actions</v-btn>
  </div>
</pnbi-card>
```
