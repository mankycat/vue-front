import Vue from 'vue'
Vue.filter('formatDate', formatDate)
Vue.prototype.formatDate = formatDate
function formatDate (value) {
  if (value === undefined) {
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

Vue.filter('formatDateTime', function formatDateTime (value) {
  if (value === undefined) {
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
})
