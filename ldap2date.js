;(function() {
'use strict'

function pad2(num) {
  if (num < 10) return '0' + num
  return '' + num
}

var ldap2date = {
  getYear : function getYear(time) {
    return parseInt(time.substring(0, 4))
  },
  getMonth : function getMonth(time) {
    return parseInt(time.substring(4, 6)) - 1
  },
  getDay : function getDay(time) {
    return parseInt(time.substring(6, 8))
  },
  getHours : function getHours(time) {
    return parseInt(time.substring(8, 10))
  },
  getMinutes : function getMinutes(time) {
    return parseInt(time.substring(10, 12))
  },
  getSeconds : function getSeconds(time) {
    return parseInt(time.substring(12, 14))
  },
  getMilliseconds : function getMilliseconds(time) {
    return parseInt(time.substring(15, 18))
  },
  parse : function parse(time) {
    var date = new Date()
    date.setUTCFullYear(this.getYear(time))
    date.setUTCMonth(this.getMonth(time))
    date.setUTCDate(this.getDay(time))
    date.setUTCHours(this.getHours(time))
    date.setUTCMinutes(this.getMinutes(time))
    date.setUTCSeconds(this.getSeconds(time))
    date.setUTCMilliseconds(this.getMilliseconds(time))
    return date
  },
  toGeneralizedTime: function toGeneralizedTime(date) {
    return '' +
      date.getUTCFullYear() +
      pad2(date.getUTCMonth() + 1) +
      pad2(date.getUTCDate()) +
      pad2(date.getUTCHours()) +
      pad2(date.getUTCMinutes()) +
      pad2(date.getUTCSeconds()) + '.' +
      date.getUTCMilliseconds() + 'Z'
  }
}

if (typeof exports === 'object') {
  module.exports = ldap2date
} else {
  window.ldap2date = ldap2date
}
}())
