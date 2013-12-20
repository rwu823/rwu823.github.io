define(function(require, exports, module){
  'use strict'

  var _ = require('/lib/js/_')

  var $body = $('body')

  module.exports = function(op){
    op = $.extend({
      counts: 20
    }, op)

    var bubble, $bubble = $(),

    createBubbles = function(){
      bubble = ''
      $bubble.remove()

      for(var i = op.counts; i--;) !function(){
        var _left = _.random(0, 100),
            _size = _.random(50, 80),
            _speed = _.random(20, 45),
            _case = _.random(1, 4)

        bubble += '<i class="bubble" style="' +
          'left:' + _left + '%;' +
          'width:' + _size + 'px;' +
          'height:' + _size + 'px;' +
          '-webkit-animation: bubble-up'+ _case +' ' + _speed + 's infinite linear;' +
          'animation: bubble-up'+ _case +' ' + _speed + 's infinite linear;' +
          '"></i> '
      }()

      $bubble = $(bubble)
    },

    appendBubbles = function(){
      $body.append($bubble.show())
    },

    init = function(){
      createBubbles()
      appendBubbles()
    }

    init()

    return {
      hide: function(){
        $bubble.remove()
      },

      show: function(){
        init()
      }
    }
  }

})