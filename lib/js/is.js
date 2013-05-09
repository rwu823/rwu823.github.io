define(function(require, exports, module){

  var ua = navigator.userAgent
    , ver
    , is = module.exports = {}

    , os = {
      'Windows NT 5.0' : 'win200',
      'Windows NT 5.1' : 'winxp',
      'Windows NT 5.2' : 'winServer2003',
      'Windows NT 6.0' : 'winVista',
      'Windows NT 6.1' : 'win7',
      'Ubuntu' : 'ub',
      'Macintosh' : 'mac'
    }

    , browser = {
      MSIE : 'ie',
      Firefox : 'ff',
      Chrome : 'ch',
      Safari : 'sa',
      Opera : 'op'
    }

  
  is.emptyObj = function(obj){
    for( var k in obj) return false;
    return true;
  }

  is.type = function( obj ){
    return /(\w+)]$/.test( Object.prototype.toString.call(obj) ) && RegExp.$1
  }
  
  is.O = is.Object = function(o){ return is.type(o) === 'Object' };
  is.F = is.Function = function(o){ return is.type(o) === 'Function' };
  is.A = is.Array = function(o){ return is.type(o) === 'Array' };
  is.D = is.Date = function(o){ return is.type(o) === 'Date' };
  is.N = is.Number = function(o){ return is.type(o) === 'Number' };
  is.B = is.Boolean = function(o){ return is.type(o) === 'Boolean' };
  is.S = is.String = function(o){ return is.type(o) === 'String' };

  if( /(MSIE|Firefox|Chrome|Opera|Safari)[\s\/](\d+)/i.test(ua) ) {    
    is[browser[RegExp.$1]] = true
    is['ver'+ RegExp.$2] = true    
  }

  if( /(Win[^;]+|Mac[^;]+|Ubuntu[^;]+).+(WOW64|x64)?/i.test(ua) ){

    is[os[RegExp.$1]] = true ;

    if( RegExp.$2 ) {
      is.os64 = true

      if( RegExp.$2 === 'x64' ) is.browser64 = true
      else is.browser32 = true;

    }else{
      is.os32 = true
    }
  }

  
})

