define(function(require, exports, module){

  var _ = module.exports = {
    printf : function(str){
      var args = arguments
        , i = 0
      return str.replace(/%s/g, function(){
        i+=1
        return args[i] || '';
      })
    },

    dateFormat : function(D, f, is12){

    },

    random : function(min, max){
      return Math.floor(Math.random()*(max-min+1))+min
    },

    range : function(min, max, num){
      return Math.min( max, Math.max(min, num) );
    },

    querystring : function(){
      var qs = location.href.match(/\w+=[^&]+/g)
        , o = {}

      if( qs ){
        for( var i = 0, l = qs.length; i < l; i++ ){

          o[qs[i].split('=')[0]] = qs[i].split('=')[1]
        }
      }
      return o ;
    }
    
  }
  
})