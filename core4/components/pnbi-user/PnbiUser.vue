<template>
  <div class="pnbi-user">
          <v-spacer></v-spacer>
          <v-tooltip bottom v-if="hasOwnTheme !== true">
            <v-btn
              slot="activator"
              class="pr-0 mr-0 theme-btn "
              flat
              @click="setDark(!dark)"
            >
            <!-- set api call to toggle dark theme -->
                <span >{{dark === true ? 'light' : 'dark'}}</span>
            </v-btn>
            <span>Theme</span>
          </v-tooltip>
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
              class="pr-0 mr-0 logout-button"
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

      </div>
    </template>
<script>
import {
  TRACK,
  ERROR
} from '../../event-bus'
import {
  mapActions,
  mapGetters
} from 'vuex'
export default {
  name: 'pnbi-user',
  props: {
  },
  components: {

  },
  mounted () {
    this.fetchProfile()
    this.setUpEvents()
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
      'setTitle',
      'setDark'
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
    }
  },
  computed: {
    ...mapGetters([
      'profile',
      'loading',
      'title',
      'dark',
      'hasOwnTheme'
    ])
  }
}
</script>

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

.theme-btn{
  border: 1px solid #fff;
  border-radius: 0%;
  padding:0;
}

</style>
