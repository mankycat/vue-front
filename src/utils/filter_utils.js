import Vue from 'vue'
Vue.filter('formatDate', formatDate)
Vue.filter('formatDateTime', formatDateTime)
Vue.filter('dateToString', dateToString)
Vue.prototype.formatDate = formatDate
Vue.prototype.formatDateTime = formatDateTime
Vue.prototype.dateToString = dateToString
function formatDate (value) {
  if (value === undefined || value === '') {
    return
  }
  var date = strToDate(value)
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  return year + '-' + month + '-' + day
}

function strToDate (value) {
  value = value.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/(-)/g, '/')
  if (value.indexOf('.') > 0) {
    value = value.slice(0, value.indexOf('.'))
  }
  return new Date(value)
}

function formatDateTime (value) {
  if (value === undefined || value === '') {
    return
  }
  var date = strToDate(value)
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hours = date.getHours()
  var minutes = date.getMinutes()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes
}

function dateToString (value) {
  if (value === undefined || value === '') {
    return
  }
  var mm = value.getMonth() + 1 // getMonth() is zero-based
  var dd = value.getDate()

  return [value.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
  ].join('-')
}
