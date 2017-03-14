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

    var a=document.createElement('a');

    var url=window.URL.createObjectURL(blob);

    var filename='what-you-want.txt';

    a.href=url;

    a.download=filename;

    a.click();

    window.URL.revokeObjectURL(url);

window.URL里面有两个方法：
* createObjectURL用blob对象来创建一个objectURL(它是一个DOMString)，我们可以
用这个objectURL来表示某个blob对象，这个objectURL可以用在href和src之类的属性上。

* revokeObjectURL释放由createObjectURL创建的objectURL，当该objectURL不需要
的时候，我们要主动调用这个方法来获取最佳性能和内存使用。

* 上面JS代码用blob对象创建了一条URL，然后用a标签引该URL，再触发点击事件就可以下载文件了


* Blob全称Binary large object,表示一个类文件对象，可以用它来表示一个文件。根据MDN上的
说法,File API也是基于blob来实现的。

* 由于本文的主题是讲javaScript下载文件，那构建的方式就是通过服务器返回的文件来创建blob。

* 最简单的方式就是用fetch API了，我们可以整合上面的例子：



    fetch('../notes/test.txt').then(res =>res.blob().then(blob => {


        var a = document.createElement('a');


        var url = window.URL.createObjectURL(blob);


        var filename = 'test.txt';


        a.href = url;


        a.download = filename;


        a.click();


        window.URL.revokeObjectURL(url)


    }))



* 这种写法相较于前面的写法的确麻烦。如果你要下载的是已经存在服务器上的静态文件的话，
那么按照上一个写法是最方便的。浏览器会帮你处理下载过程，不需要你干涉。如果用blob
的方式来下载文件的话，会有下面这些限制：

限制一：不同浏览器对 blob 对象有不同的限制
具体看看下面这个表格（出自 FileSaver.js）：
![pic](http://lemon83.github.io/motes/images/640.webp)


