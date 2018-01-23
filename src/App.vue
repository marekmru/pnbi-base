<script>
import Navbar from '@/components/Navbar'
import Auth from '@/services/Auth'
// import router from './router'
export default {
  mounted () {
    Auth.profile()
  },
  components: {
    Navbar
  },
  methods: {},
  created () {},
  data () {
    return {}
  },
  computed: {
    isNavVisible () {
      const isVis =
        ['login', 'reset'].indexOf(
          this.$route.name
        ) === -1
      return isVis
    }
  }
}
</script>

<template>
    <div id="app">
      <navbar v-if="isNavVisible"></navbar>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
</template>

<style lang="scss">
@import "./style/app.scss";
@import "./style/transitions.scss";
</style>
