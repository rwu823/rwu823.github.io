define(function(require, exports, module){
  'use strict'

  var _ = require('/lib/js/_')

  $.fn.touchScroll = function(op){
    op = $.extend({

    }, op)

    var $doc = $(document),

        expo = {}


    var $o = $(this),

        timer = {},

        $scroller = $('._scroller', $o),
        $scrollbar = $('._scroll-bar', $o),

        startY,

        oHeight,
        maxHeight,

        rate,
        scrollbarHeightPercent,

        maxTop,
        maxScrollTop,

        lastMoveTime = 0,
        lastMovePos = 0,
        dir = 0,

        moveTo = 0,
        scrollTo = 0,
        startTop = 0,

        isOverView = 0,
        calTop = 0,

        touchStart = function(e){
          startY = e.pageY
          startTop = parseInt( $scroller.css('margin-top'), 10)
          $doc.off('mousemove.touchMove').on('mousemove.touchMove', touchMove)

          clearTimeout(timer.hideScrollbar)
          $scrollbar.addClass('am-fade-in')

          calTop = 0
        },

//counts = 0,

        touchMove = function(e){
          e.preventDefault()

          var calY = e.pageY - startY

//            calTop = (isOverView ? calTop + (dir > 0 ? 0.8 : -0.8 ) : calY)

          moveTo = _.range(maxTop, startTop + calY, 0)
          scrollTo = (moveTo/maxTop) * maxScrollTop

          isOverView = (moveTo > 0) || (moveTo < maxTop)

//    // debug
//counts += 1
//
//if( counts%21 !== 20 ){
//  console.log({
//    dir: dir,
//    'moveTo': moveTo,
//    '(e.pageY - startY)': (e.pageY - startY),
//    startTop: startTop
//  })
//}else{
//  console.clear()
//}


          $scroller.css({
            marginTop: moveTo
          })

          $scrollbar.css({
            top: scrollTo + '%'
          })

          dir =  calY - lastMovePos

          lastMoveTime = new Date().getTime()
          lastMovePos = calY
        },

        getDefault = function(){
          $scroller.removeClass('-movement -over-movement')
          $scrollbar.removeClass('-movement -over-movement')


        },

        touchEnd = function(e){

          var duration = new Date().getTime() - lastMoveTime,
              hideScrollbar = function(){
                clearTimeout(timer.hideScrollbar)
                timer.hideScrollbar = setTimeout(function(){
                  $scrollbar.removeClass('am-fade-in')
                }, 800)
              },

              movement = function(){
                var moveRange = 550

                if( dir !== 0 ){
                  moveTo = _.range(maxTop, moveTo + (dir > 0 ? moveRange : -moveRange), 0)

                  scrollTo = (moveTo/maxTop) * maxScrollTop
                }

                $scroller
                  .transition({ className: '-movement'}, getDefault)
                  .css({ marginTop: moveTo })

                $scrollbar.addClass('-movement').css({
                  top: scrollTo + '%'
                })

              },

              overMovement = function(){

                moveTo = moveTo >= 0  ? 0 : maxTop
                scrollTo = (moveTo/maxTop) * maxScrollTop

                $scroller
                  .transition({ className: '-over-movement'}, getDefault)
                  .css({ marginTop: moveTo })

                $scrollbar.addClass('-over-movement').css({
                  top: scrollTo + '%'
                })
              }

          $doc.off('mousemove.touchMove')

          if( duration < 30 ) movement()

//            if( isOverView ) overMovement()

          hideScrollbar()
        }

    expo.update = function(){

      oHeight = $o.height(),
      maxHeight = $scroller.outerHeight()

      rate = oHeight / maxHeight

      scrollbarHeightPercent = rate * 100

      maxTop = oHeight - maxHeight
      maxScrollTop = 100 - scrollbarHeightPercent

      if(rate >= 1) return
      $o.off('mousedown.touchStart').on('mousedown.touchStart', touchStart)
      $doc.off('mouseup.touchEnd').on('mouseup.touchEnd', touchEnd)

      $scrollbar.height( scrollbarHeightPercent + '%' )

    }

    expo.update()

    return expo

  }

})