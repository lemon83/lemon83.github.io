window.onload=function(){

	//头部左边变量
	var oHeaderLeftBox=document.getElementById("header_left_box"),
		oHeaderLeft=document.getElementById("header_left"),
		oHeaderLeftCon=document.getElementById("header_left_con"),
		oHeaderLeftIcon=document.getElementById("header_left_icon"),
		oHeaderLeftNav=document.getElementById("header_left_nav"),
		aHeaderLeftNavA=oHeaderLeftNav.getElementsByTagName("a");

	//头部右边变量
	var oHeaderRightBox=document.getElementById("header_right_box"),
	    aHeaderRightLi=oHeaderRightBox.getElementsByTagName("li");

	//广告无缝滚动变量
	var oScrollAdBg=document.getElementById("big_ad_bg"),
		oScrollBox=document.getElementById("seamless_scroll"),
		oScrollList=document.getElementById("scroll_list"),
		aScrollLi=oScrollList.getElementsByTagName("li"),
		timer=null;

	//购物车变量
	var oShoppingBox=document.getElementById("shopping_cart_box"),
		oShoppingCart=document.getElementById("shopping_cart"),
		oShoppingCon=document.getElementById("shopping_cart_con");

	//搜索框变量
	var oText01=document.getElementById("text_01");
		oText01Con=oText01.value;

	//导航条变量
	var oShowNav=document.getElementById("show_nav"),
		aShowNavLi=oShowNav.getElementsByTagName("li"),
		aShowCon=tools.getByClass('show_con',oShowNav);

	//轮播图变量
	var oBannerBox=document.getElementById("banner_box"),
		oBanner=document.getElementById("banner"),
		aBannerLi=oBanner.getElementsByTagName("li"),
		oPrev=document.getElementById("prev"),
		oNext=document.getElementById("next"),
		oPagesBox=document.getElementById("pages_box"),
		aPagesBoxA=oPagesBox.getElementsByTagName("a"),
		num=0;


	//生活服务变量
	var oServiceBox=document.getElementById("service_con_box"),
		oServiceList=document.getElementById("service_con_list"),
		aServiceA=oServiceList.getElementsByTagName("a"),
		aServiceDiv=tools.getByClass('service_con_item'),

		oLifeList=document.getElementById("life_service_list"),
		aLifeListLi=oLifeList.getElementsByTagName("li"),

		aClose=tools.getByClass('close'),

		flag=true;

	//话费什么的每一项变量
	var aServiceCon=tools.getByClass('service_con_item_padd');

	//今日推荐轮播图变量
	var	oRecomBox=document.getElementById("recom_banner"),
	 	oRecomList=document.getElementById("recom_list"),
		aRecomListLi=oRecomList.getElementsByTagName("li"),
		oRecomPrev=document.getElementById("recom_prev"),
		oRecomNext=document.getElementById("recom_next"),
		RecomListNum=0;


	//头部左边JS操作
	oHeaderLeftBox.onmouseover=function(){
		oHeaderLeftNav.style.display="block";
		tools.addClass(oHeaderLeft,"showBox");
	}

	oHeaderLeftBox.onmouseout=function(){
		oHeaderLeftNav.style.display="none";
		tools.removeClass(oHeaderLeft,"showBox");
	}

	for(var i=0,len=aHeaderLeftNavA.length;i<len;i++){
		aHeaderLeftNavA[i].onclick=function(){
			for(var j=0,len=aHeaderLeftNavA.length;j<len;j++){
				aHeaderLeftNavA[j].className="";
			}
			this.className="active";
			oHeaderLeftNav.style.display="none";
			oHeaderLeftCon.innerHTML=this.innerHTML;
		}
	}

	//头部右边JS操作
	for(var i=0;i<aHeaderRightLi.length;i++){
		headerDivShow(aHeaderRightLi[i]);
		
	}


	function headerDivShow(li){
		var oHeaderA=li.children[0];
		var oHeaderDiv=li.children[1];

		li.onmouseenter=function(){
			if(oHeaderDiv){
				tools.addClass(oHeaderA,"active_a");
				oHeaderDiv.style.display="block";

			}
		}
		li.onmouseleave=function(){
			if(oHeaderDiv){
				tools.removeClass(oHeaderA,"active_a");
				oHeaderDiv.style.display="none";

			}
		}
	}

	//广告无缝滚动JS操作
	/*oScrollList.innerHTML+=oScrollList.innerHTML;*/
	
	oScrollList.style.height=aScrollLi[0].offsetHeight*aScrollLi.length+"px";

	oScrollList.timer=setInterval(ScrollMove,1000);

	oScrollBox.onmouseover=function(){
		clearInterval(oScrollList.timer);
	}

	oScrollBox.onmouseout=function(){
		oScrollList.timer=setInterval(ScrollMove,1000);
	}

	function ScrollMove(){
		oScrollList.style.top=oScrollList.offsetTop-aScrollLi[0].offsetHeight+"px";

		if(oScrollList.offsetTop<-oScrollList.offsetHeight/2+aScrollLi[0].offsetHeight){
			oScrollList.style.top="0";
		}

	}

	//购物车JS操作
	oShoppingBox.onmouseenter=function(){
		tools.addClass(oShoppingCart,"cur");
		oShoppingCon.style.display="block";
	}

	oShoppingBox.onmouseleave=function(){
		tools.removeClass(oShoppingCart,"cur");
		oShoppingCon.style.display="none";
	}
	

	//导航条JS操作
	for(var i=0;i<aShowNavLi.length;i++){
		aShowNavLi[i].onmouseover=function(){
			tools.addClass(this,"active");
		}

		aShowNavLi[i].onmouseout=function(){
			tools.removeClass(this,"active");
		}
	}

	//最后一个ul的下边框去掉
	for(var i=0;i<aShowCon.length;i++){
		tools.lastNode(aShowCon[i]).children[1].style.border="none";
	}

	//轮播图JS操作
	oBannerBox.onmouseover=function(){
		oPrev.style.display="block";
		oNext.style.display="block";

		clearInterval(oBannerBox.timer);
	}

	oBannerBox.onmouseout=function(){
		oPrev.style.display="none";
		oNext.style.display="none";

		autoPlay();
	}

	oNext.onclick=function(){
		num++;
		if(num>=aPagesBoxA.length) num=0;

		clear_active();
	}

	oPrev.onclick=function(){
		num--;
		if(num<=0) num=aPagesBoxA.length-1;

		clear_active();
	}

	for(var i=0;i<aPagesBoxA.length;i++){
		aPagesBoxA[i].index=i;
		aPagesBoxA[i].onmouseover=function(){
			num=this.index;

			clear_active();
		}
	}

	autoPlay();

	function autoPlay(){
		oBannerBox.timer=setInterval(function(){
			num++;
			if(num>=aPagesBoxA.length) num=0;

			clear_active();
		},1000)
	}

	function clear_active(){
		for(var i=0;i<aPagesBoxA.length;i++){
			aPagesBoxA[i].className="";
		}
		aPagesBoxA[num].className="active";

		oBanner.style.left=-num*aBannerLi[0].offsetWidth+"px";
	}


	//生活服务JS操作
	for(var i=0;i<4;i++){
		aLifeListLi[i].index=i;
		aServiceA[i].index=i;
		aLifeListLi[i].onmouseover=function(){
			if(flag){
				oServiceBox.style.display="block";

				for(var i=0;i<aServiceA.length;i++){
					aServiceA[i].className="";
					aServiceDiv[i].style.display="none";
				}
				this.className="active";
				aServiceA[this.index].className="active";
				aServiceDiv[this.index].style.display="block";

			}
		}

		/*aLifeListLi[i].onmouseout=function(){
			flag = true;
		}*/

		aServiceA[i].onmouseover=function(){
			for(var i=0;i<aServiceA.length;i++){
				aServiceA[i].className="";
				aServiceDiv[i].style.display="none";
			}
			this.className="active";
			aServiceDiv[this.index].style.display="block";

		}
	}
	

	document.onmouseover=function(){
		flag = true;
	}

	for(var i=0;i<aClose.length;i++){
		aClose[i].onclick=function(ev){
			var e = ev || event;
			flag = false;
			oServiceBox.style.display = 'none';
			e.cancelBubble = true;	
		}
	}


	//话费每一项JS操作
	for(var i=0;i<aServiceCon.length;i++){
		ttt(aServiceCon[i]);
	}

	function ttt(obj){
		var oServiceConList=obj.children[0],
			aServiceConListA=oServiceConList.getElementsByTagName("a"),
			aServiceConDiv=tools.getByClass('recharge_box',obj);

		for(var i=0;i<aServiceConListA.length;i++){
			aServiceConListA[i].index=i;
			aServiceConListA[i].onmouseover=function(){
				for(var i=0;i<aServiceConListA.length;i++){
					aServiceConListA[i].className="";
					aServiceConDiv[i].style.display="none";
				}
				this.className="active";
				aServiceConDiv[this.index].style.display="block";
			}
		}

	}


	//今日推荐轮播图JS操作

	/*oRecomList.innerHTML+=oRecomList.innerHTML;*/

	oRecomList.style.width=aRecomListLi[0].offsetWidth*aRecomListLi.length+"px";

	oRecomBox.onmouseover=function(){
		oRecomPrev.style.display="block";
		oRecomNext.style.display="block";
	}

	oRecomBox.onmouseout=function(){
		oRecomPrev.style.display="none";
		oRecomNext.style.display="none";
	}
	
	oRecomPrev.onclick=function(){
		RecomListNum--;

		if(RecomListNum<0){
			RecomListNum=aRecomListLi.length-1;
		}

		oRecomList.style.left=-RecomListNum*aRecomListLi[0].offsetWidth+"px";

	}

	oRecomNext.onclick=function(){
		RecomListNum++;

		if(RecomListNum>aRecomListLi.length-1) {
			RecomListNum=0;
		}

		oRecomList.style.left=-RecomListNum*aRecomListLi[0].offsetWidth+"px";
	}
}