define(function(require, exports, module){
  'use strict'
  var _ = require('/lib/js/util'),

      mapDay = {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday'
      },

      mapMonth = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
      }

  $.fn.rTime = function(op){
    op = $.extend({
      widget: 0
    }, op)

    var D = new Date(),
        Ds = D.getSeconds(),
        Dms = D.getMilliseconds(),

        hasRunFirst = 0,
        firstUpdateMs = ((60-Ds)*1000) + (1000-Dms)

    return this.each(function(){
      var $o = $(this),

          interval = function(){

            var _D = new Date(),
                timeout = hasRunFirst ? 60000 : firstUpdateMs

            if(op.widget){

              var hours = _D.getHours(),
                  isAM = hours < 12,
                  relateTime = isAM ? hours : hours - 12


              if(relateTime === 12 ) relateTime = 0
              else if( relateTime === 0 ) relateTime = 12

              $('._hh', $o).text(relateTime)
              $('._mm', $o).text(_.dateFormat( _D, 'mm'))
              $('._fmt12', $o).text( isAM ? 'AM' : 'PM')
              $('._date', $o).text( mapMonth[_D.getMonth()] + ' ' + _D.getDate() + ', ' + mapDay[_D.getDay()] )
            }else{
              $o.text( _.dateFormat( _D, 'h:mm') )
            }

            setTimeout(interval, timeout)

            hasRunFirst = 1
          }
      interval()
    })
  }
})