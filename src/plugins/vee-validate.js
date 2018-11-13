import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
// import Auth from './Auth'
// import de from 'vee-validate/dist/locale/de'

Vue.use(VeeValidate, {
  aria: false
})

const dictionary = {
  de: {
    messages: {
      auth: `Bitte überprüfen Sie ihren Namen und das Passwort.`,
      emailreset: `Die E-Mail Adresse wurde nicht gefunden.`,
      passwordscore: `Das gewählte Passwort ist nicht sicher genug.`,
      confirmspecial: `Die Passwörter stimmen nicht überein.`
    }
  },
  en: {
    messages: {
      auth: `Please translate me`,
      emailreset: `Please translate me`,
      passwordscore: `Please translate me`,
      confirmspecial: `Please translate me`
    }
  }
}
Validator.localize('de', dictionary.de)

/* Validator.extend('caps', {
  validate (value) {
    return /^[A-Z]$/.test(value);
  },
  getMessage (field) {
    return `The ${field}` must only contain capitalized characters`;
  }
}); */

/* const dictionary2 = Validator.dictionary
Validator.extend('auth', {
  validate: value => {
    return projects
      .uniqueProjectName(value, this.$route.params.id)
      .then(unique => {
        if (unique) {
          return {
            valid: true
          }
        }
        return {
          valid: false,
          data: {
            message: 'Der Projektname ist bereits vergeben.'
          }
        }
      })
  },
  getMessage (field, params, data) {
    return dictionary.getFieldMessage(Validator.locale, field, data)
  }
}) */
