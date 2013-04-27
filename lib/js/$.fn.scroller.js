define(function(require){

  require('./$.mousewheel')

  $('head').append(
    '<style>' +
      '[scroller-scroll] { display:none;min-height:20px;cursor:pointer;position:absolute;width:10px;height:0;opacity:.4;background:#000;top:0;right:4px;border-radius:50px; }' +
    '</style>'
  )

  $.fn.scroller = function( opt ){

    var set = $.extend({
      to : 0
    }, opt)

    var $o = $(this);
    var $doc = $(document);
    var $win = $(window);

    var $max = $('>[scroller-max]', $o);
    var $scroll = $('>[scroller-scroll]', $o);

    var view_px = $o.height() ;
    var max_px = $max.height() ;
    var scroll_px = view_px * view_px / max_px ;
    var move_ratio = Math.max( 1, (max_px - view_px) / (view_px - scroll_px) )

    var lock_start = 0 ;
    var lock_end = view_px - scroll_px ;

    var start_pos = 0, save_scroll_px = 0 ;

    var wheel_px = 40 ;
    var wheel_move = wheel_px / move_ratio ;
      
    var mousewheel = typeof document.onmousewheel === 'undefined' ? 'DOMMouseScroll' : 'mousewheel';

    var timeout_skip = 0;

    function down(e){
      $doc
        .off('mousemove.move')
        .on('mousemove.move', function(e){
          e.preventDefault() ;
          e.stopPropagation() ;  

          scrollTo( save_scroll_px + e.pageY - start_pos )
        })

      start_pos = e.pageY ;

      $o.css('user-select', 'none')
    }

    function scrollTo(px){      
      if( px.constructor === Number ) px = Math.max( 0, Math.min( lock_end, px ) ) ;
      else if( px === 'end' ) {
        px = lock_end;
        save_scroll_px = lock_end ;
      }

      $scroll.css( 'top', px );
      $max.css( 'margin-top', px * move_ratio * -1)
    }

    function up(e){
      $doc.off('mousemove.move')

      save_scroll_px = $scroll.position().top ;
      $o.css('user-select', 'inherit')
    }

    function wheel(e, delta){
      scrollTo( save_scroll_px - wheel_move * ( delta > 0 ? 1 : -1 ) );

      save_scroll_px = $scroll.position().top ;
    }
    
    function reset(e){
      clearTimeout(timeout_skip)
      timeout_skip = setTimeout(function(){
        view_px = $o.height() ;
        max_px = $max.height() ;
        scroll_px = view_px * view_px / max_px ;
        move_ratio = Math.max( 1, (max_px - view_px) / (view_px - scroll_px) )

        lock_end = view_px - scroll_px ;
        wheel_move = wheel_px / move_ratio ;

        $scroll.height(scroll_px) ;

      },200)
    }

    function offBind(){
      $scroll.hide().off( 'mousedown.down' );
      $doc.off( 'mouseup.up' );

      $o
        .off('mousewheel.wheel')
        .off('mouseenter.showScroll')
        .off('mouseleave.hideScroll')

      $win.off('resize.reset');
    }

    function showScroll(){
      $scroll.fadeIn() ;
    }

    function hideScroll(){      
      $scroll.stop().fadeOut() ;      
    }

    if( view_px <= max_px ) {
      offBind() ;
      $scroll.on( 'mousedown.down', down ).height(scroll_px);
      $doc.on( 'mouseup.up', up );
  
      $o
        .on( 'mousewheel.wheel', wheel )
        .on( 'mouseenter.showScroll', showScroll )
        .on( 'mouseleave.hideScroll', hideScroll )

      $win.on( 'resize.reset', reset )
    }else{
      offBind()
    }

    scrollTo( set.to ) ;
 
  }

})