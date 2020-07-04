---
date: 2016-07-04
title: "读源码：HTML5 Boilerplate"
categories:
- sourcecode
---
很多人都推荐使用HTML5 Boilerplate作为项目的默认模板，所以周末特意花了些时间研究了一下。使用方法本文就不赘述了，主要是阅读源码，补充自己的不足。

### 目录结构

```
.
├── css
│   ├── main.css
│   └── normalize.css
├── doc
├── img
├── js
│   ├── main.js
│   ├── plugins.js
│   └── vendor
│       └── modernizr.min.js
├── .editorconfig
├── .htaccess
├── 404.html
├── apple-touch-icon.png
├── browserconfig.xml
├── index.html
├── humans.txt
├── robots.txt
├── crossdomain.xml
├── favicon.ico
├── tile-wide.png
└── tile.png
```

结构就是如此，简单概括一下：

+ `404.html`、`index.html`页面不用多说什么
+ `css`，`img`，`js`文件夹中放对应的文件
+ `.editorconfig`文件定义团队代码规范
+ `vendor`目录用来保存所有的第三方库
+ `humans.txt`文件保存项目的开发团队及开发技术等信息
+ `robots.txt`文件记录对搜索引擎屏蔽的页面
+ `crossdamin.xml`是一个用作跨域请求的模板
+ ` favicon.ico`，`tile.png`，`tile-wide.png` 和 `Apple Touch Icon`都是Icons文件。

### HTML

主要是从`index.html`文件开始，首先是第一行的`html`标签中添加了`no-js`的class，这个class源于Modernizr，HTML5 Boilerplate使用了一份自定义的Modernizr。查看目录结构时其实也有看到，Modernizr是一个JavaScript库，作用是确保所有浏览器都可以使用HTML5元素，同时还会根据功能检测的结果为html元素添加不同的类名。那到底如何使用呢？我们可以基于特性的可用性来创建CSS规则（比如：隐藏），如果浏览器不支持这个新特性，那么这些规则就会自动应用到网页上。因此在这里的作用是查看浏览器是否支持JavaScript，如果不支持就显示`no-js`，如果支持就把`no-js`删掉，运行Modernizr时，它会把这个`no-js`的类变为`js`来使你知道它已经运行。

```
<meta http-equiv="X-UA-Compatible" content="IE=edge">
```

这行代码我们常见，用于让IE使用可用的最高版本的模式，IE8用IE8模式，IE9用IE9模式。

```
<meta name="viewport" content="width=device-width, initial-scale=1">
```

这段代码在开发移动端页面时，一般都会用到，含义就是不许浏览器自动对页面的进行缩放，缩放比例是1：1。

```
<!--[if lt IE 8]>
  <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
<![endif]-->
```

Boilerplate的内容区包含了这样一条提示，建议IE8的用户安装最新版本浏览器。

最后，是一段谷歌分析代码。谷歌建议将该脚本置于文档头部。其考虑如下：如果将该脚本置于网页头部，那么即使页面未完全加载，也可以统计用户访问量，并且可以激发浏览器的最大并发连接数。之所以默认包含谷歌分析代码，是因为谷歌分析是当前最流行的追踪解决方案之一。然而，它的用法并不是一成不变的，你应该查看可替代方案，以选择最适合自己的。


### CSS

其实CSS部分有一个比较常用的，就是对于Normalize.css的引用。为了确保所有浏览器的渲染效果更加一致且符合标准，引入了 Normalize.css来实现浏览器的CSS重置。

Normalize.css本质上并不是重置CSS：只处理需要标准化修正的样式，保留浏览器已有的默认样式而不是全盘替换它们，修正浏览器的缺陷和常见性差异，提高可用性。相对来说，个人还是比较喜欢这种CSS reset的方式，但是需要注意的是，现在维护的normalize.cssv3对IE只支持到IE8。

HTML5 Boilerplate使用媒体查询的语句进行移动和响应式设计的开发。当视窗宽度确定下来后，使用 max-width 来替代固定尺寸，比如这样来编写：`@media only screen and (max-width: 480px)`。

### JS

`plugins.js`文件用来包含所有的插件，比如jQuery插件和其他第三方插件。

```
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());
```

`plugins.js`文件默认保存了一小段代码，防止浏览器禁用console而引发的console错误。如果控制台方法不可用，那么这段代码将确保相应的方法为空函数值，防止浏览器报错。

大概就是这样，每次阅读源码都会有收获。