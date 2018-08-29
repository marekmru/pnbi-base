<template>
  <v-layout column>
    <h1 class="bc-page-title">Profile</h1>
    <v-flex class="text-center">
      <v-card>
        <v-card-text class="pa-0">
          <v-layout>
            <v-flex offset-xs0 xs12 class="avatar-container pb-3">
              <div>
                <v-avatar color="primary">
                  <span class="white--text">{{profile.short}}</span>
                </v-avatar>
              </div>
              <v-layout>
                <v-flex>
                  <h2 class="headline">
                    {{profile.realname}}
                    <v-chip v-if="profile.admin" color="accent" text-color="white">ADMIN</v-chip>
                  </h2>
                  <h3 class="subheadingfont text--grey lighten-2">
                    <span class="grey--text">{{profile.username}}</span>
                  </h3>
                  <h3 class="subheadingfont text--grey lighten-2">
                    <span class="grey--text ml-1">{{email}}
                      <v-icon v-if="email === 'No email'" color="orange" small>warning</v-icon>
                    </span>
                  </h3>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script>
import Auth from './Auth'

export default {
  created () {
    window.setTimeout(() => {
      Auth.profile().then(
        (val) => {
          this.profile = val
        },
        error => {
          console.log(error)
        }
      )
    }, 500)
  },
  computed: {
    email () {
      if (this.profile.email.length) {
        return this.profile.email
      }
      return 'No email'
    }
  },
  data () {
    return {
      profile: {
        short: '',
        admin: false,
        email: ''
      }
    }
  },
  props: {
    type: String
  },
  methods: {

  }
}

</script>
<style lang="scss" scoped>
.v-chip {
  margin-right: -36px;
  font-weight: 700 !important;
}
.avatar-container {
  border: 1px solid rgba(0, 0, 0, 0.1);
  > div:first-child {
    height: 70px;
    background: linear-gradient(to bottom, #232526, #414345);
    position: relative;
    margin-bottom: 52px;
  }
  > div:nth-child(2) {
    text-align: center;
  }
}

.v-avatar {
  width: 70px !important;
  height: 70px !important;
  position: absolute;
  bottom: -35px;
  left: calc(50% - 30px);
  box-shadow: 7px 7px 5px 0px rgba(50, 50, 50, 0.25);
  span {
    font-size: 40px;
    letter-spacing: -0.05em;
    margin-left: -5px;
    line-height: 40px;
    font-weight: 700;
  }
}
</style>
