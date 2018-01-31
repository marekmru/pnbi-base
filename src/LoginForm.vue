<script>
import router from '@/router'
import Auth from './Auth'
import BI_BASE_CONFIG from '@/pnbi.base.config.js'
export default {
  props: {
    setState: Function
  },
  mounted () {
  },
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      errorMessage: null
    }
  },

  methods: {
    validateBeforeSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.onSubmit()
        }
      })
    },
    onSubmit () {
      this.errorMessage = null
      Auth.login(this.user).then(
        () => {
          router.push(BI_BASE_CONFIG.MAIN_ROUTE)
        },
        error => {
          if (error.status === 401) {
            this.errorMessage =
              'Bitte überprüfen Sie ihren Namen und das Passwort.'
          }
        }
      )
    }
  },
  computed: {
    isValid () {
      return (this.user.username !== '') && (this.user.password !== '')
    }
  }
}
</script>
<template>
    <form @submit.prevent="validateBeforeSubmit"
    class="login-form md-layout md-gutter md-alignment-center-center">
        <div class="md-layout-item md-size-33 bi-card-container" >
          <h1 class="bi-powered">POWERED BY CORE</h1>
          <md-card>
              <md-card-header>
                  <div class="md-title bi-headline">CORE</div>
              </md-card-header>
              <md-card-content>
                  <md-field :class="{'md-input-invalid': errors.has('username')}">
                      <label for="username">Nutzername*</label>
                      <md-input v-model="user.username"
  data-vv-name="Nutzername" type="text" v-validate name="username" data-vv-rules="required|min:4"></md-input>
                      <p class="md-error" v-show="errors.has('Nutzername')">{{ errors.first('Nutzername') }}</p>
                  </md-field>
                  <md-field :class="{'md-input-invalid': errors.has('password')}">
                      <label for="password">Passwort*</label>
                      <md-input v-model="user.password" data-vv-name="Passwort" type="password" v-validate name="password" data-vv-rules="required"></md-input>
                      <p class="md-error" v-show="errors.has('Passwort')">{{ errors.first('Passwort') }}</p>
                      <p class="md-error" v-if="errorMessage">{{ errorMessage }}</p>
                  </md-field>
              </md-card-content>
              <md-card-actions>
                  <md-button type="submit" :disabled='errors.any() || !isValid' class="bi-login-button md-raised md-primary">LOGIN</md-button>
              </md-card-actions>
              <md-card-actions>
                  <md-button v-on:click="setState('forgot')" class="bi-login-button">Paswort zurücksetzen</md-button>
              </md-card-actions>
          </md-card>
          <div class="bi-copyright">© 2018</div>
        </div>
    </form>
</template>
<style lang="scss">
@import "./forms.scss";
</style>



/* 
import { Validator } from 'vee-validate';

export default {
  name: 'coupon-example',
  data: () => ({
    coupon: '',
    price: 100,
    discounted: false
  }),
  computed: {
    discountedPrice() {
      return this.discounted ? this.price - (0.2 * this.price) : this.price;
    }
  },
  methods: {
    applyCoupon() {
      this.$validator.validate('coupon', this.coupon).then((result) => {
        this.discounted = result;
      });
    }
  },
  created() {
    Validator.extend('verify_coupon', {
      getMessage: field => `The ${field} is not a valid coupon.`,
      validate: value => new Promise((resolve) => {
        // API call or database access.
        const validCoupons = ['SUMMER2016', 'WINTER2016', 'FALL2016'];

        setTimeout(() => {
          resolve({
            valid: value && validCoupons.indexOf(value.toUpperCase()) !== -1
          });
        }, 500);
      })
    });
    this.$validator.attach({
      name: 'coupon',
      rules: 'required|verify_coupon'
    });
  }
}; */