<script>
export default {
  props: {
    reset: Function
  },
  mounted () {
  },
  data () {
    return {
      user: {
        password: ''
      }
    }
  },

  methods: {
    onSubmit () {

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
                  <div class="md-headline">Neuse Passwort*</div>
              </md-card-header>
              <md-card-content>
                  <md-field :class="{'md-input-invalid': errors.has('password')}">
                      <label for="password">Neues Passwort*</label>
                      <md-input v-model="user.password" data-vv-name="password" type="password" v-validate name="password" data-vv-rules="'required'"></md-input>
                      <p class="md-error" v-show="errors.has('password')">{{ errors.first('password') }}</p>
                  </md-field>

                  <md-field :class="{'md-input-invalid': errors.has('password2')}">
                      <label for="password2">Neues Passwort wiederholen*</label>
                      <md-input v-model="user.password2" data-vv-name="password2" type="password" v-validate name="password"  data-vv-as="password" data-vv-rules="'required|confirmed:password'"></md-input>
                      <p class="md-error" v-show="errors.has('password2')">{{ errors.first('password2') }}</p>
                  </md-field>
              </md-card-content>
              <md-card-actions>
                  <md-button :disabled='errors.any()' v-on:click="onSubmit" class="bi-login-button md-raised md-primary">Weiter</md-button>
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
