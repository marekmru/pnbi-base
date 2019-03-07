<template>
  <div class="core-background auth-page">
    <!-- TODO -  component -->
    <v-dialog v-model="dialogPrivacy" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
      <v-card tile>
        <v-toolbar card dark color="primary" dense>
          <v-btn icon dark @click.native="dialogPrivacy = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <privacy v-on:imprint-click="dialogPrivacy = false; dialogImprint = true;" type="dialog"></privacy>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogImprint" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
      <v-card tile>
        <v-toolbar card dark color="primary" dense>
          <v-btn icon dark @click.native="dialogImprint = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <imprint type="dialog"></imprint>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- LOGIN dialog -->
    <v-dialog v-model="dialogLogin" width="480px" persistent >
        <v-card tile class="pa-3 auth-form-card">
          <v-card-title class="justify-center py-0">
            <h2 class="bi-headline">{{title}}</h2>
          </v-card-title>
          <v-card-text class="pt-2">
            <v-text-field @focus="onFocus" autofocus clearable label="Nutzername"  v-model="user.username" :error-messages="errors.collect('Nutzername')" data-vv-as="Nutzername" data-vv-name="Nutzername" v-validate="'required|min:3|auth'"></v-text-field>
            <v-text-field @focus="onFocus" clearable label="Passwort" v-model="user.password"  :error-messages="errors.collect('Passwort')" data-vv-as="Passwort" data-vv-name="Passwort" v-validate="'required|min:3|auth'" :append-icon="passwordVisible ? 'visibility' : 'visibility_off'"
              @click:append="passwordVisible = !passwordVisible" :type="passwordVisible ? 'text' : 'password'"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-layout column>
              <v-flex>
                <v-btn class="mb-3" color="primary" block @click="onLoginClick" :disabled="errors.any()" type="button"
                  @keyup.enter="onLoginClick">Login</v-btn>
              </v-flex>
              <v-flex>
                <v-btn to="/reset" flat block>Passwort zurücksetzen</v-btn>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
    </v-dialog>

<!--     <v-dialog v-model="dialogLogin" width="480px" persistent >
        <v-card tile class="pa-3 auth-form-card">
          <v-card-title class="justify-center py-0">
            <h2 class="bi-headline">{{title}}</h2>
          </v-card-title>

          <v-card-text class="pt-2">
            <v-text-field label="Nutzername" v-model="user.username" required></v-text-field>
            <v-text-field label="Passwort" v-model="user.password" required :append-icon="passwordVisible ? 'visibility' : 'visibility_off'"
              @click:append="passwordVisible = !passwordVisible" :type="passwordVisible ? 'text' : 'password'"></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-layout column>
              <v-flex>
                <v-btn class="mb-3" color="primary" block @click="onLoginClick" :disabled="false" type="button"
                  @keyup.enter="onLoginClick">Login</v-btn>
              </v-flex>
              <v-flex>
                <v-btn @click="$emit('input', 'forgot')" flat block>Passwort zurücksetzen</v-btn>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
    </v-dialog> -->

    <!--     <transition name="fade">
      <login-form v-on:login-success="chååeckCookieLayer()" key="1" class="auth-form" v-if="state === 'login'" v-model="state"></login-form>
    </transition> -->
    <!--     <transition name="fade">
      <forgot-form key="2" class="auth-form" v-if="state === 'forgot'" v-model="state"></forgot-form>
    </transition> -->
    <!--     <transition name="fade">
      <cookie-form v-on:open-privacy-dialog="dialogPrivacy = true" v-on:privacy-ok-clicked="onOptInClick()" key="3" class="auth-form" v-if="state === 'cookie'" v-model="state"></cookie-form>
    </transition>
    <transition name="fade">
      <cookie-footer v-if="state === 'login'" key="4" v-on:open-privacy-dialog="dialogPrivacy = true" v-on:privacy-ok-clicked="onOptInClickLight()"></cookie-footer>
    </transition> -->
  </div>
</template>

<script>
import Privacy from '../privacy/Privacy'
import Imprint from '../imprint/Imprint'
import { mapGetters, mapActions } from 'vuex'
import CookieService from '../../cookie.service.js'
import Auth from '../../../Auth'

export default {
  created () {
    this.$validator.extend('auth', {
      validate: () => {
        const valid = this.profile.error == null
        return {
          valid
        }
      }
    })
  },
  components: {
    Privacy,
    Imprint
  },
  data () {
    return {
      dialogPrivacy: false,
      dialogImprint: false,
      dialogLogin: true,
      passwordVisible: false,
      user: {
        username: 'admin',
        password: 'hans'
      }
    }
  },
  computed: {
    nextRoute () {
      return this.$route.query.next
    },
    ...mapGetters([
      'profile',
      'title'
    ])
  },
  methods: {
    ...mapActions([
      'login',
      'clearAuthError'
    ]),
    onFocus () {
      this.clearAuthError()
      this.$nextTick(function () {
        this.$validator.validateAll()
      })
    },
    onLoginClick () {
      this.login(this.user).then(val => {
        this.$validator.validateAll()
      })
    },
    checkCookieLayer () {
      Auth.profile().then(
        profile => {
          this.profile = profile
          const cookie = CookieService.isPriPolCookieSet()
          if (profile.opt_in == null) {
            if (typeof cookie === 'string') {
              this.onOptInClick(cookie)
            } else {
              this.state = 'cookie'
            }
          } else {
            if (typeof cookie !== 'string') {
              CookieService.setPriPolCookie()
            }
            if (this.nextRoute == null) {
              this.$router.push(this.$config.MAIN_ROUTE)
            } else {
              window.location.assign(this.nextRoute)
            }
          }
        },
        () => {}
      )
    },
    onOptInClick (cookie = false) {
      CookieService.setPriPolCookie()
      CookieService.optIn({
        _id: this.profile._id,
        opt_in: cookie || CookieService.getCookieDate()
      }).then(() => {
        if (this.nextRoute == null) {
          this.$router.push(this.$config.MAIN_ROUTE)
        } else {
          window.location.assign(this.nextRoute)
        }
      }, () => {})
    },
    onOptInClickLight (cookie = false) {
      CookieService.setPriPolCookie()
      CookieService.optIn({
        _id: this.profile._id,
        opt_in: cookie || CookieService.getCookieDate()
      }).then(() => {
        if (this.nextRoute == null) {
          this.$router.push(this.$config.MAIN_ROUTE)
        } else {
          window.location.assign(this.nextRoute)
        }
      })
    }
  },
  beforeDestroy () {}
}
</script>

<style lang="scss">
</style>
<style lang="css" scoped>
  div>>>.fade-enter-active,
  div>>>.fade-leave-active {
    transition: all 0.33s ease-out;
  }

  div>>>.fade-enter,
  .fade-leave-to {
    transition: all 0.33s ease-out;
    opacity: 0;
    transform: scale(0.9);
  }

  footer {
    background-color: #fff;
    position: fixed;
    bottom: 0;
    width: 100vw;
  }
</style>
