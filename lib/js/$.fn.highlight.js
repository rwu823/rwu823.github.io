define(function(){

  $.fn.extend({

    highlight : function(opt){
      var set = $.extend({
        re : null,
        bg : 'yellow'
      },opt) ;
      var $o = $(this) ;

      function match(nd){ 
        if( nd.nodeType === 3 && set.re.test(nd.data) ){        
          nd.data = nd.data.replace( set.re, function(match){
            return '<font highlight style="background:' + set.bg + '">' + match + '</font>' ;
          })
          $(nd).replaceWith( nd.data )         
        }else if( nd.nodeType === 1 && !/^(img|br|style|script|code|iframe|pre|textarea)$/i.test(nd.tagName) ){
          $(nd).contents().each(function(){
            match( this )
          })
        }    
      }
      return $o.each(function(){
        $o.contents().each(function(){
          match( this )
        }) 
      })
    },

    highlightRemove : function(){
      var $o = $(this) ;

      $( 'font[highlight]', $o ).each(function(){
        var $this = $(this)
        $this.replaceWith( $this.text() )
      })

      $o.html( $o.html() ) ;

      return $o 
    }

  })
  
})