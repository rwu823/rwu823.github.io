'use strict';
define(function(require){

  var Load = {
    codemirror : function( op, callback ){     

      op = $.extend({
        runmode : false,
        emmet : false,
        theme : ''
      }, op)

      var base_type = [
        './codemirror/mode/javascript.js',
        './codemirror/mode/htmlmixed.js',
        './codemirror/mode/htmlembedded.js',
        './codemirror/mode/xml.js',
        './codemirror/mode/css.js'
      ] ;

      require.async([
        './codemirror/codemirror.js', 
        './codemirror/codemirror.css',
        op.theme ? './codemirror/theme/' + op.theme +'.css' : null,
        './codemirror/util/dialog.css'
      ], function(){

        if( op.runmode ) {
          require.async( base_type.concat(['./codemirror/util/runmode.js']), callback) 
        }else{
          require.async( base_type.concat([
            './codemirror/util/dialog.js',
            './codemirror/util/search.js',
            './codemirror/util/searchcursor.js',
            './codemirror/util/match-highlighter.js',
            './codemirror/util/matchbrackets.js',
            './codemirror/util/closetag.js',
            './codemirror/util/foldcode.js',
            './codemirror/util/runmode.js'          
            ,(op.emmet ? './codemirror/util/emmet.min.js' : '')

          ]), callback ) ;

        }

      }) 
    }

  }
  
  return Load ;

})