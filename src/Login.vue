<script>
// import router from '@/router'
import LoginForm from './LoginForm'
import ForgotForm from './ForgotForm'

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
      state: undefined,
      bla: undefined
    }
  },
  methods: {
    setState (name) {
      this.state = name
    },
    dosom (a) {
      this.bla = a
    }
  },
  created () {
  }
}
</script>
<template>
    <div class="page" id="login">
        <login-form v-if="state === 'login'" :setState="setState"></login-form>
         <forgot-form v-if="state === 'forgot'" :setState="setState"></forgot-form>
    </div>
</template>

<style lang="scss">

</style>
