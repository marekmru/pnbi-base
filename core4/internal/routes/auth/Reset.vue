<script>
import Password from './PasswordStrengthMeter.vue'
import Auth from '../../../Auth'
export default {
  created () {
    this.$validator.extend('passwordscore', {
      validate: () => {
        return {
          valid: this.score > 1
        }
      }
    })
    this.$validator.extend('confirmspecial', {
      validate: () => {
        return {
          valid: this.user.password === this.user.password2
        }
      }
    })
  },
  components: {
    Password
  },
  data () {
    return {
      dialogOpen: true,
      score: null,
      passwordVisible: false,
      finished: false,
      error: null,
      user: {
        password: null,
        password2: null
      }
    }
  },
  computed: {
    disabled () {
      const pristine = Object.values(this.fields).filter(val => {
        return val.pristine
      }).length > 0
      return pristine || this.errors.any()
    }
  },
  methods: {
    onFocus () {
      /*       this.error = null
      this.$validator.reset() */
    },
    onClick () {
      console.log(this.$route.params.code)
      Auth.reset({
        password: this.user.password,
        token: this.$route.params.token
      }).then(val => {
        this.finished = true
      }).catch((err) => {
        /// TODO: what can happen? error neccessary?
        this.error = err
        alert(err)
        this.$nextTick(function () {
          this.$validator.validateAll()
        })
      })
    }
  }

}
</script>

<template>
  <v-dialog v-model="dialogOpen" width="480px" persistent>
    <!-- after password reset started -->
    <v-card tile class="pa-3 auth-form-card">
      <v-card-title class="py-0 pb-2 pt-2">
        <h2 class="title accent--text">Passwort zurücksetzen</h2>
      </v-card-title>
      <v-card-text class="pt-2 pb-4">

        <v-text-field class="mb-3" @focus="onFocus" autofocus clearable label="Neues Passwort" v-model.lazy="user.password" name="Neues Passwort"
          :error-messages="errors.collect('Neues Passwort')" data-vv-as="Neues Passwort" data-vv-name="Neues Passwort" ref="Neues Passwort"
          v-validate="'required|passwordscore'" :append-icon="passwordVisible ? 'visibility' : 'visibility_off'"
              @click:append="passwordVisible = !passwordVisible" :type="passwordVisible ? 'text' : 'password'"></v-text-field>

        <v-text-field class="mb-4" @focus="onFocus" clearable label="Passwort wiederholen" v-model.lazy="user.password2"
          :error-messages="errors.collect('Passwort wiederholen')" data-vv-as="Passwort wiederholen" required
          data-vv-name="Passwort wiederholen" v-validate="'confirmspecial'" :append-icon="passwordVisible ? 'visibility' : 'visibility_off'" @click:append="passwordVisible = !passwordVisible" :type="passwordVisible ? 'text' : 'password'">
          </v-text-field>

          <password :password="user.password" @score="score = $event; $validator.validateAll()"></password>
      </v-card-text>
      <v-card-actions>
        <v-layout column>
          <v-flex>
            <v-btn class="mb-3" color="primary" block @click="onClick" :disabled="disabled" type="button" @keyup.enter="onClick">Anfordern</v-btn>
          </v-flex>
          <v-flex>
            <v-btn @click="$router.push('/')" flat block>Zurück zum Login</v-btn>
          </v-flex>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<style lang="css" scoped>
.password-strength-card{
  position: absolute;
  top: 26px;
  left: 426px;
}
.v-timeline-item .v-card:before{
  border-right-color: #999;
}
.v-timeline-item .v-card:after, .v-timeline-item .v-card:before{
  top: 18px !important;
}
div >>> .v-dialog--active{
  overflow: initial;
}

</style>
