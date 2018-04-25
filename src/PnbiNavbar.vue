<template>
  <div v-if="isNavVisible">
    <v-navigation-drawer v-model="sidenavOpen" fixed temporary clipped>
      <v-card>
        <v-card-media height="48px" style="background:rgb(0, 0, 0)"></v-card-media>
      </v-card>
      <v-layout class="user-background" py-3 column>
        <v-flex>  
          <v-layout row>
            <v-flex class="pl-2 user-image">
              <v-icon color="white" class="account-icon">account_circle</v-icon>
              <v-chip v-if="profile.admin" color="primary" text-color="white">Admin</v-chip>      
            </v-flex>
            <v-layout column>
              <v-layout row>
                <v-flex> 
                </v-flex>
              </v-layout>            
              <v-layout v-if="profile.email" justify-center>
                <v-flex> 
                  <span>{{profile.email}}</span>          
                </v-flex>
              </v-layout>
              <v-layout justify-center>
                
                <v-flex> 
                  <span>{{profile.realname}}</span>          
                </v-flex>
              </v-layout>
            </v-layout>
          </v-layout>
        </v-flex>   
        <v-layout>
          <v-flex xs3 class="pt-2">        
          </v-flex>
        </v-layout>
      </v-layout>
      <v-flex>
        <slot name="navigation-slot"></slot>
      </v-flex>
      </v-navigation-drawer>
      <v-toolbar fixed dark dense color="secondary" >
        <v-toolbar-side-icon @click.stop="sidenavOpen = !sidenavOpen"></v-toolbar-side-icon>
        <v-toolbar-title class="white--text">{{title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="logout">
        <v-icon>power_settings_new</v-icon>
      </v-btn>
    </v-toolbar>
    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
    <v-dialog v-model="alertOpen" max-width="760px">
      <v-card v-if="alertOpen && alertMessage" class="pa-1">
        <v-card-title>
          <h3><v-icon style="margin-top: -2px;" color="error">error</v-icon> <span class="error--text">FEHLER {{alertMessage.data.status_code}}</span></h3>
        </v-card-title>
        <v-card-text>
          <strong  v-if="alertMessage.data.result.message">{{alertMessage.data.result.message}}</strong>
          <div>
            <pre class="mt-2">{{alertMessage.data}}</pre>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="alertOpen = !alertOpen" color="primary" flat>OK</v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
  </div>
</template>
<script>
import EventBus, { LOADING, PROFILE_UPDATED, ERROR } from './event-bus'
import Auth from './Auth'
import router from '@/router'
import BI_BASE_CONFIG from '@/pnbi.base.config.js'

const tealiumEnabler = (a, b, c, d) => {
  a = '//tags.tiqcdn.com/utag/plan-net-training/b.zimmermann/dev/utag.js'
  b = document
  c = 'script'; d = b.createElement(c)
  d.src = a; d.type = 'text/java' + c
  d.async = true
  a = b.getElementsByTagName(c)[0]
  a.parentNode.insertBefore(d, a)
}

export default {
  mounted () {
    tealiumEnabler()
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
      () => {
        // console.info(error);
      }
    )
    EventBus.$on(PROFILE_UPDATED, profile => {
      if (typeof profile !== 'undefined') {
        this.profile.realname = profile.realname
      } else {
        this.profile.realname = undefined
      }
    })
    EventBus.$on(LOADING, status => {
      this.loading = status
    })
    EventBus.$on(ERROR, this.showError)
  },
  props: {
    login: Function
  },
  data () {
    return {
      alertMessage: null,
      loading: false,
      sidenavOpen: false,
      alertOpen: false,
      showNavigation: false,
      profile: {
        realname: undefined
      }
    }
  },

  methods: {
    showError (alert) {
      this.alertMessage = alert
      this.alertOpen = true
    },
    logout () {
      Auth.logout()
        .then(val => {
          router.push({ name: 'login' })
        })
        .catch(error => {
          router.push({ name: 'login' })
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
      const isVis =
        ['login', 'reset', 'forbidden'].indexOf(this.$route.name) === -1
      return isVis
    }
  }
}
</script>


<style scoped>
div >>> .account-icon{
  font-size: 66px;
}

pre {
  overflow: scroll;
  word-wrap: break-word;
  border: 1px solid rgba(100, 100, 100, 0.1);
}
.username {
  font-size: 16px;
}
.progress-linear {
  position: absolute;
  z-index: 10;
  top: 48px;
  margin: 0;
}
.toolbar__title {
  text-align: center;
  font-weight: 800;
  font-size: 1.9rem;
  letter-spacing: -1px;
  cursor: pointer;
  text-transform: uppercase;
}
.account-icon {
  font-size: 66px;
}
.user-image {
  position: relative;
}
.user-image  .chip {
  position: absolute;
  top: -10px;
  left: 45px;
}
.user-background {
  background: rgba(0, 0, 0, 0.2);
}
</style>