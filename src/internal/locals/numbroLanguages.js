/*
* You can easily define your own language.
* All templates for langualges are already defined in node_modules/numbro/languages
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
