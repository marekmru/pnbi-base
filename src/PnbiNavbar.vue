<script>
import EventBus, {LOADING, PROFILE_UPDATED} from './event-bus'
import Auth from './Auth'
import router from '@/router'
import BI_BASE_CONFIG from '@/pnbi.base.config.js'

export default {
  mounted () {
    console.log('Mounted', Auth.profile)

    Auth.profile().then(
      profile => {
        this.profile = profile
        if (
          router.history.current.name === 'login' ||
          router.history.current.name === 'reset'
        ) {
          router.push(BI_BASE_CONFIG.MAIN_ROUTE)
        }
      },
      (error) => {
        console.log(error)
      }
    )
    EventBus.$on(PROFILE_UPDATED, profile => {
      console.log('Profile Updated', profile)
      if (typeof profile !== 'undefined') {
        this.profile.realname = profile.realname
      } else {
        this.profile.realname = undefined
      }
    })
    EventBus.$on(LOADING, status => {
      this.loading = status
    })
  },
  props: {
    login: Function
  },
  data () {
    return {
      loading: false,
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
  <div v-if="isNavVisible">
    <v-navigation-drawer v-model="toggled" fixed temporary clipped>
      <v-card>
        <v-card-media height="48px" style="background:#212121"></v-card-media>
      </v-card>
      <v-layout py-2 justify-center row>
        <v-flex xs6>  
          <v-layout justify-center row>
            <v-flex>
              <v-icon class="account-icon" size="66">account_circle</v-icon>      
            </v-flex>  
            <v-flex class="pt-2">
              <v-chip v-if="profile.admin" align-self-center color="primary" text-color="white">Admin</v-chip>      
            </v-flex>
          </v-layout>
        </v-flex> 
      </v-layout>
      <v-layout>      
          <v-flex xs10 offset-xs1 class="test pt-2">
      </v-flex>
      </v-layout>
      <v-layout column>
        <v-flex>
          <v-layout class="mt-3">
            <v-flex class="py-1 pl-2"> 
              <span>USERNAME:</span>          
            </v-flex>
            <v-flex class="py-1 pl-2"> 
              <span>{{profile.username}}</span>          
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex>
          <v-layout>
            <v-flex class="py-3 pl-2"> 
              <span>E-MAIL:</span>          
            </v-flex>
            <v-flex class="py-3 pl-2"> 
              <span>{{profile.email}}</span>          
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout> 

      </v-navigation-drawer>
      <v-toolbar fixed dark dense color="secondary" >
        <v-toolbar-side-icon @click.stop="toggled = !toggled"></v-toolbar-side-icon>
        <v-toolbar-title class="white--text">{{title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="logout">
        <v-icon>power_settings_new</v-icon>
      </v-btn>
    </v-toolbar>
    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
  </div>
</template>

<style lang="scss" scoped>
.progress-linear {
  position: absolute;
  z-index: 10;
  top:48px;
  margin: 0
}
.toolbar__title {
  text-align: center;
  font-weight: 800;
  font-size: 1.9rem;
  letter-spacing: -1px;
  cursor: pointer;
  text-transform: uppercase;
}
.account-icon{
  font-size: 66px;
}
.test{
  border-bottom: 1px solid lightgray
}

</style>