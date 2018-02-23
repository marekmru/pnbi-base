<script>
/* eslint-disable  */
import router from "@/router";
import Auth from "./Auth";

export default {
  mounted() {},
  components: {},
  data() {
    return {
      dummy: null,
      strength: 0,
      user: {
        password: "",
        password2: ""
      },
      rules: {
        valid: false,
        passwordRules: [
          v => !!v || "Passwort ist ein Pflichtfeld",
          v => v.length >= 6 || "Passwort muss mindestens 6 Zeichen lang sein"
        ],
        passwordRules2: [
          v => !!v || "Passwort ist ein Pflichtfeld",
          v => v.length >= 6 || "Passwort muss mindestens 6 Zeichen lang sein",
          v => this.isValid || "Passwörter sind nicht identisch"
        ]
      }
    };
  },
  methods: {
    toLogin() {
      router.go("login");
    },
    focus() {
      this.errorAuth = false;
      this.$refs.form.validate();
    },
    goToLogin() {
      router.push("/");
    },
    onSubmit() {
      Auth.reset({
        password: this.user.password,
        password_code: this.$route.params.code
      })
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    },
    onChange(data) {
      if (this.user.password.length > 0) {
        Auth.password({
          password: this.user.password
        })
          .then(response => {
            this.strength = Math.round(response.strength * 100) / 100;
          })
          .catch(err => {
            console.log(err);
        });
      }
    }
  },
  computed: {
    isValid: {
      get: function() {
        const valid = this.user.password === this.user.password2;
        return valid;
      }
    },
    progress() {
      return Math.min(100, this.user.password.length * 10);
    },
    color() {
      const prog = Math.floor(this.progress / 28)
      if (prog<3){
        return ["error", "warning", "success"][Math.floor(this.progress / 28)];
      }else {       
        return ["error", "warning", "success"][2]
      }
      ;
    },
  },
  created() {}
};
</script>

<template>
  <div class="page" id="login">
    <v-container class="page" id="login" fluid="" fill-height>
      <v-layout align-center>
        <v-flex class="text-center">
          <h1 class="bi-powered">POWERED BY CORE</h1>
          <v-form ref="form"> 
          <v-card >
            <v-card-title class="pb-0 title">
              <h2 class="mb-3">Neues Passwort</h2>
            </v-card-title>
            <v-card-text class="pb-0" v-model="rules.valid">              
              <v-text-field type="password" @focus="focus" label="Neues Passwort" v-model="user.password" :rules="rules.passwordRules" @input="onChange" required></v-text-field>
              <v-card-text class="pt-0 pb-0 progress-bar">
                <span>Passwortstärke:</span>
                <v-progress-linear slot="progress" :value="progress" height="5" :color="color"></v-progress-linear>
              </v-card-text>
              <v-text-field type="password" @focus="focus" label="Passwort wiederholen" v-model="user.password2" :rules="rules.passwordRules2" required></v-text-field>
              <v-btn block color="primary" type="submit" :disabled="!isValid" @click="onSubmit">Neues Passwort setzen</v-btn>
              <v-btn @click="goToLogin" flat block>Zurück zum Login</v-btn>
            </v-card-text>
          </v-card>
        </v-form>   
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<style lang="scss">
.input-group__details{
  // proides to see the bottom border of input field inside Cards even if padding is changed
  margin-top: 3px;
}
.progress-bar{
  margin-bottom: -10px;
  margin-top: 8px;
}
.title{
  margin-top: -16px;
}
.spacing-inside-card-text{
  padding-top:0px;
}
.card {
  max-width: 520px;
  margin: 0 auto;
  padding: 0 12px 24px 12px;
}
.pw-strength {
  border-radius: 3px;
  margin: 0 -7px 0 -7px;
  padding: 4px 12px 4px 12px;
  color: white;
  &.pw-weak {
    background-color: #d70f14;
  }
  &.pw-strong {
    background-color: #0a7db4;
  }
}
</style>
