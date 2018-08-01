<template>
  <v-layout column>
    <h1 class="bc-page-title">Impressum</h1>
    <v-flex class="text-center">
      <div>
          <address>
            <span style="font-weight: 700;">Plan.Net Business Intelligence</span>
            <br>Brienner Str. 45a-d
            <br>80333 München / Deutschland
          </address>

          <strong>Kontakt: </strong>
          Tel: +49 89 2050 30
          <br> Fax: +49 89 2050 3611
          <br> E-Mail: bi-ops(at)plan-net.com

          <strong>Rechtsform: </strong>
          GmbH & Co. KG
          <br> Handelsregisternummer: HRA 79530
          <br> Amtsgericht München
          <br> Gerichtsstand und Erfüllungsort: München
          <br> USt-ID-Nr.: DE222163784
          <br>

          <strong>Geschäftsführer:</strong>
          Marcus Ambrus
          <br> Michael Rau
          <br> Manfred Klaus
          <br> Dr. Andrea Malgara

          <strong>Redaktionell Verantwortlicher gem. § 55 Abs. 2 Rundfunkstaatsvertrag:</strong>
          <address>
            Michael Rau
            <br>Brienner Str. 45a-d
            <br>80333 München / Deutschland
          </address>

          <strong>Haftungshinweis: </strong>
          <div>
            Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links.
            <br>Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
          </div>

        </div>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    props: {
      type: String
    }
  }

</script>
<style lang="scss" scoped>
  strong {
    display: block;
    margin-top: 12px;
  }

</style>
