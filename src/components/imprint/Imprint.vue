<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex class="headline">Impressum</v-flex>
      <v-flex d-flex xs12>
        <v-layout column>
          <v-flex>
            <v-card flat>
              <v-card-text class="title pb-0">Plan.Net Business Intelligence GmbH & Co.KG</v-card-text>
            </v-card>
          </v-flex>
          <v-flex>
            <v-card flat>
              <v-card-text>Brienner Str. 45a-d<br>80333 München / Deutschland</v-card-text>
            </v-card>
          </v-flex>
          <v-divider></v-divider>
          <v-flex>
            <v-card flat>
              <v-card-text class="title pb-0">Kontakt</v-card-text>
              <v-card-text>Tel: +49 89 2050 30<br>Fax: +49 89 2050 3611<br>E-Mail:
                <a href="mailto:bi-ops@plan-net.com">bi-ops@plan-net.com</a>
              </v-card-text>
            </v-card>
            <v-card flat>
              <v-card-text class="title pb-0">Rechtsform</v-card-text>
              <v-card-text>GmbH &amp; Co. KG<br>Handelsregisternummer: HRA 79530<br>Amtsgericht München<br>Gerichtsstand und Erfüllungsort: München<br>USt-ID-Nr.: DE222163784
              </v-card-text>
            </v-card>
            <v-card flat>
              <v-card-text class="title pb-0">Geschäftsführer</v-card-text>
              <v-card-text>Marcus Ambrus<br>Michael Rau<br>Manfred Klaus<br>Dr. Andrea Malgara
              </v-card-text>
            </v-card>
            <v-card flat>
              <v-card-text class="title pb-0">Redaktionell Verantwortlicher gem. § 55 Abs. 2 Rundfunkstaatsvertrag</v-card-text>
              <v-card-text>Michael Rau<br>Brienner Str. 45a-d<br>80333 München / Deutschland
              </v-card-text>
            </v-card>
            <v-card flat>
              <v-card-text class="title pb-0">Haftungshinweis</v-card-text>
              <v-card-text>Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links.
                <br>Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    type: String
  }
}
</script>
<style lang="scss" scoped>
.v-card__text {
  padding-left: 0;
}
</style>
