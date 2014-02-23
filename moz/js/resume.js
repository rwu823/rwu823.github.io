define(function(require, exports, module){
  'use strict'

  $.fn.transition = function(op, callback){

    op = $.extend({
      action: 'add',
      className: ''
    }, op)

    return this.each(function(){

      var $o = $(this)

      $o[op.action + 'Class'](op.className)

      if( !/([\d\.]+)(s|ms)/g.test($o.css('transition-duration')) )
        return console.error('$.fn.transition: can\'t find "transition-duration"')

      var duration = (RegExp.$2 === 's' ? RegExp.$1 * 1000 : RegExp.$1)


      setTimeout(function(){
        callback()
      }, duration + 200)
    })
  }


  var _ = require('/lib/js/util'),
      Bubble = require('./bubble')

  require('./$.rTime.js')
  require('./$.touchScroll.js')

  var isDebug = 0//require('./debug')

  var
      $main = $('#main'),
      $phone = $('#phone'),
      $view = $('#phone-view'),
      $fox = $('#fox'),

      $notiTime = $('#phone-notification-time'),

      $clock = $('#phone-view ._clock'),

      $currentApp = $(),

      frames = function(){
        Bubble({
          counts: 10
        })

        setTimeout(function(){
          $main.addClass('am-fade-in')
        },100)

        setTimeout(function(){
          $phone.addClass('-fall')
        }, 1000)

        setTimeout(function(){
          $fox.addClass('-fox-shine')
        }, 2500)

      },

      skillAnimate = function(){
        $('._skills', $currentApp).each(function(){
          var $this = $(this),
              dataid = $this.data('id')

          $this.addClass('-' + dataid)
        })
      },

      openApp = function(e){

        var $this = $(this),
            appid = $this.data('id')

        $currentApp = $('#app-' + appid)
        $currentApp.transition({className: '-show'}, function(){
          $currentApp.touchScroll()

          if(appid === 'skill') skillAnimate()
        })

      },

      backHome = function(e){
        if(!$currentApp.hasClass('-show')) return

        $currentApp.transition({
          action: 'remove',
          className: '-show'
        }, function(){
          $('._scroller', $currentApp).removeAttr('style')
          $('._scroll-bar', $currentApp).removeAttr('style')
        })

        if($currentApp[0].id === 'app-skill'){
          $('._skills', $currentApp).attr('class', '_skills')
        }
      },

      runTime = function(){
        $notiTime.rTime()
        $clock.rTime({
          widget: 1
        })
      },

      init = function(){

        if(!isDebug){
          frames()
          runTime()
        }

        $phone
          .on('click.openApp', '._app', openApp)
          .on('click', '#phone-btn-home', backHome)

//        $('._app[data-id="skill"]', $phone).trigger('click.openApp')
      }

  init()



})