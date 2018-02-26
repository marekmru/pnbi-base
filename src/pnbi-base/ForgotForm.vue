<script>
import Auth from './Auth'

// import Auth, { unwrap } from './Auth'

export default {
  props: {
    setState: Function
  },
  mounted () {

  },
  data () {
    return {
      errorEmail400: undefined,
      user: {
        email: ''
      },
      rules: {
        valid: false,
        emailRules: [
          v => !!v || 'E-mail ist ein Pflichtfeld',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail muss valide sein',
          v => !this.errorEmail400 || 'Die E-Mail Adresse wurde nicht gefunden.'
        ]
      },
      message: undefined
    }
  },

  methods: {
    onEmailFocus () {},
    validateBeforeSubmit () {},
    /*
    onEmailFocus () {
      this.errors.clear()
    },
    validateBeforeSubmit () {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.onSubmit()
        }
      })
    }, */
    focus () {
      this.errorEmail400 = false
      this.$refs.form.validate()
    },
    toLogin () {
      this.setState('login')
    },
    onSubmit () {
      this.message = undefined
      this.errorEmail400 = false
      Auth.reset(this.user)
        .then(response => {
          this.message = {
            success: true,
            text:
              'Eine Email mit einem Link zum zurücksetzen ihres Passwortes wurde an folgende Adresse geschickt:'
          }
        })
        .catch(() => {
          this.errorEmail400 = true
          this.$refs.form.validate()
        })
    }
  },
  computed: {}
}
</script>

<template>
  <v-container fill-height>
    <v-layout align-center>
      <v-flex class="text-center">
        <h1 class="bi-powered">POWERED BY CORE</h1>
        <v-card v-if="!message">
          <v-card-title>
            <v-layout  column>
              <h2>Passwort zurücksetzen</h2>
              <v-form  @submit="onSubmit" v-model="rules.valid" ref="form" lazy-validation>
                <v-text-field @focus="focus" label="Ihre E-Mail Adresse" v-model="user.email" :rules="rules.emailRules" required></v-text-field>
              <v-btn class="mt-4" :disabled="!rules.valid" block color="primary" type="submit">Anfordern</v-btn>
              </v-form>
            </v-layout>
          </v-card-title>
          <v-card-actions class="white">
            <v-layout align-center column>
              <v-btn @click="toLogin" flat block>Zurück zum Login</v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
        <v-card v-if="message">
          <v-card-title>
            <v-layout column>
              <h2>Email wurde erfolgreich versandt</h2>
              <v-btn @click="toLogin" flat block>Zurück zum Login</v-btn>
            </v-layout>
          </v-card-title>  
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>  
</template>

<style scoped lang="scss">
.card {
  max-width: 520px;
  margin: 0 auto;
  padding: 0 12px 24px 12px;
}
.container {
  h1.bi-headline {
    text-align: center;
    font-size: 36px;
    font-weight: 800;
    letter-spacing: 4px;
    margin: 0 0 0px;
    text-align: center;
    text-transform: uppercase;
  }
  .bi-copyright,
  .bi-powered {
    user-select: none;
    width: 100%;
    text-align: center;
  }
  .bi-copyright {
    margin-top: 3px;
    color: rgba(255, 255, 255, 0.6);
  }
  .bi-powered {
    color: rgba(255, 255, 255, 0.2);
    font-weight: 800;
    line-height: 1.44;
    margin: -5px 0 0;
    @media (max-width: 600px) {
      line-height: 2;
      font-size: 24px;
    }
  }
}
</style>


