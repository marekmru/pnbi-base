<script>
/* eslint-disable  */
import router from "@/router";
import Auth from "./Auth";

export default {
  mounted() {
    
  },
  components: {},
  data() {
    return {
      user: {
        password: '',
        password2: ''
      }
    };
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.onSubmit();
        }
      });
    },
    onSubmit() {
      Auth.reset({
        password: this.user.password,
        password_code: this.$route.params.code
      })
        .then(response => {
          console.log(response);
          
        })
        .catch(err => {
          console.log(err);
        });
    },
    goToLogin() {
      router.push("/");
    }
  },
  computed: {
    isValid() {
      return this.user.password !== '' && this.user.password2 !== '';
    }
  },
  created() {}
};
</script>
<template>
    <div class="page" id="login">

      <form @submit.prevent="validateBeforeSubmit"
    class="login-form md-layout md-gutter md-alignment-center-center">
        <div class="md-layout-item md-size-33 bi-card-container" >
          <md-card >
              <md-card-header>
                  <div class="md-headline">Neues Passwort</div>
              </md-card-header>

              <md-card-content>
                  <md-field :class="{'md-input-invalid': errors.has('Passwort')}">
                      <label for="password">Passwort*</label>
                      <md-input v-model="user.password" data-vv-name="Passwort" type="password" v-validate name="password" data-vv-rules="required"></md-input>
                      <p class="md-error" v-show="errors.has('Passwort')">{{ errors.first('Passwort') }}</p>
                  </md-field>

                  <md-field :class="{'md-input-invalid': errors.has('password2')}">
                      <label for="password2">Passwortbestätigung*</label>
                      <md-input v-model="user.password2" data-vv-name="Passwortbestätigung" 
                       type="password" v-validate name="password" data-vv-rules="required|confirmed:Passwort"></md-input>
                      <p class="md-error" v-show="errors.has('Passwortbestätigung')">{{ errors.first('Passwortbestätigung') }}</p>
                  </md-field>
              </md-card-content>
              <md-card-actions>
                  <md-button :disabled='errors.any() || !isValid'  type="submit" class="bi-login-button md-raised md-primary">WEITER</md-button>
              </md-card-actions>
                <md-card-actions>
                  <md-button @click="goToLogin" class="bi-login-button">Zurück zum Login</md-button>
              </md-card-actions>
          </md-card>
          <div class="bi-copyright">© 2018</div>
        </div>
    </form>

    </div>
</template>

<style lang="scss">
@import "./Login.scss";
@import "./forms.scss";
</style>
