<script>
import Auth from './Auth'
import router from '@/router'

import BI_BASE_CONFIG from '@/pnbi.base.config.js'
export default {
  props: {
    setState: Function
  },
  mounted () {},
  data () {
    return {
      rules: {
        valid: false,
        nameRules: [
          v => !!v || 'Nutzername ist ein Pflichtfeld',
          v =>
            v.length >= 3 || 'Nutzername muss mindestens 3 Zeichen lang sein.',
          v =>
            !this.errorAuth ||
            'Bitte überprüfen Sie ihren Namen und das Passwort.'
        ],
        passwordRules: [
          v => !!v || 'Nutzername ist ein Pflichtfeld',
          v =>
            !this.errorAuth ||
            'Bitte überprüfen Sie ihren Namen und das Passwort.'
        ]
      },
      user: {
        username: '',
        password: ''
      },
      errorAuth: false
    }
  },

  methods: {
    focus () {
      this.errorAuth = false
      this.$refs.form.validate()
    },
    toForgot () {
      this.setState('forgot')
    },
    onSubmit () {
      this.errorAuth = false
      Auth.login(this.user).then(
        () => {
          router.push(BI_BASE_CONFIG.MAIN_ROUTE)
        },
        error => {
          if (error.status === 401) {
            this.errorAuth = true
            this.$refs.form.validate()
          }
        }
      )
    }
  },
  computed: {}
}
</script>
<template>
  <v-container fill-height>
    <v-layout align-center>
      <v-flex class="text-center">
        <h1 class="bi-powered">POWERED BY CORE</h1>
        <v-form v-model="rules.valid" ref="form" lazy-validation>
          <v-card>
            <v-card-title class="justify-center">
              <h1 class="bi-headline" >CORE</h1>
            </v-card-title>  
              <v-layout column>
                <v-card-text>
                
                    <v-text-field @focus="focus" label="Nutzername" v-model="user.username" :rules="rules.nameRules" :counter="20" required></v-text-field>
                    <v-text-field @focus="focus" label="Passwort" v-model="user.password" :rules="rules.passwordRules" required type="password"></v-text-field>
                  
                </v-card-text>
              </v-layout>
            <v-card-actions class="white">
              <v-layout align-center column>
                <v-btn color="primary" block @click="onSubmit" :disabled="!rules.valid" type="submit">Login</v-btn>
                <br>
                <v-btn @click="toForgot" flat block>Passwort zurücksetzen</v-btn>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>

</template>
<style scoped lang="scss">

.card {
  max-width: 520px;
  margin: 0 auto;
  padding: 0 12px 24px 12px;
}

</style>