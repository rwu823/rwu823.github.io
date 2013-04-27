define(function(require){
  
  var isEmpty = function(obj){
    for( var k in obj ) return false

    return true
  }

  if( location.hostname === 'localhost' ){

    require.async('./socket.io', function(){      
      var Socket = io.connect('/');
      
      Socket.on('reload', function(o){
        if( isEmpty( o.ERROR ) ){
          location.reload() ;
        }else{          
          console.dir( o.ERROR )
        }
      })
    });

  }
  
})
