define(function(require, exports, module ){  

  Function.prototype.toHTML = function(){
    var htm = this.toString();
    return htm.substring( htm.indexOf('>>>') + 3, htm.lastIndexOf('<<<') )
  }
  
  String.prototype.toObject = function( opt ){
    var set = $.extend({
      split : '&' ,
      eq : '='
    },opt) ;
    
    var O = {} ;    
    var q = this.split( set.split ) ;

    for( var i = 0 , l = q.length  ; i < l ; ++i ) {
      if( q[i] ){	  
        var key = q[i].match( /^[^=]+/ )[0] ;
        var value = q[i].split( key + '=' )[1] ;
        
        O[key] = unescape(value) ;
      }	            
    }
    
   return O ;
  } ;

  Math.getRandom  = function( opt ){
    var set = $.extend({
      min : 0 ,
      max : 10
    },opt ) ;
    return Math.floor( Math.random() * ( set.max - set.min + 1 ) + set.min ) ;
  } ;
 

  return {

    queryString : function(){
      var qs = location.href.split('?')[1] ;
      
      if( qs ) return qs.toObject() ;
      
    }

  }
  
}) ;

