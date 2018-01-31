<script>
import router from '@/router'
import LoginForm from './LoginForm'
import ForgotForm from './ForgotForm'
import Auth from './Auth'
import BI_BASE_CONFIG from '@/pnbi.base.config.js'

export default {
  mounted () {
    Auth.profile().then(() => {
      router.push(BI_BASE_CONFIG.MAIN_ROUTE)
    }, () => {
    })
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
    setState (name) {
      this.state = name
    }
  },
  created () {}
}
</script>
<template>
    <div class="page" id="login">
        <login-form v-if="state === 'login'" :setState="setState"></login-form>
         <forgot-form v-if="state === 'forgot'" :setState="setState"></forgot-form>
    </div>
</template>

<style lang="scss">
@import "./Login.scss";
</style>
