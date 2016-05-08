function getStyle(ele){
    if(typeof getComputedStyle === "function"){
        return getComputedStyle(ele);
    }else{
        return ele.currentStyle;
    }
}

function mouseWheel(ele,eventType,fn){
    if(typeof ele.addEventListener==="function"){
        ele.addEventListener(eventType,fn)
    }else{
        ele.attachEvent("on"+eventType,fn)
    }
}

mouseWheel(window,"load",function(){

    var oBox=document.getElementById("box");
    var aList=document.getElementById("list");
    var winHeight=document.documentElement.clientHeight;
    var aLi=aList.getElementsByTagName("li");
    var timer;
    var flag=true;
    mouseWheel(document.documentElement,"mousewheel", function (evt) {
        evt = evt || event;
        var date=Date.now();
        var beginDistance=aList.offsetTop;
        if(flag===false){
            return;
        }
        flag=false;

        if(evt.wheelDelta>0){
            if(parseInt(getStyle(aList).top)>=0){
                aList.style.top=0;
                flag=true;
            }else{
                timer=setInterval(function () {
                    var newDate=Date.now();
                    var myDistance =Tween.Cubic.easeIn(newDate-date,beginDistance,winHeight,1000);
                    if(myDistance>=beginDistance+winHeight){
                        clearInterval(timer);
                        aList.style.top=beginDistance+winHeight+"px";
                        flag=true;
                    }else{
                        aList.style.top=myDistance+"px";
                    }
                },30)
            }
        }else{
            console.log(aList.style.top,-(aLi.length-1)*winHeight,"93");
            if(parseInt(getStyle(aList).top)<=-(aLi.length-1)*winHeight){
                aList.style.top=-(aLi.length-1)*winHeight+"px";
                flag=true;
            } else{//改变这里
                timer=setInterval(function () {
                    var newDate=Date.now();
                    var myDistance =Tween.Cubic.easeIn(newDate-date,beginDistance,-winHeight,1000);
//                            console.log(myDistance,-winHeight)
                    if(myDistance<=beginDistance-winHeight){
                        clearInterval(timer);
                        aList.style.top=beginDistance-winHeight+"px";
                        flag=true;
                    }else{
                        aList.style.top=myDistance+"px";
                    }
                },30)
            }


        }



    },false)


    //火狐
    mouseWheel(document.documentElement,"DOMMouseScroll", function (evt) {
        evt = evt || event;
        var date=Date.now();
        var beginDistance=aList.offsetTop;
        if(flag === false){
            return;
        }
        flag=false;
        if(evt.detail<0){
            if(parseInt(getStyle(aList).top)>=0){
                aList.style.top=0+"px";
                flag=true;
            }else{
                timer=setInterval(function () {
                    var newDate=Date.now();
                    var myDistance=Tween.easeInOut(newDate-date,beginDistance,winHeight,500);
                    console.log(myDistance,"141");
                    if(myDistance>=beginDistance+winHeight){
                        clearInterval(timer);
                        myDistance=beginDistance+winHeight;
                        aList.style.top=myDistance+"px";
                        flag=true;
                    }else{
                        aList.style.top=myDistance+"px";
                    }
                },33)

            }
        }else{
            if(parseInt(getStyle(aList).top)<=-(aLi.length-1)*winHeight) {
                aList.style.top=-(aLi.length-1)*winHeight+"px";
                flag = true;
            }else{
                timer=setInterval(function () {
                    var newDate=Date.now();
                    var myDistance=Tween.easeInOut(newDate-date,beginDistance,-winHeight,500);
                    console.log(myDistance,beginDistance,beginDistance-winHeight,"160");
                    if(myDistance<=beginDistance-winHeight){//判断错了，已改正
                        clearInterval(timer);
                        myDistance=beginDistance-winHeight;
                        aList.style.top=myDistance+"px";
                        flag=true;
                    }else{
                        aList.style.top=myDistance+"px";
                    }
                },33)

            }
        }
    },false)
},false)