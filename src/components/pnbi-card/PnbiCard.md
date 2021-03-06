### Usage

Usually used inside a pnbi-page with headline as VIP or title as secondary Table Element Default Conainer Element for any kind of content

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
    <v-btn flat color="primary">More</v-btn>
  </div>
</pnbi-card>
```
