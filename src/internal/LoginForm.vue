<template>
  <v-container fill-height>
    <v-layout align-center>
      <v-flex class="text-center">
        <v-form v-model="rules.valid" ref="form" lazy-validation>
          <v-card>
            <v-card-title class="justify-center">
              <h1 class="bi-headline">{{title}}</h1>
            </v-card-title>

            <v-card-text>
              <v-text-field @focus="focus" label="Nutzername" v-model="user.username" :rules="rules.nameRules" required></v-text-field>
              <v-text-field @focus="focus" label="Passwort" v-model="user.password" :rules="rules.nameRules" required :append-icon="passwordVisible ? 'visibility' : 'visibility_off'" @click:append="passwordVisible = !passwordVisible" :type="passwordVisible ? 'text' : 'password'"></v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-layout column>
                <v-flex>
                  <v-btn class="mb-3" color="primary" block @click="onSubmit" :disabled="!rules.valid" type="submit" v-on:keyup.enter="onSubmit">Login</v-btn>
                </v-flex>
                <v-flex>
                  <v-btn @click="$emit('input', 'forgot')" flat block>Passwort zurücksetzen</v-btn>
                </v-flex>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>

</template>
<script>
import Auth from '../Auth'

export default {
  props: {
    state: String
  },
  mounted () {},
  data () {
    return {
      title: this.$config.TITLE,
      rules: {
        valid: false,
        nameRules: [
          v => !!v || 'Pflichtfeld',
          v =>
            v.length >= 3 || 'Mindestens 3 Zeichen eingeben.',
          v =>
            !this.errorAuth ||
            'Bitte überprüfen Sie ihren Namen und das Passwort.'
        ]
      },
      passwordVisible: false,
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
    onSubmit ($event) {
      $event.preventDefault()
      if (!this.rules.valid) {
        return
      }
      this.errorAuth = false
      Auth.login(this.user).then(
        (login) => {
          this.$emit('login-success')
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

<style scoped lang="scss">
</style>
