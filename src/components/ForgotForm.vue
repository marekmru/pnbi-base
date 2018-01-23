<script>
export default {
  props: {
    forgot: Function,
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
    onSubmit () {
      this.message = undefined
      this.forgot(this.user).then(response => {
        this.message = {
          success: true,
          message: 'Eine Email mit einem Link zum zurücksetzen ihres Passwortes wurde an folgende Adresse geschickt: \n\n' + this.user.email + '.'
        }
      }).catch(() => {
        this.message = {
          success: false,
          text: 'Fehler.'
        }
      })
    }
  },
  computed: {
  }
}
</script>
<template>
    <div class="login-form md-layout md-gutter md-alignment-center-center">
        <div class="md-layout-item md-size-33 bi-card-container" >
          <md-card>
              <md-card-header>
                  <div class="md-headline">Passwort zurücksetzen</div>
              </md-card-header>
              <md-card-content>
                  <md-field :class="{'md-input-invalid': errors.has('email')}">
                      <label for="email">Ihre Email Adresse*</label>
                      <md-input v-model="user.email" data-vv-name="email" type="email" v-validate name="email" data-vv-rules="required|email"></md-input>
                      <p class="md-error" v-show="errors.has('email')">{{ errors.first('email') }}</p>
                      <p v-bind:class="{ 'md-error': !message.success }" v-if="message">{{ message.text }}</p>
                  </md-field>
              </md-card-content>
              <md-card-actions>
                  <md-button :disabled='errors.any()' v-on:click="onSubmit" class="bi-login-button md-raised md-primary">PASSWORT ANFORDERN</md-button>
              </md-card-actions>
                <md-card-actions>
                  <md-button v-on:click="showState('login')" class="bi-login-button">Zurück zum login</md-button>
              </md-card-actions>
          </md-card>
          <div class="bi-copyright">© 2018</div>
        </div>
    </div>
</template>
<style lang="scss">
@import "./forms.scss";
</style>
