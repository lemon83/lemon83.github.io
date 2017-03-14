#### 用javaScript下载文件
* HTML5为<a>标签添加了一个download属性，这个属性功能是下载

##### 点击下面网页内容
* [点我进入下载页面](http://lemon83.github.io/notes/down/down.html)


 `<a href="../notes/test.txt" download="test">点我下载</a>`

* 上面为download的使用方法，href就是该文件的位置，download则是该文件下载下来的名字。

* 上面是用html5的新特性来实现下载文件,下面将用JS来下载文件。

***

事实上，用javaScript来下载文件也是利用这一特性来实现的 ：
* 用javaScript创建一个隐藏的<a>标签
* 设置它的href属性
* 设置它的download属性
* 用javaScript来触发它的click事件

`


                var a=document.createElement('a');


                var url=window.URL.createObjectURL(blob);


                var filename='what-you-want.txt';


                a.href=url;


                a.download=filename;


                a.click();


                window.URL.revokeObjectURL(url);
`

window.URL里面有两个方法：
* createObjectURL用blob对象来创建一个objectURL(它是一个DOMString)，我们可以
用这个objectURL来表示某个blob对象，这个objectURL可以用在href和src之类的属性上。

