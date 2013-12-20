define(function(require, exports, module){
  'use strict'
  var _ = require('/lib/js/_')

  $.fn.rTime = function(op){
    op = $.extend({

    })

    var D = new Date(),
        Ds = D.getSeconds(),
        Dms = D.getMilliseconds(),

        hasRunFirst = 0,
        firstUpdateMs = ((60-Ds)*1000) + (1000-Dms)

    return this.each(function(){
      var $o = $(this),

          interval = function(){

            $o.text( _.dateFormat( new Date(), 'hh:mm') )

            var timeout = hasRunFirst ? 60000 : firstUpdateMs
            setTimeout(interval, timeout)

            hasRunFirst = 1
          }
      interval()
    })
  }
})