<script>
import Auth from '@/services/Auth'
import router from '@/router'
export default {
  props: {
    login: Function
  },
  data () {
    return {
      showNavigation: false
    }
  },

  methods: {
    logout () {
      Auth.logout().then(val => {
        router.push('/')
      })
    }
  },
  created () {},
  computed: {}
}
</script>
<template>
    <div class="navbar">
        <md-toolbar class="md-dense">
            <div class="md-toolbar-row">
                <div class="md-toolbar-section-start">
                    <md-button class="md-icon-button" v-on:click="showNavigation = true">
                        <md-icon>menu</md-icon>
                    </md-button>
                </div>
                    <h3 class="bi-navbar-title">CORE</h3>
                <div class="md-toolbar-section-end">
                    <md-button class="md-icon-button"  v-on:click="logout">
                        <md-icon>power_settings_new</md-icon>
                    </md-button>
                </div>
            </div>
        </md-toolbar>
        <md-drawer :md-active.sync="showNavigation">
            <md-toolbar class="md-transparent" md-elevation="0">
            </md-toolbar>
            <div class="bi-profile-container md-layout">
                 <div class="bi-profile-image md-layout-item md-layout md-alignment-center md-size-33">
                    <md-icon>account_circle</md-icon>
                 </div>
                  <span class="md-layout-item  md-size-66">
                    <div class="bi-user-name">User</div>
                    <div class="bi-user-mail">Mail</div>
                  </span>
            </div>
            <md-list>
            <!--     <md-list-item class="bi-profile-container">
                  <div class="bi-profile-image">
                    <md-icon>account_circle</md-icon>
                    <span class="md-list-item-text">
                      <p class="b-user-name">User</p>
                      <p class="b-user-mail">Mail</p>
                    </span>
                  </div>
                </md-list-item> -->
                <md-list-item>
                </md-list-item>
                <md-list-item>
                    <md-icon>move_to_inbox</md-icon>
                    <span class="md-list-item-text">Inbox</span>
                </md-list-item>
            </md-list>
        </md-drawer>
    </div>
</template>
<style lang="scss">
.navbar {
  .md-toolbar.md-theme-default {
    background-color: rgba(0, 0, 0, 0.95);
    .md-icon,
    .md-button,
    h3 {
      color: #ffffff;
      margin: 0;
    }
  }
  .bi-navbar-title {
    text-align: center;
    font-weight: 800;
    font-size: 1.9rem;
    letter-spacing: -1px;
    cursor: pointer;
    text-transform: uppercase;
  }
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
  .md-toolbar-row,
  .md-drawer .md-toolbar {
    min-height: 52px;
  }
  .md-list {
    padding-top: 0;
  }
  .bi-profile-container {
    background-color: rgba(0, 0, 0, 0.066);
    padding-top: 1rem;
    padding-bottom: 1rem;
    .bi-profile-image {
      width: 64px;
      height: 64px;
      i.md-icon {
        font-size: 48px !important;
        line-height: 48px;
      }
    }
  }
}
</style>
