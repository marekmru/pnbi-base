<script>
import EventBus from './event-bus'
import Auth from './Auth'
import router from '@/router'
import BI_BASE_CONFIG from '@/pnbi.base.config.js'

export default {
  mounted () {
    Auth.profile().then(
      profile => {
        if (
          router.history.current.name === 'login' ||
          router.history.current.name === 'reset'
        ) {
         // router.push(BI_BASE_CONFIG.MAIN_ROUTE)
        }
      },
      () => {}
    )
    EventBus.$on('PROFILE_UPDATED', profile => {
      if (typeof profile !== 'undefined') {
        this.profile.realname = profile.realname
      } else {
        this.profile.realname = undefined
      }
    })
  },
  props: {
    login: Function
  },
  data () {
    return {
      clipped: true,
      temporary: true,
      toggled: false,
      showNavigation: false,
      profile: {
        realname: undefined
      }
    }
  },

  methods: {
    logout () {
      Auth.logout().then(val => {
        router.push('/')
      })
    }
  },
  created () {
    const title = BI_BASE_CONFIG.TITLE
    if (typeof title === 'undefined') {
      alert('NO BI_BASE_CONFIG.TITLE')
    }
    this.title = title || 'CORE'
    document.title = title
  },
  computed: {
    isNavVisible () {
      const isVis = ['login', 'reset'].indexOf(this.$route.name) === -1
      return isVis
    }
  }
}
</script>
<template>
  <div>
    <v-navigation-drawer v-model="toggled" fixed :temporary="temporary" :clipped="clipped">
    </v-navigation-drawer>
    <v-toolbar dark dense color="secondary" v-if="isNavVisible">
      <v-toolbar-side-icon @click.stop="toggled = !toggled"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="logout">
        <v-icon>power_settings_new</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<style lang="scss" scoped>
.toolbar__title {
  text-align: center;
  font-weight: 800;
  font-size: 1.9rem;
  letter-spacing: -1px;
  cursor: pointer;
  text-transform: uppercase;
}
</style>
