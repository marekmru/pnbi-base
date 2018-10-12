import numeral from 'numeral'
import moment from 'moment'
import { Validator } from 'vee-validate'
import de from 'vee-validate/dist/locale/de'
// numeral
numeral.register('locale', 'de', {
  delimiters: {
    thousands: '.',
    decimal: ','
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'b',
    trillion: 't'
  },
  ordinal: function (number) {
    return '.'
  },
  currency: {
    symbol: '€'
  }
})
numeral.locale('de')
// moment
moment.locale('de')
// Vee-Validator
Validator.localize('de', de)
