<template>
  <div>
       <md-dialog :md-active.sync="active">
          <md-dialog-title>Neues Projekt</md-dialog-title>
            <form>
              <div class="">
                <md-field :class="{'md-input-invalid': errors.has('Projektname')}">
                  <label for="projectname">Projektname*</label>
                  <md-input v-model="projectName"
                    @focus="errors.clear()"
                    @keyup="onChange"
                    data-vv-name="Projektname" type="text" v-validate name="projectname" data-vv-rules="required|min:6"/>
                  <p class="md-error" v-show="errors.has('Projektname')">{{ errors.first('Projektname') }}</p>
                  <p class="md-error" v-show="errors.has('notunique')">{{ errors.first('notunique') }}</p>
                </md-field>
              </div>
            </form>
          <md-dialog-actions>
            <md-button class="md-primary" @click="active = false">Abbrechen</md-button>
            <md-button class="md-primary" :disabled="errors.any() || !isValid" @click="validateBeforeSubmit">Erstellen</md-button>
          </md-dialog-actions>
    </md-dialog>
    <md-button class="md-fab md-primary" @click="active = !active">
        <md-icon>add</md-icon>
    </md-button>
  </div>
</template>

<script>
import projects from '@/api/projects'
import { mapActions, mapGetters } from 'vuex'
import router from '@/router'
export default {
  components: {
  },
  data () {
    return {
      active: false,
      projectName: ''
    }
  },
  computed: {
    ...mapGetters({
      project: 'project'
    }),
    isValid () {
      return this.projectName.length > 5
    }
  },
  watch: {
    project: (val) => {
      router.push('/')
    }
  },
  methods: {
    ...mapActions([
      'create'
    ]),
    validateBeforeSubmit () {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.create(this.projectName)
        }
      })
    },
    onChange (value) {
      if (this.projectName.length > 5) {
        projects.uniqueProjectName(this.projectName).then(unique => {
          if (unique === false) {
            this.errors.add('notunique', 'Der Projektname existiert bereits.')
          } else {
            this.errors.clear()
          }
        })
      }
    }
  }
}
</script>
<style scoped lang="scss">
form {
  padding: 0 24px 12px 24px;
  height: auto;
}
.md-fab {
  z-index: 1000;
  position: fixed;
  right: 32px;
  bottom: 20px;
}
</style>
