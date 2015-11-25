---
layout： post
title： "JavaScript高级程序设计学习笔记：离线应用与客户端存储"
categories：
- 博客
---

支持离线 Web 应用开发是 HTML5 的另一个重点。开发离线Web应用需要几个步骤。首先是确保应用知道设备是否能上网，以便下一步执行正确的操作。然后，应用还必须能访问一定的资源（图像、JavaScript、CSS等），只有这样才能正常工作。最后，必须有一块本地空间用于保存数据，无论能否上网都不妨碍读写。HTML5 及其相关的API让开发离线应用成为现实。

### 离线检测

开发离线应用的第一步是要知道设备是在线还是离线，HTML5为此定义了一个navigator.onLine属性，这个属性值为true表示设备能上网，值为false表示设备离线。除navigator.onLine属性之外，为了更好地确定网络是否可用，HTML5还定义了两个事件： online和offline。当网络从离线变为在线或者从在线变为离线时，分别触发这两个事件。这两个事件在window对象上触发。

为了检测应用是否离线，在页面加载后，最好先通过navigator.onLine取得初始的状态。然后，就是通过上述两个事件来确定网络连接状态是否变化。当上述事件触发时，navigator.onLine属性的值也会改变，不过必须要手工轮询这个属性才能检测到网络状态的变化。

### 应用缓存

HTML5的应用缓存（application cache），是专门为开发离线Web应用而设计的，是从浏览器缓存中分出来的一块缓存区。

使用HTML5，通过创建cache manifest文件，可以轻松地创建web应用的离线版本。

##### 什么是应用程序缓存

HTML5 引入了应用程序缓存，这意味着 web 应用可进行缓存，并可在没有因特网连接时进行访问。

应用程序缓存为应用带来三个优势：

* 离线浏览 - 用户可在应用离线时使用它们
* 速度 - 已缓存资源加载得更快
* 减少服务器负载 - 浏览器将只从服务器下载更新过或更改过的资源。

### 数据存储

##### Cookie

HTTP Cookie，通常直接叫做cookie，最初是在客户端用于存储会话信息的。该标准要求服务器对任意 HTTP 请求发送Set-Cookie HTTP头作为响应的一部分，其中包含会话信息。例如：

```javascript
HTTP/1.1 200 OK
Content-type： text/html
Set-Cookie： name=value
Other-header： other-header-value
```
这个HTTP响应设置以name为名称、以value为值的一个cookie，名称和值在传送时都必须是URL编码的。浏览器会存储这样的会话信息，并在这之后，通过为每个请求添加Cookie HTTP头将信息发送回服务器。

###### 限制：

* IE6以及更低版本限制每个域名最多20 个cookie。
* IE7和之后版本每个域名最多50 个。
* Firefox 限制每个域最多50 个cookie。
* Opera限制每个域最多30 个cookie。
* Safari和Chrome 对于每个域的cookie 数量限制没有硬性规定。

###### cookie的构成：

* 名称：不区分大小写。必须经过URL编码。
* 值：储存在cookie的字符串值，必须被URL编码。
* 域：cookie对哪个域有效。默认认作来自设置cookie的那个域。
* 路径：对于指定域的那个路径，应该向服务器发送cookie。
* 失效时间：cookie何时应该被删除的时间戳，值是GMT格式的日期。
* 安全标志：指定后，cookie只有在使用SSL连接时才发送到服务器。

###### JavaScript 中的 cookie

在JavaScript中处理cookie有些复杂，因为其众所周知的蹩脚的接口，即BOM的document.cookie属性。这个属性的独特之处在于它会因为使用它的方式不同而表现出不同的行为。当用来获取属性值时，document.cookie返回当前页面可用的（根据cookie的域、路径、失效时间和安全设置）所有cookie的字符串，一系列由分号隔开的名值对儿，如下例所示：

```javascript
name1=value1;name2=value2;name3=value3
```
由于JavaScript中读写cookie不是非常直观，常常需要写一些函数来简化cookie的功能。基本的cookie操作有三种：读取、写入和删除。它们在CookieUtil对象中如下表示。

```javascript
var CookieUtil = {
￼￼    cookieStart = document.cookie.indexOf(cookieName),
    cookieValue = null;
    if (cookieStart > -1){
        var cookieEnd = document.cookie.indexOf(";", cookieStart);
        if (cookieEnd == -1){
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
            cookieEnd = document.cookie.length;
        }
        return cookieValue;
    }
},
set: function (name, value, expires, path, domain, secure) {
    var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    if (expires instanceof Date) {
        cookieText += "; expires=" + expires.toGMTString();
    }
    if (path) {
        cookieText += "; path=" + path;
    }
    if (domain) {
        cookieText += "; domain=" + domain;
    }
    if (secure) {
         cookieText += "; secure";
    }
    document.cookie = cookieText;
    },
    unset: function (name, path, domain, secure){
        this.set(name, "", new Date(0), path, domain, secure);
    } 
};
```

###### 子cookie

为了绕开浏览器的单域名下的cookie 数限制，一些开发人员使用了一种称为子cookie（subcookie）的概念。要设置子cookie，也有两种方法：set()和setAll()。其中get()获取单个子cookie的值，getAll()获取所有子cookie并将它们放入一个对象中返回，对象的属性为子 cookie的名称，对应值为子cookie对应的值。get()方法接收两个参数:cookie的名字和子cookie的名字。它其实就是调用getAll()获 取所有的子cookie，然后只返回所需的那一个(如果cookie不存在则返回 null)。


###### 关于cookie的思考

还有一类cookie被称为“HTTP专有cookie”。这样的cookie可以从浏览器或者服务器设置，但是只能从服务器端读取，因为Javascript无法获取HTTP专有cookie的值，只能通过HTTP（HTTPS）请求来获取cookie值。

由于所有的cookie都会由浏览器作为请求头发送，所以在cookie中存储大量信息会影响到特定域的请求性能。cookie信息越大，完成对服务器的请求时间也就越长。所以还是尽可能在cookie中少存储信息。

一定不要在cookie中存储重要和敏感的数据，它包含的任何数据都可以被他人访问。

###### IE用户数据(经测试仅在ie7下可以)

```javascript
<div style="behavior:url(#default#userData)" id="dataStore">

var dataStore = document.getElementById("dataStore");
dataStore.setAttribute("name", "Nicholas");
dataStore.setAttribute("book", "Professional JavaScript");
dataStore.save("BookInfo");
dataStore.load("BookInfo");
alert(dataStore.getAttribute("name")); //"Nicholas"
alert(dataStore.getAttribute("book")); //"Professional JavaScript"
```
和cookie 不同的是，你无法将用户数据访问限制扩展到更多的客户。还有一点不同，用户数据默认是可以跨越会话持久存在的，同时也不会过期；数据需要通过removeAttribute()方法专门进行删除以释放空间。

##### IE用户数据

IE5使用持久化用户数据，首先使用CSS某个元素指定userData行为，然后使用setAttribute方法保存数据，为了将数据提交到浏览器还要调用save()告诉它数据空间的名称。下次页面载入后可以使用load()指定同样的数据空间来获取数据。removeAttribute()方法指定删除某元素数据。

### Web存储机制

Web Storage 的两个主要目标是：

* 提供一种在cookie 之外存储会话数据的途径
* 提供一种存储大量可以跨会话存在的数据的机制
 
##### Stroage类型

提供最大的存储空间

##### seessionStorage对象

存储特定于某个会话的数据，只保持到浏览器关闭，主要用于只针对会话的小段数据的存储。

##### globalStroage对象

目的是跨越会话存储数据，有特定的访问限制。

##### localStroage对象

在修订过的HTML5规范作为持久保存客户端数据的方案取代了globalStorage。

##### stroage事件

对storage对象任何修改都会在文档上触发storage事件。

##### 限制

每个来源都有固定大小的空间保存自己的数据。

##### IndexedDB
  
是在浏览器保存结构化数据的一种数据库，其思想是创建一套API，方便保存和读取javascript对象，还支持查询和搜索。

操作完全是异步进行，差不多每一次操作都要注册onerror或onsuccess事件处理程序。

* 数据库

它的最大特色是使用对象保存数据，而不是使用表。

* 对象存储空间

使用对象存储空间，如果数据库版本与传入的版本不匹配可能要创建新的对象存储空间。在创建对象存储空间必须指定键，作为唯一的数据。

* 事务

调用transaction()方法可以创建事务，任何时候想读取或修改数据都通过事务来操作。

* 使用游标查询

在需要检测多个对象的情况下需要在事务内部创建游标。游标是指向结果集的指针，先指向结果的第一项，接到查询下一项的指令时才指向下一项。

* 键范围

由IDBKeyRange的实例表示。

* 设定游标方向

openCursor()可接受两个参数。

* 索引

创建索引先要引用对象存储空间，然后调用createInedx()方法。

* 并发问题

只有浏览器仅有一个标签页使用数据库的情况下，调用setVersion才能完成操作。

* 限制

只能由同源页面操作，不能跨域共享信息；每个来源的数据库占用的磁盘空间有限制。