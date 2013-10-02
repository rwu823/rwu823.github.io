define(function(require, exports, module){

  var Blog = angular.module('Blog', [])

  Blog.config( function( $routeProvider ){
    $routeProvider
      // .when('/:year/:month/:day', {
      //   template : 'hello'
      // })
      .when('/pizza', {
        template : 'This is my App'

      })

  })

  Blog.controller('aa', function($location){
    // $location.path('/pizza')
  });


})