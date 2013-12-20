define(function(require, exports, module){
  'use strict'

  var ua = navigator.userAgent.toLowerCase(),

      is = module.exports,

      osMap = {
        'windows nt 5.0': 'win200',
        'windows nt 5.1': 'winxp',
        'windows nt 5.2': 'winServer2003',
        'windows nt 6.0': 'winVista',
        'windows nt 6.1': 'win7',
        'windows nt 6.2': 'win8',
        'ubuntu': 'ububtu',
        'macintosh': 'mac'
      }

  //     isType = function(type){
  //       return function(o){
  //         return {}.toString.call(o) === '[object ' + type + ']'
  //       }
  //     }

  // is.O = is.Object = isType('Object')
  // is.F = is.Function = isType('Function')
  // is.A = is.Array = isType('Array')
  // is.D = is.Date = isType('Date')
  // is.N = is.Number = isType('Number')
  // is.B = is.Boolean = isType('Boolean')
  // is.S = is.String = isType('String')
  
  // is.emptyObj = function(obj){
  //   for( var k in obj) return false
  //   return true
  // }

  is.browser = {}
  is.os = {}
  
  if( /(msie|firefox|chrome|safari)[\s\/](\d+)/.test(ua) ){    

    is.browser[RegExp.$1] = true
    is.browser.ver = +RegExp.$2

    if(is.browser.chrome && /opr\/(\d+)/.test(ua)){
      is.browser.opera = true
      is.browser.ver = +RegExp.$1

      delete is.browser.chrome
    }
  }
  
  if(/x64/.test(ua)){
    is.bowser.x64 = true
  }else{
    is.browser.x32 = true
  }


  if( /((win|macintosh|ubuntu)[^;]*)/.test(ua) ){
    is.os[osMap[RegExp.$1] || 'unknown'] = true
  }

  if(/(iphone|ipod|ipad).*os (\d+)/.test(ua)){    
    is.os.ios = true
    is.os.ver = +RegExp.$2
  }

  if(/(android) ([^;]+)/.test(ua)){
    is.os.android = true
    is.os.ver = RegExp.$2
  }

  if( /wow64/.test(ua) ){
    is.os.x64 = true
  }else{
    is.os.x32 = true
  }
  
})

