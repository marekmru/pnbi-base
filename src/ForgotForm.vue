<script>
import Auth from './Auth'

// import Auth, { unwrap } from './Auth'

export default {
  props: {
    setState: Function
  },
  mounted () {

  },
  data () {
    return {
      errorEmail400: undefined,
      user: {
        email: ''
      },
      rules: {
        valid: false,
        emailRules: [
          v => !!v || 'Pflichtfeld',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Die E-Mail Adresse muss valide sein',
          v => !this.errorEmail400 || 'Die E-Mail Adresse wurde nicht gefunden.'
        ]
      },
      message: undefined
    }
  },

  methods: {
    focus () {
      this.errorEmail400 = false
      this.$refs.form.validate()
    },
    toLogin () {
      this.setState('login')
    },
    onSubmit ($event) {
      $event.preventDefault()
      this.message = undefined
      this.errorEmail400 = false
      Auth.reset(this.user)
        .then(response => {
          this.message = {
            success: true,
            text:
              'Eine Email mit einem Link zum Zurücksetzen ihres Passwortes wurde an folgende Adresse geschickt:'
          }
        })
        .catch(() => {
          this.errorEmail400 = true
          this.$refs.form.validate()
        })
    }
  },
  computed: {}
}
</script>

<template>
  <v-container fill-height id="auth-form">
    <v-layout align-center>
      <v-flex class="text-center">
        <h1 class="bi-powered">POWERED BY CORE</h1>
        <v-card v-if="!message" >
          <v-card-text class="pb-0">
            <v-layout  column>
              <h2>Passwort zurücksetzen</h2>
              <v-form  @submit="onSubmit" v-model="rules.valid" ref="form" lazy-validation >
                <v-text-field @focus="focus" label="Ihre E-Mail Adresse" v-model="user.email" :rules="rules.emailRules" required></v-text-field>
              <v-btn class="mt-4" :disabled="!rules.valid" block color="primary" type="submit">Anfordern</v-btn>
              <v-btn @click="toLogin" flat block>Zurück zum Login</v-btn>
              </v-form>
            </v-layout>
          </v-card-text>
        </v-card>
        <v-card v-if="message">
          <v-card-title>
            <v-layout column>
              <div class="pb-3">
                <p>{{message.text}}</p>
                <strong>{{user.email}}</strong>
              </div>
              <v-btn @click="toLogin" flat block>Zurück zum Login</v-btn>
            </v-layout>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style lang="css" scoped>
  .card{
    padding-bottom: 12px;
  }

</style>
