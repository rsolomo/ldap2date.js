;(function() {
'use strict'

function pad2(num) {
  if (num < 10) return '0' + num
  return '' + num
}

function pad4(num) {
  if (num < 10) return '000' + num
  if (num < 100) return '00' + num
  if (num < 1000) return '0' + num
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
    var minutes = parseInt(time.substring(10, 12))
    if (minutes) return minutes
    return 0
  },
  getSeconds : function getSeconds(time) {
    var seconds = parseInt(time.substring(12, 14))
    if (seconds) return seconds
    return 0
  },
  getMilliseconds : function getMilliseconds(time) {
    var startIdx
    if (time.indexOf('.') !== -1) {
      startIdx = time.indexOf('.') + 1
    } else if (time.indexOf(',') !== -1) {
      startIdx = time.indexOf(',') + 1
    } else {
      return 0
    }

    var stopIdx = time.length - 1
    var fraction = '0' + '.' + time.substring(startIdx, stopIdx)
    var ms = parseFloat(fraction) * 1000
    return ms
  },
  getTimeZone : function getTimeZone(time) {
    var length = time.length
    if (time.charAt(length - 1 ) === 'Z') return 0
    if (time.indexOf('+') !== -1) {
      var symbolIdx = time.indexOf('+')
    } else if (time.indexOf('-') !== -1) {
      var symbolIdx = time.indexOf('-')
    } else {
      throw new Error('Invalid timezone')
    }
    
    var minutes = time.substring(symbolIdx + 2)
    var hours = time.substring(symbolIdx + 1, symbolIdx + 2)
    var one = (time.charAt(symbolIdx) === '+') ? 1 : -1

    var intHr = one * parseInt(hours) * 60 * 60 * 1000
    var intMin = one * parseInt(minutes) * 60 * 1000
    var ms = minutes ? intHr + intMin : intHr
    return ms
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
    var ms = date.getUTCMilliseconds()
    var fraction = (ms ? '.' + ms : '')
    return '' +
      pad4(date.getUTCFullYear()) +
      pad2(date.getUTCMonth() + 1) +
      pad2(date.getUTCDate()) +
      pad2(date.getUTCHours()) +
      pad2(date.getUTCMinutes()) +
      pad2(date.getUTCSeconds()) +
      fraction + 'Z'
  }
}

if (typeof exports === 'object') {
  module.exports = ldap2date
} else {
  window.ldap2date = ldap2date
}
}())
