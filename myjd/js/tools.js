var tools = {
	firstNode: function(obj) {
		if (!obj || !obj.firstChild)
			return null;
		return obj.firstChild.nodeType === 1 ? obj.firstChild : tools.nextNode(obj.firstChild);
	},
	lastNode: function(obj) {
		if (!obj || !obj.lastChild)
			return null;
		return obj.lastChild.nodeType === 1 ? obj.lastChild : tools.preNode(obj.lastChild);
	},
	nextNode: function(obj) {
		if (!obj || !obj.nextSibling)
			return null;
		return obj.nextSibling.nodeType === 1 ? obj.nextSibling : tools.nextNode(obj.nextSibling);
	},
	preNode: function(obj) {
		if (!obj || !obj.previousSibling)
			return null;
		return obj.previousSibling.nodeType === 1 ? obj.previousSibling : tools.preNode(obj.previousSibling);
	},
	startMove: function(obj, attr, iTarget, iSpeed, callBack) {
		clearInterval(obj.oTimer);
		if (iTarget > tools.css(obj, attr)) {
			iSpeed = Math.abs(iSpeed);
		} else {
			iSpeed = -Math.abs(iSpeed);
		}
		obj.oTimer = setInterval(function() {
			var iAttr = tools.css(obj, attr);
			iAttr += iSpeed;
			if (Math.abs(iTarget - iAttr) <= Math.abs(iSpeed)) {
				iAttr = iTarget;
				tools.css(obj, attr, iAttr);
				clearInterval(obj.oTimer);
				callBack && callBack();

			} else {
				tools.css(obj, attr, iAttr);
			}
		}, 20);
	},
	startMovejson: function(obj, ajson, n, callBack) {

		if (obj.oTimer) {
			clearInterval(obj.oTimer);
		}
		obj.oTimer = setInterval(function() {
			var bStop = true;
			var attr = '';
			for (attr in ajson) {
				var iAttr = tools.css(obj, attr); //获取当前值
				//获取速度：
				var iSpeed = (ajson[attr] - iAttr) / n;
				iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				if (iAttr != ajson[attr]) {
					bStop = false;
				}
				iAttr += iSpeed;
				if (iAttr == ajson[attr]) {
					tools.css(obj, attr, ajson[attr]);
				} else if (Math.abs(ajson[attr] - iAttr) <= Math.abs(iSpeed)) {
					iAttr = ajson[attr];
					tools.css(obj, attr, iAttr);
				} else {
					tools.css(obj, attr, iAttr);
				}
			}
			if (bStop) {
				clearInterval(obj.oTimer);
				callBack && callBack();
			}
		}, 20);
	},
	startShake: function(obj, n, attr, callBack) {
		var arr = [];
		var iAttr = tools.css(obj, attr);
		for (var i = n; i >= 0; i -= 2) {
			arr.push(iAttr + i, iAttr - i + 1);
		}
		arr.push(iAttr);
		if (obj.oTimer) {
			return;
		}
		var i = 0;
		obj.oTimer = setInterval(function() {
			tools.css(obj, attr, arr[i]);
			i++;
			if (tools.css(obj, attr) == iAttr) {
				clearInterval(obj.oTimer);
				obj.oTimer = 0;
				callBack && callBack();
			}
		}, 20);
	},

	css: function(obj, attr, val) {
		if (arguments.length >= 3) {
			if (attr == 'opacity') {
				obj.style.opacity = val / 100;
				obj.style.filter = "alpha(opacity=" + val + ")";
			} else {
				obj.style[attr] = val + 'px';
			}
		} else {
			var val = obj.currentStyle ? parseFloat(obj.currentStyle[attr]) : parseFloat(getComputedStyle(obj)[attr]);
			if (attr == 'opacity') {
				return Math.round(val * 100);
			} else {
				return val;
			}
		}
	},
	$: function(selector, content) {
		content = content || document;
		var tag = selector.charAt();
		var str = selector.substring(1);
		var arrClass = [];
		if (tag === '#') {
			return content.getElementById(str);
		} else if (tag === '.') {
			var allEle = content.getElementsByTagName("*");
			for (var i = 0; i < allEle.length; i++) {
				if (allEle[i].className === str)
					arrClass.push(allEle[i]);
			}
			return arrClass;
		} else {
			return content.getElementsByTagName(selector);
		}
	},
	addClass: function(obj, classNames) {
		var classArr = [];
		var Names = obj.className;
		classArr = Names.split(' ');
		for (var j = 0; j < classArr.length; j++) {
			if (classArr[j] === classNames) {
				return;
			}
		}
		if (!obj.className) {
			obj.className = classNames;
		} else {
			obj.className += ' ' + classNames;
		}
	},
	removeClass: function(obj, classNames) {
		var names = obj.className;
		if (!names) {
			return;
		}
		var classArr = names.split(' ');
		for (var j = 0; j < classArr.length; j++) {
			if (classArr[j] === classNames) {
				classArr.splice(j, 1);
				obj.className = classArr.join(' ');
			}
		}
	},
	getByClass:function(classNames,content){
				content=content||document;
				var tags=content.getElementsByTagName('*');
				var tagArr=[];
				for(var i=0;i<tags.length;i++){
					var names=tags[i].className;
					var classArr=names.split(' ');
					for(var j=0;j<classArr.length;j++){
						if(classArr[j]===classNames){
							tagArr.push(tags[i]);
							break;
						}
					}
				}
				return tagArr;
			},

 ajax:function(options) {
	var defaults = {
			method: options.method || 'get',
			url: options.url || '',
			data: options.data || '',
			dataType: options.dataType || "text",
			success: options.success || '',
			fail: options.fail || ''
		}
		//创建ajax
	var xhr = null;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}

	//连接ajax：
	if (defaults.method.toLowerCase() === 'get') {
		defaults.url += '?' + defaults.data;
	}
	xhr.open(defaults.method, defaults.url, true);
	//监控ajax执行完成
	if (typeof xhr.onload !== 'undefined') {
		//指支持onload
		xhr.onload = function() {
			if (xhr.status === 200) { //成功
				var data = xhr.responseText;
				 if (defaults.dataType.toLowerCase() === 'json') {
				 	data = JSON.parse(data);
				} else if (defaults.dataType.toLowerCase() === 'xml') {
					data = xhr.responseXML;
				}
				if (typeof defaults.success === 'function') {
					defaults.success(data);
				}
			} else { //失败
				if (typeof defaults.fail === 'function') {
					defaults.fail(xhr.status, data);
				}
			}
		}
	} else { //不支持xhr.onload的时候
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				var data = xhr.responseText;
				if (defaults.dataType.toLowerCase() === 'json') {
					data = JSON.parse(data);
				} else if (defaults.dataType.toLowerCase() === 'xml') {
					data = xhr.responseXML;
				}
				if (xhr.status === 200) { //成功
					if (typeof defaults.success === 'function') {
						defaults.success(data);
					}
				} else { //失败
					if (typeof defaults.fail === 'function') {
						defaults.fail(xhr.status, data);
					}
				}
			}
		}
	}
	//发送请求
	if (defaults.method.toLowerCase() === 'post') {
		xhr.setRequestHeader("Context-Type", "application/x-www-form-urlencoded;");
		xhr.send(defaults.data);
	} else {
		xhr.send();
	}

}
	
}