define(function(require, exports, module){
  'use strict';

  require('./iioEngine.min');

  $('body').append('<canvas id="cvs-fav-counts" width="16" height="16" style="display:none"></canvas>');

  var $head = $('head')

  iio.start(function(stage){

    var cv = stage.canvas,
        BG = new iio.ioRect(cv.center, 16),

        Txt = new iio.ioText( 0, 8, 12 )
                  .setTextAlign('center')
                  .setFont('11px Arial')

    stage.addObj(BG)
    stage.addObj(Txt)

    module.exports = function(opt){
      var set = $.extend({
        counts : '1',
        bg : '#9D0E08',
        color : '#fff'
      }, opt)

      BG.setFillStyle(set.bg);
      Txt
        .setText(set.counts)
        .setFillStyle(set.color);

      stage.draw();

      var $icon = $('<link rel="icon" href="' +  cv.toDataURL() + '" />');
      $head.append($icon);
      $icon.remove();
    }
  }, 'cvs-fav-counts')


})