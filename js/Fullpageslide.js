/*
 * @usage: new Fullpageslide('wrap',options)
 * @param: options{
 *   (最小滑动间距) deltY: 60,
 *   (翻页动画时间) duration: '.5s',
 *   (翻页动画曲线) timing: 'cubic-bezier(0.7, 0, 0.3, 1)'
 * }
 */

var Fullpageslide = function (wrap,options) {

    this._wrap = document.querySelector(wrap);
    this._parts = document.querySelectorAll(wrap+'>*');
    this._pgNum = this._parts.length;
    this._C = this._wrap.parentNode;
    this._H = this._C.clientHeight;
    this._W = this._C.clientWidth;
    this._currentPage = 0;
    this._startY = 0;
    this._endY = 0;
    this._opt = {
        deltY: 60,
        duration: '.5s',
        timing: 'cubic-bezier(0.7, 0, 0.3, 1)'
    };

    for (var i = 0; i < this._pgNum; i++) {
        this._parts[i].style.height = this._H +'px';
        this._parts[i].style.width = this._W +'px';
    }

    if (options) {
        for(var p in options){
            this._opt[p] = options[p];
        }
    }

    this.handleTransform();
    this.startListen();

};

Fullpageslide.prototype.handleTransform = function () {
    var s = document.createElement('style'); 
    s.innerHTML = [
        "._FUPASL-W{-webkit-transition:",
        this._opt.duration,
        " ",
        this._opt.timing,
        ";transition:",
        this._opt.duration,
        " ",
        this._opt.timing,
        ";-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);}"
    ].join('');
    document.querySelector('head').appendChild(s);
    this._wrap.className += ' _FUPASL-W';
};

Fullpageslide.prototype.switchPage = function() {
    if (this._currentPage<0) {
        this._currentPage = 0;
        return;
    }
    if (this._currentPage>this._pgNum-1) {
        this._currentPage = this._pgNum-1;
        return;
    }
    this._wrap.style.cssText = '-webkit-transform:translate3d(0,-' + (this._H*this._currentPage) + 'px,0);translate3d(0,-' + (this._H*this._currentPage) + 'px,0)';
};

Fullpageslide.prototype.startListen = function() {
    var me = this;
    me._wrap.addEventListener('touchstart',function(event){
        event.stopPropagation();
        me._startY = event.touches[0].pageY;
    });
    me._wrap.addEventListener('touchmove',function(event){
        event.stopPropagation();
        event.preventDefault();
    });
    me._wrap.addEventListener('touchend',function(event){
        event.stopPropagation();
        me._endY = event.changedTouches[0].pageY;
        var deltY = me._endY - me._startY;
        if ( Math.abs(deltY)< me._opt.deltY ) {
            return;
        }
        if (deltY>0) {
            me._currentPage -= 1;
        }else{
            me._currentPage += 1;
        }
        me.switchPage();
    });
};
