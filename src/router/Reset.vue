<script>
import ResetForm from '@/components/ResetForm'
import Auth from '@/services/Auth'
// import router from '@/router'
export default {
  mounted () {
  },
  components: {
    ResetForm
  },
  data () {
    return {
    }
  },
  methods: {
    reset (dataCode) {
      return Auth.reset(dataCode)
    }
  },
  created () {}
}
</script>
<template>
    <div class="page" id="login">
        <reset-form :reset="reset"></reset-form>
    </div>
</template>

<style lang="scss">
@import "./Login.scss";
</style>
