<script>
import Projects from '@/services/Projects'
export default {
  mounted () {
    Projects.getAll().then(response => {
      this.projects = response
    })
  },
  components: {},
  methods: {},
  data () {
    return {
      projects: null
    }
  },
  created () {

  }
}
</script>
<template>
    <div id="overview" class="bi-page md-layout md-gutter md-alignment-center">
       <md-card class="md-layout-item md-size-25">
        <md-card-header>
          <div class="md-title">Test Page</div>
        </md-card-header>
        <md-card-content>
            <router-link to="/">Zurück</router-link>
        </md-card-content>
        <md-card-actions>
        </md-card-actions>
    </md-card>

    </div>
</template>
<style scoped>
#overview {
}
</style>
