<template>
  <div v-if="isNavVisible">
    <v-navigation-drawer v-model="sidenavOpen" fixed clipped class="grey lighten-4" app>
      <slot name="navigation-slot"></slot>
      <v-list dense class="grey lighten-4">
          <v-divider dark class="my-3"></v-divider>
    
          <v-list-tile to="profile">
            <v-list-tile-action>
              <v-avatar color="grey">
                <span class="white--text">{{profile.short}}</span>
              </v-avatar>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title >
                Profile
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

<!--           <v-list-tile to="privacy-policy-3">
            <v-list-tile-action>
              <v-icon>question_answer</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title >
                About
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile> -->

          <v-list-tile to="privacy-policy">
            <v-list-tile-action>
              <v-icon>visibility_off</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title >
                Datenschutz
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile to="imprint">
            <v-list-tile-action>
              <v-icon class="impressum">§</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title >
                Impressum
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="logout()">
            <v-list-tile-action>
              <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjNzU3NTc1IiBkPSJNMTkyIDI3Ny40aDE4OS43bC00My42IDQ0LjdMMzY4IDM1Mmw5Ni05Ni05Ni05Ni0zMSAyOS45IDQ0LjcgNDQuN0gxOTJ2NDIuOHoiLz48cGF0aCBmaWxsPSIjNzU3NTc1IiBkPSJNMjU1LjcgNDIxLjNjLTQ0LjEgMC04NS41LTE3LjItMTE2LjctNDguNC0zMS4yLTMxLjItNDguMy03Mi43LTQ4LjMtMTE2LjkgMC00NC4xIDE3LjItODUuNyA0OC4zLTExNi45IDMxLjItMzEuMiA3Mi42LTQ4LjQgMTE2LjctNDguNCA0NCAwIDg1LjMgMTcuMSAxMTYuNSA0OC4ybDMwLjMtMzAuM2MtOC41LTguNC0xNy44LTE2LjItMjcuNy0yMy4yQzMzOS43IDYxIDI5OC42IDQ4IDI1NS43IDQ4IDE0MS4yIDQ4IDQ4IDE0MS4zIDQ4IDI1NnM5My4yIDIwOCAyMDcuNyAyMDhjNDIuOSAwIDg0LTEzIDExOS0zNy41IDEwLTcgMTkuMi0xNC43IDI3LjctMjMuMmwtMzAuMi0zMC4yYy0zMS4xIDMxLjEtNzIuNSA0OC4yLTExNi41IDQ4LjJ6TTQ0OC4wMDQgMjU2Ljg0N2wtLjg0OS0uODQ4Ljg0OS0uODQ5Ljg0OC44NDl6Ii8+PC9zdmc+"
                width="22px" height="22px" title="logout" />
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Logout
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

      </v-list>
    </v-navigation-drawer>
    <v-toolbar dense color="secondary" class="white--text" app absolute clipped-left>
      <v-toolbar-side-icon class="white--text" @click.native="sidenavOpen = !sidenavOpen"></v-toolbar-side-icon>
      <slot name="title-slot"></slot>
    </v-toolbar>
    <v-content class="pt-0">
      <v-container fluid fill-height class="grey lighten-4">
      <v-layout class="pt-1">
        <v-flex>
          <slot name="router"></slot>
        </v-flex>
      </v-layout>
      </v-container>
    </v-content>

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
   <v-content v-else class="pa-0  ma-0 auth-routes">
      <v-container fluid fill-height class="grey lighten-4">
      <v-layout class="pa-0  ma-0">
        <v-flex class="pa-0  ma-0">
          <router-view/>
        </v-flex>
      </v-layout>
      </v-container>
    </v-content> 
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
        sidenavOpen: null,
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
            const isVis = ["login", "reset"].indexOf(this.$route.name) === -1;
            return isVis;
          }
        }
    };

</script>


<style lang="css">

  .application.theme--light{
    background: rgb(245, 245, 245)
  }
  .impressum {
    width: 22px;
    margin-top: -7px;
    text-align: center;
  }
  .navigation-drawer__border {
    display: none;
  }
</style>
<style scoped lang="css">
  .list__tile .avatar span{
    font-weight: 700;
    letter-spacing: -0.1em;
    font-size: 14px;
    line-height: 14px;
    margin-left: -1px;
  }

  .list__tile .avatar{
    background-color: rgba(0,0,0,.54) !important;
    height: 24px !important;
    width: 24px !important;
  }
  .list__tile--active .avatar{
    background-color: #d70f14 !important;
  }
/*    div>>>.account-icon {
    font-size: 66px;
  } */
/*   div>>>.navigation-drawer>.default-navigation-list .list__tile--active .list__tile__title{
    color: green !important
  }    */
 
  .auth-routes>>>.container{
    padding: 0;
  }
  .auth-routes>>>.content--wrap{
    padding-top: 0;
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
