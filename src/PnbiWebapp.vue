<template>
  <v-app>
    <v-navigation-drawer v-if="isNavVisible" v-model="sidenavOpen" fixed clipped class="grey lighten-4" app>
      <div class="pt-3">
        <slot name="navigation-slot"></slot>
      </div>
      <v-list dense class="default-routes">
        <v-divider dark class="my-3"></v-divider>

        <v-list-tile :to="{name: 'profile'}">
          <v-list-tile-action>
            <v-avatar>
              <span class="white--text">{{profile.short}}</span>
            </v-avatar>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Profile
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{name: 'privacy'}">
          <v-list-tile-action>
            <v-icon>visibility_off</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Privacy Policy
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :to="{name: 'imprint'}">
          <v-list-tile-action>
            <v-icon class="impressum">§</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Imprint
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="logout()">
          <v-list-tile-action>
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjOTA5MDkwIiBkPSJNMTkyIDI3Ny40aDE4OS43bC00My42IDQ0LjdMMzY4IDM1Mmw5Ni05Ni05Ni05Ni0zMSAyOS45IDQ0LjcgNDQuN0gxOTJ2NDIuOHoiLz48cGF0aCBmaWxsPSIjOTA5MDkwIiBkPSJNMjU1LjcgNDIxLjNjLTQ0LjEgMC04NS41LTE3LjItMTE2LjctNDguNC0zMS4yLTMxLjItNDguMy03Mi43LTQ4LjMtMTE2LjkgMC00NC4xIDE3LjItODUuNyA0OC4zLTExNi45IDMxLjItMzEuMiA3Mi42LTQ4LjQgMTE2LjctNDguNCA0NCAwIDg1LjMgMTcuMSAxMTYuNSA0OC4ybDMwLjMtMzAuM2MtOC41LTguNC0xNy44LTE2LjItMjcuNy0yMy4yQzMzOS43IDYxIDI5OC42IDQ4IDI1NS43IDQ4IDE0MS4yIDQ4IDQ4IDE0MS4zIDQ4IDI1NnM5My4yIDIwOCAyMDcuNyAyMDhjNDIuOSAwIDg0LTEzIDExOS0zNy41IDEwLTcgMTkuMi0xNC43IDI3LjctMjMuMmwtMzAuMi0zMC4yYy0zMS4xIDMxLjEtNzIuNSA0OC4yLTExNi41IDQ4LjJ6TTQ0OC4wMDQgMjU2Ljg0N2wtLjg0OS0uODQ4Ljg0OS0uODQ5Ljg0OC44NDl6Ii8+PC9zdmc+" width="22px" height="22px" title="logout" />
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Logout
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>
    <transition name="slide">
      <v-toolbar v-if="isNavVisible" dense dark color="accent darken-1" app fixed clipped-left>
        <v-toolbar-side-icon class="white--text" @click.native="sidenavOpen = !sidenavOpen"></v-toolbar-side-icon>
        <slot v-if="hasTitleSlot" name="title-slot"></slot>
        <h2 v-else class="app-title">{{title}}</h2>
        <v-spacer></v-spacer>

        <v-tooltip bottom>
          <v-btn slot="activator" class="pr-0 mr-0 profile-button" flat icon :to="{name: 'profile'}">
            <v-avatar>
              <span>{{profile.short}}</span>
            </v-avatar>
          </v-btn>
          <span>Profile</span>
        </v-tooltip>
        <v-tooltip bottom>
          <v-btn slot="activator" class="pr-0 mr-0" flat icon @click="logout()">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMTkyIDI3Ny40aDE4OS43bC00My42IDQ0LjdMMzY4IDM1Mmw5Ni05Ni05Ni05Ni0zMSAyOS45IDQ0LjcgNDQuN0gxOTJ2NDIuOHoiLz48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMjU1LjcgNDIxLjNjLTQ0LjEgMC04NS41LTE3LjItMTE2LjctNDguNC0zMS4yLTMxLjItNDguMy03Mi43LTQ4LjMtMTE2LjkgMC00NC4xIDE3LjItODUuNyA0OC4zLTExNi45IDMxLjItMzEuMiA3Mi42LTQ4LjQgMTE2LjctNDguNCA0NCAwIDg1LjMgMTcuMSAxMTYuNSA0OC4ybDMwLjMtMzAuM2MtOC41LTguNC0xNy44LTE2LjItMjcuNy0yMy4yQzMzOS43IDYxIDI5OC42IDQ4IDI1NS43IDQ4IDE0MS4yIDQ4IDQ4IDE0MS4zIDQ4IDI1NnM5My4yIDIwOCAyMDcuNyAyMDhjNDIuOSAwIDg0LTEzIDExOS0zNy41IDEwLTcgMTkuMi0xNC43IDI3LjctMjMuMmwtMzAuMi0zMC4yYy0zMS4xIDMxLjEtNzIuNSA0OC4yLTExNi41IDQ4LjJ6TTQ0OC4wMDQgMjU2Ljg0N2wtLjg0OS0uODQ4Ljg0OS0uODQ5Ljg0OC44NDl6Ii8+PC9zdmc+" width="22px" height="22px" title="logout" />
          </v-btn>
          <span>Logout</span>
        </v-tooltip>
      </v-toolbar>
    </transition>
    <v-content v-if="isNavVisible" class="pt-0">
      <v-container :fluid="clientWidth < 1260" class="grey lighten-4">
        <slot name="router"></slot>
        <snackbar></snackbar>
      </v-container>
    </v-content>
    <v-content v-else class="pa-0  ma-0 auth-routes">
      <v-container fluid fill-height class="grey lighten-4">
        <v-layout class="pa-0  ma-0">
          <v-flex class="pa-0  ma-0">
            <router-view/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
    <v-dialog scrollable persistent v-model="alertOpen" max-width="720">
      <v-card tile v-if="alertOpen && alertMessage">
        <v-toolbar dense card dark color="error">
          <v-toolbar-title>
            ERROR {{alertMessage.status_code || alertMessage.data.status_code }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text class="px-3 py-3">
          <div v-if="alertMessage.html || alertMessage.json">
            <p v-if="alertMessage.html" v-html="alertMessage.html"></p>
            <div v-if="alertMessage.json">
              <pre class="mt-2 pa-1">{{alertMessage.json}}</pre>
            </div>
          </div>
          <div v-else>
            <pre class="mt-2 pa-1">{{alertMessage.data}}</pre>
          </div>
        </v-card-text>
        <v-card-actions class="pl-3 pr-3 pb-3 pt-0">
          <v-spacer></v-spacer>
          <v-btn type="button" @click="logout()" flat color="secondary">
            Zum Login
          </v-btn>
          <v-btn type="button" v-if="(alertMessage.status_code || alertMessage.data.status_code) != 401 && (alertMessage.status_code || alertMessage.data.status_code) != 403" flat @click="alertOpen = false" color="primary">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
import {
  LOADING,
  TRACK,
  PROFILE_UPDATED,
  CONFIG_UPDATED,
  ERROR
} from './event-bus'
import Auth from './Auth'

import BI_BASE_CONFIG from '@/pnbi.base.config.js'
import Snackbar from './Snackbar'

export default {
  components: {
    Snackbar
  },
  mounted () {
    this.$nextTick(() => {
      this._updateDimensions()
      window.addEventListener('resize', this._updateDimensions,
        {'passive': true})
      this.$bus.$on(PROFILE_UPDATED, profile => {
        if (typeof profile !== 'undefined') {
          this.profile = Object.assign({}, profile)
        } else {
          this.profile.realname = null
          this.profile.short = null
        }
      })
      this.$bus.$on(LOADING, status => {
        this.loading = status
      })
      this.$bus.$on(CONFIG_UPDATED, payload => {
        this.setTitle(payload)
      })
      this.$bus.$on(TRACK, payload => {
        if (window.utag != null) {
          const dto = Object.assign({
            customer_id: this.profile._id,
            customer_email: this.profile.email,
            realname: this.profile.realname,
            webapp: BI_BASE_CONFIG.APP_IDENTIFIER || this.title.toLowerCase()
          }, payload)
          if (payload.tealium_event === 'page_view') {
            window.utag.view(dto)
          } else {
            window.utag.link(dto)
          }
        }
      })

      this.$bus.$on(ERROR, this.showError)
      Auth.profile().then(
        profile => {
          this.profile = Object.assign({}, profile)
        },
        () => {
        // console.info(error);
        }

      )
    })
  },
  destroyed () {
    window.removeEventListener('resize', this._updateDimensions)
  },
  data () {
    return {
      title: null,
      alertMessage: null,
      loading: false,
      sidenavOpen: null,
      alertOpen: false,
      showNavigation: false,
      clientWidth: 0,
      profile: {
        realname: null,
        short: null
      }
    }
  },

  methods: {
    _updateDimensions () {
      this.clientWidth = Math.max(document.documentElement.clientWidth,
        window.innerWidth || 0)
      /*       this.clientHeight = Math.max(document.documentElement.clientHeight,
                                   window.innerHeight || 0); */
    },
    /*     goto (name) {
      this.$router.push({
        name
      })
    }, */
    showError (alert) {
      this.alertMessage = alert
      this.alertOpen = true
    },
    logout () {
      Auth.logout()
      window.setTimeout(
        function () {
          this.alertOpen = false
          this.$router.push({
            name: 'login'
          })
        }.bind(this), 200
      )
    },
    setTitle (title = '') {
      this.title = title.toUpperCase()
      document.title = this.title
    }
  },
  created () {
    this.setTitle(BI_BASE_CONFIG.TITLE)
  },
  computed: {
    hasTitleSlot () {
      return !!this.$slots['title-slot']
    },
    isNavVisible () {
      const isVis = ['login', 'reset'].indexOf(this.$route.name) === -1
      return isVis
    }
  }
}

</script>

<style lang="css">
.impressum {
  width: 22px;
  margin-top: -7px;
  text-align: center;
  font-weight: 700;
}

.v-navigation-drawer__border {
  opacity: 0.15;
}
</style>

<style scoped lang="css">
.slide-enter-active,
.slide-leave-active {
  top: 0;
}

.slide-enter,
.slide-leave-to {
  top: -48px;
}

.v-list__tile .v-avatar span,
.profile-button .v-avatar span {
  font-weight: 700 !important;
  letter-spacing: -0.1em !important;
  font-size: 11px !important;
  line-height: 12px !important;
  margin-left: -1px;
}

.default-routes .v-list__tile .v-avatar {
  background-color: rgba(0, 0, 0, 0.5) !important;
  height: 24px !important;
  width: 24px !important;
}

.default-routes .v-list__tile__title,
.default-routes .v-list__tile__action .material-icons {
  color: rgba(0, 0, 0, 0.5) !important;
}

.default-routes .v-list__tile--active .v-list__tile__title,
.default-routes .v-list__tile--active .v-list__tile__action .material-icons {
  color: #d70f14 !important;
}

.default-routes .v-list__tile--active .v-avatar {
  background-color: #d70f14 !important;
}

.profile-button .v-avatar {
  background-color: white;
  height: 22px !important;
  width: 22px !important;
}

.profile-button .v-avatar span {
  margin-top: -1px;
  color: #3f515d;
}

.auth-routes >>> .container {
  padding: 0;
}

.auth-routes >>> .v-content__wrap {
  padding-top: 0;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  border: 1px solid rgba(100, 100, 100, 0.2);
}

.v-progress-linear {
  position: absolute;
  z-index: 10;
  top: 48px;
  margin: 0;
}
</style>
