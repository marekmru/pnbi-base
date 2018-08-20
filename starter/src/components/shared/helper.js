import moment from 'moment'

export function getWeekUnix (weekIndex, year) {
  const d = moment()
    .day('Monday')
    .year(year)
    .week(weekIndex)
    .startOf('week')
    .unix()
  return d
}
export function getWeekNumber (d) {
  d = new Date(+d)
  d.setHours(0, 0, 0)
  d.setDate(d.getDate() + 4 - (d.getDay() || 7))
  var yearStart = new Date(d.getFullYear(), 0, 1)
  var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
  return [d.getFullYear(), weekNo]
}
export default {
  getWeekUnix,
  getWeekNumber
}
