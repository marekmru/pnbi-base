<script>
  // import router from '@/router'
  import LoginForm from './internal/LoginForm'
  import ForgotForm from './internal/ForgotForm'
  import CookieForm from './internal/CookieForm'
  import CookieFooter from './internal/CookieFooter'
  import Privacy from './Privacy'
  import Imprint from './Imprint'
  import EventBus, {
    PROFILE_UPDATED
  } from "./event-bus";
  import CookieService from './internal/cookie.service.js'
  import Auth from './Auth'
  import BI_BASE_CONFIG from "@/pnbi.base.config.js";

  const tealiumEnabler = (a, b, c, d) => {
    if(window.location.href.includes('localhost')){
      return false
    }
    a = '//tags.tiqcdn.com/utag/plan-net-training/b.zimmermann/dev/utag.js'
    b = document
    c = 'script'
    d = b.createElement(c)
    d.src = a; d.type = 'text/java' + c
    d.async = true
    a = b.getElementsByTagName(c)[0]
    a.parentNode.insertBefore(d, a)
  }

  export default {
    created() {
      tealiumEnabler()
      window.setTimeout(val => {
        Auth.profile().then(
          this.checkCookieLayer,
          () => {
            this.state = 'login'
          }
        );
      }, 250) 
    },
    beforeDestroy() {},
    mounted() {
      //this.state = 'cookie'
    },
    components: {
      LoginForm,
      ForgotForm,
      CookieForm,
      CookieFooter,
      Privacy,
      Imprint
    },
    data() {
      return {
        profile: null,
        state: undefined,
        dialogPrivacy: false,
        dialogImprint: false
      }
    },
    methods: {
      checkCookieLayer() {
  

        Auth.profile().then(
          profile => {
            this.profile = profile;
            const cookie = CookieService.isPriPolCookieSet();
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
              this.$router.push(BI_BASE_CONFIG.MAIN_ROUTE)
            }
          },
          () => {}
        );
      },
      onOptInClick(cookie = false) {
        CookieService.setPriPolCookie()
        CookieService.optIn({
          _id: this.profile._id,
          opt_in: cookie || CookieService.getCookieDate()
        }).then(() => {
          this.$router.push(BI_BASE_CONFIG.MAIN_ROUTE)
        }, error => {

        })
      },
      onOptInClickLight(cookie = false) {
        CookieService.setPriPolCookie()
        CookieService.optIn({
          _id: this.profile._id,
          opt_in: cookie || CookieService.getCookieDate()
        }).then(() => {
          this.$router.push(BI_BASE_CONFIG.MAIN_ROUTE)
        })
      }
    }
  }

</script>
<template>
  <div class="page" id="login">
    <v-dialog v-model="dialogPrivacy" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
      <v-card tile>
        <v-toolbar card dark color="primary">
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
        <v-toolbar card dark color="primary">
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
    <transition name="fade">
      <login-form v-on:login-success="checkCookieLayer()" key="1" class="auth-form" v-if="state === 'login'" v-model="state"></login-form>
    </transition>
    <transition name="fade">
      <forgot-form key="2" class="auth-form" v-if="state === 'forgot'" v-model="state"></forgot-form>
    </transition>
    <transition name="fade">
      <cookie-form v-on:open-privacy-dialog="dialogPrivacy = true" v-on:privacy-ok-clicked="onOptInClick()" key="3" class="auth-form"
        v-if="state === 'cookie'" v-model="state"></cookie-form>
    </transition>
    <transition name="fade">
      <cookie-footer v-if="state === 'login'" key="4" v-on:open-privacy-dialog="dialogPrivacy = true" v-on:privacy-ok-clicked="onOptInClickLight()"></cookie-footer>
    </transition>
  </div>
</template>

<style lang="scss">
  #login {
    margin-top: -48px;
    height: calc(100vh + 48px);
  }

  #login form {
    position: relative;
    top: -30px;
    &:before {
      position: absolute;
      width: 100%;
      content: "POWERED BY CORE";
      display: block;
      user-select: none;
      text-align: center;
      color: rgba(255, 255, 255, 0.2);
      font-weight: 800;
      line-height: 1.44;
      top: -46px;
      font-size: 32px;
      @media (max-width: 600px) {
        top: -42px;
        line-height: 2;
        font-size: 24px;
      }
    }
  }

</style>
<style lang="css" scoped>
  div>>>.fade-enter-active,
  div>>>.fade-leave-active {
    transition: all .33s ease-out;
  }

  div>>>.fade-enter,
  .fade-leave-to {
    transition: all .33s ease-out;
    opacity: 0;
    transform: scale(.9);
  }
  footer{
    background-color: #fff;
    position: fixed;
    bottom: 0;
    width: 100vw;
  }

</style>
