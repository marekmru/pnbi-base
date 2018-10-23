import moment from 'moment'
import { Validator } from 'vee-validate'
import de from 'vee-validate/dist/locale/de'
moment.locale('de')
// Vee-Validator
Validator.localize('de', de)
