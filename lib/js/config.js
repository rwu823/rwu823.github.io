self.log = function( log ) { if( window.console ) console.log( log ) } ;
self.App = {}

seajs.config({     

  alias :{
    'jq' : 'http://code.jquery.com/jquery-1.9.1.min.js',
    'ng' : 'http://ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular.js'
  },

  preload : [
    'jq', 
    'ng'
  ],
  debug:true
}) ;

