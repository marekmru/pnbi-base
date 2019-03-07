<template>
  <!--   <div class="Password pt-1">
    <div class="Password__strength-meter">
      <div class="Password__strength-meter--fill" :data-score="passwordStrength"></div>
    </div>
      <div class="Password__label grey--text pt-1">{{feedback.warning}}</div>
      <ul>
        <li v-for="suggestion in feedback.suggestions" :key="suggestion">{{suggestion}}</li>
      </ul>
  </div> -->
<!--   <v-alert :data-score="passwordStrength" :value="true" class="pt-2 pb-2">
      <h3 class="subheading">Password strength: <strong>{{passwordStrength}}</strong></h3>
      <p class="mt-2 mb-1">{{feedback.warning}}</p>
      <ul class="mt-1">
        <li v-for="suggestion in feedback.suggestions" :key="suggestion">{{suggestion}}</li>
      </ul>
  </v-alert> -->
  <div class="Password mt-2">
    <div class="Password__strength-meter">
      <div class="Password__strength-meter--fill" :data-score="passwordStrength"></div>
    </div>
    <div style="position: absolute; top: 4px;" class="grey--text caption">Passwortsicherheit</div>
    <div class="Password__score pr-2">
      <div class="text-xs-right">
        <div class="caption Password__score--0" v-if="passwordStrength === 0">Sehr schwach</div>
        <div class="caption Password__score--1" v-if="passwordStrength === 1">Schwach</div>
        <div class="caption Password__score--2" v-if="passwordStrength === 2">Ok</div>
        <div class="caption Password__score--3" v-if="passwordStrength === 3">Gut</div>
        <div class="caption Password__score--4" v-if="passwordStrength === 4">Großartig</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {

  props: {
    id: {
      type: String,
      default: 'password'
    },
    password: {
      type: String
    },
    secureLength: {
      type: Number,
      default: 7
    }
  },
  data () {
    return {
      feedback: 'Passwortstärke'

    }
  },

  methods: {},

  computed: {
    passwordStrength () {
      return this.password ? window.zxcvbn(this.password).score : null
    },
    isSecure () {
      return this.password ? this.password.length >= this.secureLength : null
    },
    passwordCount () {
      return this.password && (this.password.length > this.secureLength ? `${this.secureLength}+` : this.password.length)
    }
  },

  watch: {
    passwordStrength (score) {
      this.$emit('score', score)
      this.feedback = window.zxcvbn(this.password).feedback
    }
  }
}
</script>

<style lang="scss">

  .Password {
    width: 100%;
    margin: 0 0 12px 0;
    position: relative;
  }

  .Password__score {
    position: absolute;
    right: 0;
  }
  .Password__strength-meter {
    position: relative;
    height: 3px;
    background: #DDD;
    margin: 0 6px 0 0;
    border-radius: 3px;
  }

  .Password__strength-meter--fill {
    background: transparent;
    height: inherit;
    position: absolute;
    width: 0;
    border-radius: inherit;
    transition: width 0.5s ease-in-out, background 0.25s;
  }

  .Password__strength-meter--fill[data-score='0'],
    {
    background: #ff6400;
    width: 20%;
  }

  .Password__strength-meter--fill[data-score='1'] {
    background: #ee3e70;
    width: 40%;
  }

  .Password__strength-meter--fill[data-score='2'] {
    background: #a4539c;
    width: 60%;
  }

  .Password__strength-meter--fill[data-score='3'] {
    background: #545d8e;
    width: 80%;
  }

  .Password__strength-meter--fill[data-score='4'] {
    background: #3f515d;
     width: 100%;
  }
  .Password__score--0{
    color: #ff6400;
  }
  .Password__score--1{
    color: #ee3e70;
  }
  .Password__score--2{
    color: #a4539c;
  }
  .Password__score--3{
    color: #545d8e;
  }
  .Password__score--4{
    color: #3f515d;
  }
</style>
