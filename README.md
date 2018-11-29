[![Build Status](https://travis-ci.org/rsolomo/ldap2date.js.png?branch=master)](https://travis-ci.org/rsolomo/ldap2date.js)

# ldap2date.js

Creates DateTime objects from [RFC 4517](https://tools.ietf.org/html/rfc4517) Generalized Time strings.

Conversion from DateTime to GeneralizedTime formatted strings is supported as well.

## Usage

### ldap2date.parse(time)

Returns a new Date() object
- `time` - A LDAP Generalized-Time string

`null` will be returned if the time string cannot be parsed into a valid Date object.

---
### ldap2date.toGeneralizedTime(date)

Returns a string in GeneralizedTime syntax
- `date` - A date object
