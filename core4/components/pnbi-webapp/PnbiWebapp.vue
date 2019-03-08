<template>
  <v-app
    class="pnbi-webapp"
    :light="dark"
    :dark="dark"
  >
    <template v-if="isNavVisible">
      <v-navigation-drawer
        v-model="sidenavOpen"
        fixed
        clipped
        class="core-navigation-container"
        app
      >
        <div class="pt-3">
          <!-- @slot Use this slot for SideNavigation v-list -->
          <v-layout
            class="sidenav"
            row
          >
            <v-flex>
              <v-list
                dense
                class="pb-0"
                :dark="dark"
              >
                <slot name="navigation-slot"></slot>
              </v-list>
            </v-flex>
          </v-layout>
        </div>
        <v-list
          dense
          class="default-routes"
        >
          <v-divider
            dark
            class="my-3"
          ></v-divider>

          <v-list-tile :to="{name: 'profile'}">
            <v-list-tile-content>
              <v-list-tile-title>
                Profile
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile :to="{name: 'privacy'}">
            <v-list-tile-content>
              <v-list-tile-title>
                Privacy Policy
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile :to="{name: 'imprint'}">
            <v-list-tile-content>
              <v-list-tile-title>
                Imprint
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="logout()">
            <v-list-tile-content>
              <v-list-tile-title>
                Logout
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <transition name="slide">
        <v-toolbar
          dense
          dark
          color="accent darken-1"
          app
          fixed
          clipped-left
        >
          <v-toolbar-side-icon
            class="white--text"
            @click.native="toogleSideNav()"
          ></v-toolbar-side-icon>
          <!-- @slot Use this slot for a custom title instead of the default app-name -->
          <slot
            v-if="!!this.$slots['title-slot']"
            name="title-slot"
          ></slot>
          <h2
            v-else
            class="app-title"
          >{{title}}</h2>
          <v-spacer></v-spacer>

          <v-tooltip bottom>
            <v-btn
              slot="activator"
              class="pr-0 mr-0 profile-button"
              flat
              icon
              to="/profile"
            >
              <v-avatar>
                <span>{{profile.short}}</span>
              </v-avatar>
            </v-btn>
            <span>Profile</span>
          </v-tooltip>
          <v-tooltip bottom>
            <v-btn
              slot="activator"
              class="pr-0 mr-0"
              flat
              icon
              @click="logout()"
            >
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMTkyIDI3Ny40aDE4OS43bC00My42IDQ0LjdMMzY4IDM1Mmw5Ni05Ni05Ni05Ni0zMSAyOS45IDQ0LjcgNDQuN0gxOTJ2NDIuOHoiLz48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMjU1LjcgNDIxLjNjLTQ0LjEgMC04NS41LTE3LjItMTE2LjctNDguNC0zMS4yLTMxLjItNDguMy03Mi43LTQ4LjMtMTE2LjkgMC00NC4xIDE3LjItODUuNyA0OC4zLTExNi45IDMxLjItMzEuMiA3Mi42LTQ4LjQgMTE2LjctNDguNCA0NCAwIDg1LjMgMTcuMSAxMTYuNSA0OC4ybDMwLjMtMzAuM2MtOC41LTguNC0xNy44LTE2LjItMjcuNy0yMy4yQzMzOS43IDYxIDI5OC42IDQ4IDI1NS43IDQ4IDE0MS4yIDQ4IDQ4IDE0MS4zIDQ4IDI1NnM5My4yIDIwOCAyMDcuNyAyMDhjNDIuOSAwIDg0LTEzIDExOS0zNy41IDEwLTcgMTkuMi0xNC43IDI3LjctMjMuMmwtMzAuMi0zMC4yYy0zMS4xIDMxLjEtNzIuNSA0OC4yLTExNi41IDQ4LjJ6TTQ0OC4wMDQgMjU2Ljg0N2wtLjg0OS0uODQ4Ljg0OS0uODQ5Ljg0OC44NDl6Ii8+PC9zdmc+"
                width="22px"
                height="22px"
                title="logout"
              />
            </v-btn>
            <span>Logout</span>
          </v-tooltip>
        </v-toolbar>
      </transition>
      <v-content class="pt-0">
        <v-container
          :fluid="isFluid"
          class="core-container"
        >
          <!-- @slot Use this slot for router instance -->
          <slot name="router"></slot>
          <pnbi-snackbar></pnbi-snackbar>
        </v-container>
      </v-content>
    </template>
    <v-content
      v-else
      class="pa-0 ma-0 auth-routes"
    >
      <v-container
        fluid
        fill-height
        class="core-container"
      >
        <v-layout class="pa-0  ma-0">
          <v-flex class="pa-0  ma-0">
            <router-view />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-progress-linear
      indeterminate
      v-if="loading"
    ></v-progress-linear>

    <error-dialog></error-dialog>
  </v-app>
</template>
<script>
import {
  TRACK,
  ERROR
} from '../../event-bus'
import PnbiSnackbar from './pnbi-snackbar/Snackbar.vue'
import ErrorDialog from './pnbi-error-dialog/ErrorDialog.vue'
import {
  mapActions,
  mapGetters
} from 'vuex'
export default {
  name: 'pnbi-webapp',
  props: {
    /**
     * Controls responsive behavior of the app.
     * If set to true the app content is full-width of the browser, even in large screen reslutions
    */
    fullWidth: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  components: {
    PnbiSnackbar,
    ErrorDialog
  },
  mounted () {
    this.fetchProfile()
    this.setUpEvents()
    this.$nextTick(() => {
      if (!this.fullWidth) {
        this._updateDimensions()
        window.addEventListener('resize', this._updateDimensions, { 'passive': true })
      }
    })
  },
  destroyed () {
    window.removeEventListener('resize', this._updateDimensions)
  },
  data () {
    return {
      alertMessage: null,
      alertOpen: false,
      showNavigation: false,
      clientWidth: 0,
      sidenavOpen: null
    }
  },
  methods: {
    ...mapActions([
      'fetchProfile',
      'logout',
      'setTitle'
    ]),
    setUpEvents () {
      console.warn('deprectated: setUpEvents, use store')
      this.$bus.$on(TRACK, payload => {
        console.log('TODO: TRACK')
        const dto = Object.assign({
          customer_id: this.profile._id,
          customer_email: this.profile.email,
          realname: this.profile.realname,
          webapp: this.title.toLowerCase()
        }, payload)
        if (payload.tealium_event === 'page_view') {
          window.utag.view(dto)
        } else {
          window.utag.link(dto)
        }
      })

      this.$bus.$on(ERROR, function showError (alert) {
        console.log('TODO: ERROR')
      })
    },
    _updateDimensions () {
      //TODO mixin
      this.clientWidth = Math.max(document.documentElement.clientWidth,
        window.innerWidth || 0)
    },
    toogleSideNav () {
      this.sidenavOpen = !this.sidenavOpen
    }
  },
  computed: {
    ...mapGetters([
      'profile',
      'loading',
      'title',
      'dark'
    ]),
    isNavVisible () {
      const meta = this.$route.meta || {
        hideNav: false
      }
      return !meta.hideNav
    },
    isFluid () {
      return (this.clientWidth < 1260) || (this.fullWidth)
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

.default-routes {
  position: fixed;
  bottom: 0;
  width: 100%;
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
