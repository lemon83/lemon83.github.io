


window.onload = function() {
    function getStyle(ele) {
        if (typeof getComputedStyle === "function") {
            return getComputedStyle(ele);
        } else {
            return ele.currentStyle;
        };
    }
    var oPrev = document.getElementById("prev");
    var oNext = document.getElementById("next");
    var oCont = document.getElementById("cont");
    var oLiList = oCont.getElementsByTagName("li");
    oCont.innerHTML = "<li>" + oLiList[4].innerHTML + "</li>" + oCont.innerHTML + "<li>" + oLiList[0].innerHTML + "</li>";
    oCont.style.width = oCont.getElementsByTagName("li").length * parseInt(getStyle(oLiList[0]).width) + "px";
    var flag = true;
    
    
    function moveToRight(){
    var timer2 = setInterval(function() {
            oCont.style.left = parseInt(getStyle(oCont).left) - 52 + "px";
            if (parseInt(getStyle(oCont).left) % 520 === 0) {
                clearInterval(timer2);
                if (oCont.style.left === "-3120px") {
                    oCont.style.left = "-520px"
                }
            }
        }, 30)
}

    function moveToLeft(){
        var timer1 = setInterval(function() {
            oCont.style.left = parseInt(getStyle(oCont).left) + 52 + "px";
            if (parseInt(getStyle(oCont).left) % 520 == 0) {
                clearInterval(timer1);
                if (oCont.style.left === "0px") {
                    oCont.style.left = "-2600px"
                }
            }
        }, 30)
    }
    
    
    
    oPrev.onclick = function() {
        flag = false;
        moveToLeft();
    };
    oNext.onclick = function() {
        flag = false;
        moveToRight();
    };
    
    
    var timer4 = setInterval(function() {
        if (flag === true) {
            moveToRight();
        } else {
            flag = true
        }
    }, 1000)
};