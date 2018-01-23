<script>
import ForgotForm from '@/components/ForgotForm'
import LoginForm from '@/components/LoginForm'
import Auth from '@/services/Auth'
// import router from '@/router'
export default {
  mounted () {
    this.state = 'login'
  },
  components: {
    LoginForm,
    ForgotForm
  },
  data () {
    return {
      state: undefined
    }
  },
  methods: {
    login (user) {
      return Auth.login(user)
    },
    forgot (dataEmail) {
      return Auth.reset(dataEmail)
    },
    setState (name) {
      this.state = name
    }
  },
  created () {}
}
</script>
<template>
    <div class="page" id="login">
        <login-form v-if="state === 'login'" :login="login" :setState="setState"></login-form>
        <forgot-form v-if="state === 'forgot'"  :forgot="forgot" :setState="setState"></forgot-form>
    </div>
</template>

<style lang="scss">
@import "./Login.scss";
</style>
