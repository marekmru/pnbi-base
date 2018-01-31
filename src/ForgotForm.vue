<script>
import Auth, { unwrap } from './Auth'

export default {
  props: {
    setState: Function
  },
  mounted () {

  },
  data () {
    return {
      user: {
        email: ''
      },
      message: undefined
    }
  },

  methods: {
    onEmailChange () {
      this.errors.clear()
    },
    validateBeforeSubmit () {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.onSubmit()
        }
      })
    },
    onSubmit () {
      this.message = undefined
      Auth.reset(this.user)
        .then(response => {
          this.message = {
            success: true,
            text:
              'Eine Email mit einem Link zum zurücksetzen ihres Passwortes wurde an folgende Adresse geschickt:'
          }
        })
        .catch(err => {
          const message = unwrap(err)
          if (typeof message.email === 'string') {
            this.errors.add('notfound', 'Die E-Mail Adresse wurde nicht gefunden.')
          } else {
            this.errors.add('notfound', 'Fehler.')
          }
        })
    }
  },
  computed: {}
}
</script>
<template>
    <form @submit.prevent="validateBeforeSubmit"
    class="login-form md-layout md-gutter md-alignment-center-center">
        <div class="md-layout-item md-size-33 bi-card-container" >
          <md-card >
              <md-card-header>
                  <div class="md-headline">Passwort zurücksetzen</div>
              </md-card-header>
              <md-card-content v-if="message">
                  <p>{{message.text}}</p>
                  <strong class="md-primary">{{user.email}}</strong>
              </md-card-content>

              <md-card-content v-if="!message">
                  <md-field :class="{'md-input-invalid': errors.has('email')}">
                      <label for="email">Ihre Email Adresse*</label>
                      <md-input v-model="user.email" data-vv-name="E-Mail" type="email" v-validate name="email" data-vv-rules="required|email" @focus="onEmailChange"></md-input>
                      <p class="md-error" v-show="errors.has('E-Mail')">{{ errors.first('E-Mail') }}</p>
                      <p class="md-error" v-show="errors.has('notfound')">{{ errors.first('notfound') }}</p>
                  </md-field>
              </md-card-content>
              <md-card-actions v-if="!message">
                  <md-button :disabled='errors.any()' v-on:click="onSubmit" class="bi-login-button md-raised md-primary">PASSWORT ANFORDERN</md-button>
              </md-card-actions>
                <md-card-actions>
                  <md-button v-on:click="setState('login')" class="bi-login-button">Zurück zum Login</md-button>
              </md-card-actions>
          </md-card>
          <div class="bi-copyright">© 2018</div>
        </div>
    </form>
</template>
<style lang="scss">
@import "./forms.scss";
</style>

// custom errors : http://vee-validate.logaretm.com/api.html error bag
