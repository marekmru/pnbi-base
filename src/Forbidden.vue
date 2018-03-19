<script>
export default {
  mounted() {},
  components: {},
  data() {
    return {
      state: undefined
    };
  },
  methods: {},
  created() {}
};
</script>
<template>
  <div class="page" id="login">
      <v-container fill-height id="auth-form">
    <v-layout align-center>
      <v-flex class="text-center">
         <h1 class="bi-powered">POWERED BY CORE</h1>
    <v-card>
      <v-card-title>
        <h3 class="headline">Fehler 403: Zugriff verweigert/verboten</h3>
      </v-card-title>
      <v-card-text class="pb-0">
        <p  sytle="line-height: 1.2em;">Bitte kontaktieren Sie uns unter folgender E-Mail Adresse:<br><a href="mailto:bi-ops@plan-net.com"><strong>bi-ops@plan-net.com</strong></a></p>
      </v-card-text>
      <c-card-actions>
        <v-spacer></v-spacer>
        <v-btn :to="login" flat block>Zurück zum Login</v-btn>
      </c-card-actions>
    </v-card>
          </v-flex>
    </v-layout>
  </v-container>
  </div>
</template>

<style lang="scss" scoped>
#login {
  margin-top: -48px;
  height: calc(100vh + 48px);
}
.title {
  line-height: 2rem;
}
</style>
