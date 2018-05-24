<template>
  <div v-if="isNavVisible">
    <v-navigation-drawer v-model="sidenavOpen" fixed temporary clipped>
      <v-card>
        <v-card-media height="48px" style="background:rgb(0, 0, 0)"></v-card-media>
      </v-card>
      <v-layout class="user-background" py-3 column>
        <v-flex>

          <v-layout row>
            <v-flex xs5 class="pl-2 user-image">
              <v-icon color="grey" class="account-icon">account_circle</v-icon>
              <v-chip v-if="profile.admin" color="primary" text-color="white">Admin</v-chip>
            </v-flex>
            <v-flex>
              <v-layout column class="pt-3">
                <v-layout>
                  <v-flex>
                    <strong class="grey--text">{{profile.realname}}</strong>
                  </v-flex>
                </v-layout>
                <v-layout v-if="profile.email" justify-center>
                  <v-flex>
                    <span class="grey--text">{{profile.email}}</span>
                  </v-flex>
                </v-layout>
              </v-layout>
            </v-flex>
          </v-layout>


        </v-flex>
        <v-layout>
          <v-flex xs3 class="pt-2">
          </v-flex>
        </v-layout>
      </v-layout>
      <v-layout column>
        <v-flex>
          <slot name="navigation-slot"></slot>
        </v-flex>
      </v-layout>

      <v-list dense class="default-navigation-list grey lighten-4 pt-0 pb-0">
          <v-divider dark></v-divider>
          <v-list-tile @click="goto('privacy')">
            <v-list-tile-action>
              <v-icon>visibility_off</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="grey--text">
                Datenschutz
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="goto('imprint')">
            <v-list-tile-action>
              <v-icon class="pl-2" style="margin-top: -8px; margin-left: -3px;">§</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="grey--text">
                Impressum
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
      </v-list>

    </v-navigation-drawer>
    <v-toolbar fixed dark dense color="secondary">
      <v-toolbar-side-icon @click.stop="sidenavOpen = !sidenavOpen"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="logout">
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSJ3aGl0ZSIgZD0iTTE5MiAyNzcuNGgxODkuN2wtNDMuNiA0NC43TDM2OCAzNTJsOTYtOTYtOTYtOTYtMzEgMjkuOSA0NC43IDQ0LjdIMTkydjQyLjh6Ii8+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0yNTUuNyA0MjEuM2MtNDQuMSAwLTg1LjUtMTcuMi0xMTYuNy00OC40LTMxLjItMzEuMi00OC4zLTcyLjctNDguMy0xMTYuOSAwLTQ0LjEgMTcuMi04NS43IDQ4LjMtMTE2LjkgMzEuMi0zMS4yIDcyLjYtNDguNCAxMTYuNy00OC40IDQ0IDAgODUuMyAxNy4xIDExNi41IDQ4LjJsMzAuMy0zMC4zYy04LjUtOC40LTE3LjgtMTYuMi0yNy43LTIzLjJDMzM5LjcgNjEgMjk4LjYgNDggMjU1LjcgNDggMTQxLjIgNDggNDggMTQxLjMgNDggMjU2czkzLjIgMjA4IDIwNy43IDIwOGM0Mi45IDAgODQtMTMgMTE5LTM3LjUgMTAtNyAxOS4yLTE0LjcgMjcuNy0yMy4ybC0zMC4yLTMwLjJjLTMxLjEgMzEuMS03Mi41IDQ4LjItMTE2LjUgNDguMnpNNDQ4LjAwNCAyNTYuODQ3bC0uODQ5LS44NDguODQ5LS44NDkuODQ4Ljg0OXoiLz48L3N2Zz4="
          width="24px" height="24px" title="logout" />
        <!-- <v-icon>power_settings_new</v-icon> -->
      </v-btn>
    </v-toolbar>
    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
    <v-dialog v-model="alertOpen" max-width="760px">
      <v-card v-if="alertOpen && alertMessage" class="pa-1">
        <v-card-title>
          <h3>
            <v-icon style="margin-top: -2px;" color="error">error</v-icon>
            <span class="error--text">FEHLER {{alertMessage.data.status_code}}</span>
          </h3>
        </v-card-title>
        <v-card-text>
          <strong v-if="alertMessage.data.result.message">{{alertMessage.data.result.message}}</strong>
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
  import EventBus, {
    LOADING,
    PROFILE_UPDATED,
    ERROR
  } from "./event-bus";
  import Auth from "./Auth";
  import router from "@/router";
  import BI_BASE_CONFIG from "@/pnbi.base.config.js";

  export default {
    mounted() {
      Auth.profile().then(
        profile => {
          window.CORE = profile
          this.profile = profile;
        },
        () => {
          //console.info(error);
        }
      );
      EventBus.$on(PROFILE_UPDATED, profile => {
        if (typeof profile !== "undefined") {
          this.profile.realname = profile.realname;
        } else {
          this.profile.realname = undefined;
        }
      });
      EventBus.$on(LOADING, status => {
        this.loading = status;
      });
      EventBus.$on(ERROR, this.showError);
    },
    props: {},
    data() {
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
          goto(name){
            this.$router.push({name})
          },
          showError(alert) {
            this.alertMessage = alert;
            this.alertOpen = true;
          },
          logout() {
            Auth.logout()
              .then(val => {
                this.$router.push({
                  name: "login"
                })
              })
              .catch(error => {
                this.$router.push({
                  name: "login"
                })
              });
          }
        },
        created() {
          const title = BI_BASE_CONFIG.TITLE;
          if (typeof title === "undefined") {
            alert("NO BI_BASE_CONFIG.TITLE");
          }
          this.title = title || "CORE";
          document.title = title;
        },
        computed: {
          isNavVisible() {
            const isVis = ["login", "reset", "forbidden"].indexOf(this.$route.name) === -1;
            return isVis;
          }
        }
    };

</script>


<style scoped lang="css">
  div>>>.account-icon {
    font-size: 66px;
  }
  div>>>.navigation-drawer>.default-navigation-list .list__tile--active .list__tile__title{
    color: inherit !important
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
    font-weight: 400;
    font-size: 1.6rem;
    letter-spacing: 0px;
    cursor: pointer;
    text-transform: uppercase;
  }

  .account-icon {
    font-size: 66px;
  }

  .user-image {
    position: relative;
  }

  .user-image .chip {
    position: absolute;
    top: -10px;
    left: 45px;
  }

  .user-background {
    background: rgba(0, 0, 0, 0.2);
    background: rgb(245, 245, 245);
;
  }

</style>
