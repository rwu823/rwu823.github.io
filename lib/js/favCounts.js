define(function(require, exports, module){

  require('http://d3lp1msu2r81bx.cloudfront.net/kjs/js/lib/kinetic-v4.4.3.min.js')

  $('body').append('<div id="favCounts" style="display:none" />')

  var $head = $('head');

  var K = Kinetic 

    , Stage = new K.Stage({
    container : 'favCounts',
    width : 16,
    height: 16
  })

    , Layer = new K.Layer()

    , Rect = new K.Rect({
    x : 0,
    y: 0,
    width:16,
    height:16,
    fill : '#9B0E09',
    cornerRadius : 3
  })

    , Counts = new K.Text({
    x: 0,
    y: 0,
    fontFamily : 'Arial',
    fontSize:11,
    text: '0',
    fill : '#fff'
  })

  Layer.add(Rect);
  Layer.add(Counts);

  return function(opt){
    var set = $.extend({
      bg : '#9B0E09',
      color : '#fff',
      text : '0',
      radius : 3
    }, opt)

    Rect.setFill( set.bg )
    Rect.setCornerRadius( set.radius )

    Counts.setFill( set.color );
    Counts.setText( set.text );
    Counts.setX( ( Stage.getWidth() - Counts.getWidth() ) / 2 )
    Counts.setY( ( Stage.getHeight() - Counts.getHeight() ) / 2 )

    Stage.add(Layer)

    Stage.toDataURL({
      callback : function(img){
        var $icon = $('<link rel="icon" href="' + img +'" />');
        $head.append($icon);

        $icon.remove();
      }
    })    
  }

})