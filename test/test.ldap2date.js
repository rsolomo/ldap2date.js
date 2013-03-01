var assert = require('assert')
var ldap2date = require('../ldap2date')

describe('ldap2date', function () {
  var time
  before(function() {
    time = '20130228192706.607Z'
  })
  describe('getYear', function() {
    it('should parse the year', function() {
      var year = ldap2date.getYear(time)
      assert.strictEqual(year, 2013)
    })
  })

  describe('getMonth', function() {
    it('should parse the month', function() {
      var month = ldap2date.getMonth(time)
      assert.strictEqual(month, 1)
    })
  })

  describe('getDay', function() {
    it('should parse the day', function() {
      var day = ldap2date.getDay(time)
      assert.strictEqual(day, 28)
    })
  })

  describe('getHours', function() {
    it('should parse the hour', function() {
      var hour = ldap2date.getHours(time)
      assert.strictEqual(hour, 19)
    })
  })
  
  describe('getMinutes', function() {
    it('should parse the hour', function() {
      var minutes = ldap2date.getMinutes(time)
      assert.strictEqual(minutes, 27)
    })
  })

  describe('getSeconds', function() {
    it('should parse the hour', function() {
      var seconds = ldap2date.getSeconds(time)
      assert.strictEqual(seconds, 6)
    })
  })

  describe('getMilliseconds', function() {
    it('should parse the milliseconds', function() {
      var ms = ldap2date.getMilliseconds(time)
      assert.strictEqual(ms, 607)
    })

    it('should return 0 if milliseconds is not present', function() {
      var ms = ldap2date.getMilliseconds('20130228192706Z')
      assert.strictEqual(ms, 0)
    })
  })

  describe('parse', function() {
    it('should return a Date object representing the time', function() {
      var date = ldap2date.parse(time)
      assert.ok(date instanceof Date)
      assert.equal(date.valueOf(), 1362079626607)
    })
  })

  describe('toGeneralizedTime', function() {
    it('should return a Generalized Time string', function() {
      var date = new Date(1362079626607)
      var time = ldap2date.toGeneralizedTime(date)
      assert.equal(time, '20130228192706.607Z')
    })
    
    it('should handle single digit years', function() {
      var date = new Date(-61941924311001)
      var time = ldap2date.toGeneralizedTime(date)
      assert.equal(time, '00070220135448.999Z')
    })

    it('should not return fraction, if it is 0', function() {
      var date = new Date(1362079626000)
      var time = ldap2date.toGeneralizedTime(date)
      assert.equal(time, '20130228192706Z')
    })
  })
})
