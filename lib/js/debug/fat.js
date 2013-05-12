!function(){
  'use strict';
  for( var fats = document.querySelectorAll('fat'), i = 0, fat ; fat = fats[i]; i++){

    var attrs = fat.attributes,
        attrsLen = attrs.length,
        idx = function(num){
          return window.mozContact ? attrsLen - (+num+1) : num ;
        },
        wh = attrs[idx(0)] && attrs[idx(0)].name.toLowerCase() || '200x200',
        w = wh.split('x')[0]  + 'px',
        h = wh.split('x')[1] + 'px',
        color = attrs[idx(1)] && attrs[idx(1)].name || '#666',
        bg = attrs[idx(2)] && attrs[idx(2)].name || '#ccc',
        txt = attrs[idx(3)] && attrs[idx(3)].name || wh.replace('x', '×')

    fat.style.display = 'inline-block';
    fat.style.textAlign = 'center';
    fat.style.fontSize = '20px';
    fat.style.lineHeight = h;
    fat.style.width = w;
    fat.style.height = h;
    fat.style.color = color;
    fat.style.background = bg;
    fat.innerHTML = txt;
  }
}();