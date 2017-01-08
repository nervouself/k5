// init
    var C = document.body || document.documentElement,
        H = C.clientHeight,
        parts = document.querySelectorAll('.part'),
        pgNum = parts.length,
        wrap = document.querySelector('.content-wrap');

    for (var i = 0; i < pgNum; i++) {
        parts[i].style.height = H +'px';
    }

// pages
    var currentPage = 0;
    function switchPage(){
        if (currentPage<0) {
            currentPage = 0;
            return;
        }
        if (currentPage>pgNum-1) {
            currentPage = pgNum-1;
            return;
        }
        wrap.style.cssText = '-webkit-transform:translate3d(0,-' + (H*currentPage) + 'px,0);translate3d(0,-' + (H*currentPage) + 'px,0)';
    }

// slide
    var startY =0,
        endY = 0;
    document.addEventListener('touchstart',function(event){
        startY = event.touches[0].pageY;
    });
    document.addEventListener('touchmove',function(event){
        event.preventDefault();
    });
    document.addEventListener('touchend',function(event){
        endY = event.changedTouches[0].pageY;
        var deltY = endY - startY;
        if ( Math.abs(deltY)< 60 ) {
            return;
        }
        if (deltY>0) {
            currentPage -= 1;
        }else{
            currentPage += 1;
        }
        switchPage();
    });