define(function(require){

  var Load = {
    codemirror : function( opt, callback ){     

      var set = $.extend({
        runmode : false,
        emmet : false
      },opt)

      var base_type = [
        'codemirror/mode/javascript.js',
        'codemirror/mode/htmlmixed.js',
        'codemirror/mode/htmlembedded.js',
        'codemirror/mode/xml.js',
        'codemirror/mode/css.js'
      ] ;

      require.async([

        'codemirror/codemirror.js', 
        'codemirror/codemirror.css',
        'codemirror/theme/night.css',
        'codemirror/util/dialog.css'
      ], function(){

        if( set.runmode ) {
          require.async( base_type.concat(['codemirror/util/runmode.js']), callback) 
        }else{
          require.async( base_type.concat([
            'codemirror/util/dialog.js',
            'codemirror/util/search.js',
            'codemirror/util/searchcursor.js',
            'codemirror/util/match-highlighter.js',
            'codemirror/util/matchbrackets.js',
            'codemirror/util/closetag.js',
            'codemirror/util/foldcode.js',
            'codemirror/util/runmode.js'          
            ,(set.emmet ? 'codemirror/util/emmet-min.js' : '')

          ]), callback ) ;

        }

      }) 
    }

  }
  
  return Load ;

})