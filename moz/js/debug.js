define(function(require, exports, module){
  'use strict'

  var $html = $('html')

  $html.addClass('-debug')

  document.title = 'test'

  var style =
    '<style>' +
      '.-debug #main{ opacity:1;background-image:none; }' +
      '.-debug #phone{ top:50%;background:none;box-shadow:none }' +
      '.-debug #phone-inner{ background:none;box-shadow:none }' +
      '.-debug #phone-trumpet, .-debug #phone-volume{ display:none }' +
      '.-debug #phone-notification-bar{visibility: hidden;}' +
      '.-debug [id^="app-"]{border:1px solid #ccc;box-sizing:-webkit-border-box;box-sizing:-moz-border-box;box-sizing:border-box;}' +
      '.-debug #main, .-debug #phone{ transition: none;-webkit-transition: none; }' +
    '</style>';

  $html.append(style)
})