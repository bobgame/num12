import dayjs from 'dayjs'
export function getFullTime(day = 0) {
  const addEnd = dayjs('1001-1-1').add(day, 'day')
  const timeString = `${addEnd.year() - 1000}年${addEnd.month() + 1}月${addEnd.date()}日`
  return timeString
}
export function getYearMonth(day = 0) {
  const addEnd = dayjs('1001-1-1').add(day, 'day')
  const timeString = `${addEnd.year() - 1000}年${addEnd.month() + 1}月`
  return timeString
}
