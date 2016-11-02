/**
 * Created by liuxinheng87 on 2016/1/11.
 */
(function () {
    var oBox = document.getElementById('banner');
    var oUl = oBox.children[0];
    var aLi = oUl.children;
    var oOl = oBox.children[1];
    var aBtn = oOl.children;
    var iNow=0;
    var timer = null;

    function tab(){
        for(var j=0; j<aBtn.length;j++){
            aBtn[j].className = '';
        }
        aBtn[iNow].className = 'active';
        oUl.style.webkitTransform = 'translateX('+(-iNow*16)+'rem)';
        oUl.style.mozTransform = 'translateX('+(-iNow*16)+'rem)';
    }
    function start(){
        clearInterval(timer);
        timer = setInterval(function () {
            iNow++;
            if(iNow==aBtn.length){
                iNow=0;
            }
            tab();
        },3000);
    }
    start();
})();


//    function drapMove(){
//        var fontS = document.documentElement.clientWidth*20/320;
//        document.documentElement.style.fontSize=fontS+'px';
//        window.onresize=function(){
//            fontS = document.documentElement.clientWidth*20/320;
//            document.documentElement.style.fontSize=fontS+'px';
//        };
//
//
//        var oBox = document.getElementById('banner');
//        var oUl = document.querySelector('#banner ul');
//        var aLi = document.querySelectorAll('#banner ul li');
//        oUl.addEventListener('touchstart',function(ev){
//            var startX = ev.targetTouches[0].pageX/fontS;
//            var startY = ev.targetTouches[0].pageY/fontS;
//            var disX = ev.targetTouches[0].pageX/fontS-oUl.offsetLeft/fontS;
//
//            var dir = '';
//            function fnMove(ev){
//                if(dir==''){
//                    if(Math.abs(ev.targetTouches[0].pageX/fontS-startX)>5/fontS)
//                        dir='x';
//                    if(Math.abs(ev.targetTouches[0].pageY/fontS-startY)>5/fontS)
//                        dir='y';
//                }else{
//                    if(dir=='x'){
//                        oUl.style.left = ev.targetTouches[0].pageX/fontS-disX+'rem';
//                        ev.preventDefault()
//                    }
//                }
//
//            }
//            function fnEnd(){
//                oUl.removeEventListener('touchmove',fnMove,false);
//                oUl.removeEventListener('touchend',fnEnd,false);
//
//                var n = Math.round(oUl.offsetLeft/aLi[0].offsetWidth);
//
//                if(n>0){
//                    n=0;
//                }else if(n<-(aLi.length-1)){
//                    n=-(aLi.length-1);
//                }
//
//                oUl.style.WebkitTransition='.7s all ease';
//
//                oUl.style.left = n*aLi[0].offsetWidth/fontS+'rem';
//            }
//
//            oUl.addEventListener('touchmove',fnMove,false);
//            oUl.addEventListener('touchend',fnEnd,false);
//        },false);
//    }
//    drapMove();
