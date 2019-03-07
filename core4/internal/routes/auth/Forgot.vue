<template>
  <v-dialog v-model="dialogOpen" width="480px" persistent>
    <!-- after password reset started -->
    <v-card tile class="pa-3 auth-form-card">
      <v-card-title class="py-0 pb-2 pt-2">
        <h2 class="title">Passwort zurücksetzen</h2>
      </v-card-title>

      <v-card-text class="pt-2" v-if="finished">
        Bitte überprüfen sie ihren Email-Posteingang.
      </v-card-text>

      <v-card-text class="pt-2" v-else>
        <v-text-field @focus="onFocus" autofocus clearable label="Ihre E-Mail Adresse" v-model.lazy="user.email"
          required :error-messages="errors.collect('E-Mail Adresse')" data-vv-as="E-Mail Adresse" data-vv-name="E-Mail Adresse"
          v-validate="'required|email'"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-layout column>
          <v-flex v-if="!finished">
            <v-btn class="mb-3" color="primary" block @click="onClick" :disabled="disabled" type="button"
              @keyup.enter="onClick">Anfordern</v-btn>
          </v-flex>
          <v-flex>
            <v-btn to="/login" flat block>Zurück zum Login</v-btn>
          </v-flex>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
import Auth from '../../../Auth'
export default {
  created () {
    /* this.$validator.extend('emailreset', {
      validate: () => {
        return {
          valid: this.error == null
        }
      }
    }) */
  },
  data () {
    return {
      error: null,
      dialogOpen: true,
      finished: false,
      user: {
        email: null
      }
    }
  },
  computed: {
    ...mapGetters([
      'profile'
    ]),
    disabled () {
      const pristine = Object.values(this.fields).filter(val => {
        return val.pristine
      }).length > 0
      return pristine || this.errors.any()
    }
  },
  methods: {
    ...mapActions([]),
    onFocus () {
      this.error = null
      this.$validator.reset()
    },
    onClick () {
      Auth.reset(this.user).then(val => {
        this.finished = true
      }).catch(() => {
        this.finished = true
      })
    }
  },
  beforeDestroy () {}
}
</script>

<style lang="scss">
</style>
<style lang="css" scoped>

</style>

<!--           <v-text-field @focus="onFocus" autofocus clearable label="Nutzername" v-model="user.username" :error-messages="errors.collect('Nutzername')"
            data-vv-as="Nutzername" data-vv-name="Nutzername" v-validate="'required|min:3|auth'"></v-text-field>
          <v-text-field @focus="onFocus" clearable label="Passwort" v-model="user.password" :error-messages="errors.collect('Passwort')"
            data-vv-as="Passwort" data-vv-name="Passwort" v-validate="'required|min:3|auth'" :append-icon="passwordVisible ? 'visibility' : 'visibility_off'"
            @click:append="passwordVisible = !passwordVisible" :type="passwordVisible ? 'text' : 'password'"></v-text-field> -->
