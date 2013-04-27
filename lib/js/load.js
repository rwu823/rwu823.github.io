define(function(require){

  var Load = {
    codemirror : function( opt, callback ){     

      var set = $.extend({
        runmode : false,
        emmet : false
      },opt)

      var base_url = 'http://rwu823.github.io/lib/js/codemirror' ;
      var base_type = [
        base_url + '/mode/javascript.js',
        base_url + '/mode/htmlmixed.js',
        base_url + '/mode/htmlembedded.js',
        base_url + '/mode/xml.js',
        base_url + '/mode/css.js'
      ] ;

      require.async([

        base_url + '/codemirror.js', 
        base_url + '/codemirror.css',
        base_url + '/theme/night.css',
        base_url + '/util/dialog.css'
      ], function(){

        if( set.runmode ) {
          require.async( base_type.concat([base_url + '/util/runmode.js']), callback) 
        }else{
          require.async( base_type.concat([
            base_url + '/util/dialog.js',
            base_url + '/util/search.js',
            base_url + '/util/searchcursor.js',
            base_url + '/util/match-highlighter.js',
            base_url + '/util/matchbrackets.js',
            base_url + '/util/closetag.js',
            base_url + '/util/foldcode.js',
            base_url + '/util/runmode.js'          
            ,(set.emmet ? '//dl.dropbox.com/u/3430677/github/lib/js/codemirror/util/emmet-min.js' : '')

          ]), callback ) ;

        }

      }) 
    }

  }
  
  return Load ;

})