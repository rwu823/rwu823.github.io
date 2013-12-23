define(function(require, exports, module){
  'use strict'

  var type = function(type){
    return function(obj){ return {}.toString.call(obj) === '[object ' + type + ']' }
  },

  _ = module.exports

  _.isO = _.isObject = type('Object')
  _.isF = _.isFunction = type('Function')
  _.isA = _.isArray = type('Array')
  _.isD = _.isDate = type('Date')
  _.isN = _.isNumber = type('Number')
  _.isB = _.isBoolean = type('Boolean')
  _.isS = _.isString = type('String')

  _.isEmptyObject = function(o){
    for(var k in o) return 0
    return 1
  }

  _.clone = function(o){

    if(!_.isArray(o) && !_.isObject(o)) return o

    if(_.isArray(o)) return o.slice(0)


    var b = {}
    for(var k in o) b[k] = o[k]

    return b
  }

  _.random = function(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  _.range = function(min, n, max){
    min = +min
    n = +n
    max = +max

    return Math.min(Math.max(min, n), max)
  }

  _.printo = function(str, o){

  }

  _.querystring = function(){
    var qs = location.search.match(/[^&?]+=[^&]+/g),
        o = {},
        sp

    for(var i = 0, l = qs.length; i < l; i++){
      sp = qs[i].split('=')
      o[sp[0]] = sp[1]
    }

    return o
  }

  _.dateFormat = function(date, format, is12){
    if(_.isString(date)) date = new Date(date.replace(/-/g, '/'))

    var dRE = {
      year: /Y+/,
      month: /M+/,
      day: /D+/,
      hour: /h+/,
      minute: /m+/,
      second: /s+/
    }

    format = format.replace(/[YMDhms]+/g, function(m){
      var trans

      if( dRE.year.test(m) ) {
        trans = '' + date.getFullYear().slice(4 - m.length)
      }else{

        if( dRE.hour.test(m) ){
          trans = date.getHours()

          if ( is12 ) {
            var isAM = trans < 12
            if(!isAM) trans -= 12
          }
        }else{
          trans =
            dRE.month.test(m) && date.getMonth() + 1 ||
            dRE.day.test(m) && date.getDay() ||
            dRE.minute.test(m) && date.getMinutes() ||
            dRE.second.test(m) && date.getSeconds()
        }

        trans = (m.length > 1 && trans < 10 ? '0' : '') + trans
      }

      return trans;

    })

    return format
  }

})