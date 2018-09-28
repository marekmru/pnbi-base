/*!
 * numbro.js language configuration
 * language : German
 * locale: Germany
 * author : Marco Krage : https://github.com/sinky
 *
 * Generally useful in Germany, Austria, Luxembourg, Belgium
 */

module.exports = {
  de: {
    languageTag: 'de-DE',
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
    ordinal: function () {
      return '.'
    },
    spaceSeparated: true,
    currency: {
      symbol: '€',
      position: 'postfix',
      code: 'EUR'
    },
    currencyFormat: {
      totalLength: 4,
      thousandSeparated: true
    }
  }
}
