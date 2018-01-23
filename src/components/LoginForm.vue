<script>
import router from '../router'
export default {
  props: {
    login: Function,
    setState: Function
  },
  mounted () {
  },
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      errorMessage: null
    }
  },

  methods: {
    onSubmit () {
      this.errorMessage = null
      this.login(this.user).then(
        ret => {
          router.push('overview')
        },
        error => {
          if (error.status === 401) {
            this.errorMessage =
              'Bitte überprüfen Sie ihren Namen und das Passwort.'
          }
        }
      )
    }
  },
  computed: {
    isValid () {
      return this.user.username !== '' && this.user.password !== ''
    }
  }
}
</script>
<template>
    <div class="login-form md-layout md-gutter md-alignment-center-center">
        <div class="md-layout-item md-size-33 bi-card-container" >
          <h1 class="bi-powered">POWERED BY CORE</h1>
          <md-card>
              <md-card-header>
                  <div class="md-title bi-headline">CORE</div>
              </md-card-header>
              <md-card-content>
                  <md-field :class="{'md-input-invalid': errors.has('username')}">
                      <label for="password">Nutzername*</label>
                      <md-input v-model="user.username"
  data-vv-name="username" type="text" v-validate name="username" data-vv-rules="required|min:4"></md-input>
                      <p class="md-error">{{ errors.first('username') }}</p>
                  </md-field>
                  <md-field :class="{'md-input-invalid': errors.has('password')}">
                      <label for="password">Passwort*</label>
                      <md-input v-model="user.password" data-vv-name="password" type="password" v-validate name="password" data-vv-rules="required"></md-input>
                      <p class="md-error" v-show="errors.has('password')">{{ errors.first('password') }}</p>
                      <p class="md-error" v-if="errorMessage">{{ errorMessage }}</p>
                  </md-field>
              </md-card-content>
              <md-card-actions>
                  <md-button :disabled='errors.any() || !isValid' v-on:click="onSubmit" class="bi-login-button md-raised md-primary">LOGIN</md-button>
              </md-card-actions>
              <md-card-actions>
                  <md-button v-on:click="setState('forgot')" class="bi-login-button">Paswort zurücksetzen</md-button>
              </md-card-actions>
          </md-card>
          <div class="bi-copyright">© 2018</div>
        </div>
    </div>
</template>
<style lang="scss">
@import "./forms.scss";
</style>
