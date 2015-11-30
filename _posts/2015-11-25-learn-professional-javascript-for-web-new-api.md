---
layout: post
title: "JavaScript高级程序设计学习笔记：新兴的API"
categories:
- 博客
---

### requestAnimationFrame()

##### 早期动画循环

在JavaScript中创建动画的典型方式，就是使用setInterval()方法来控制所有动画。以下是一个使用setInterval()的基本动画循环:

```javascript
(function(){
    function updateAnimations(){
        doAnimation1(); 
        doAnimation2(); 
        //其他动画
    }
    setInterval(updateAnimations, 100);
})();
```
##### 循环间隔的问题

知道什么时候绘制下一帧是保证动画平滑的关键。然而，直至最近，开发人员都没有办法确保浏览器按时绘制下一帧。随着canvas元素越来越流行，新的基于浏览器的游戏也开始崭露头脚，面对不 十分精确的setInterval()和setTimeout()，开发人员一筹莫展。

##### mozRequestAnimation-Frame

Mozilla的RobertO’Callahan认识到了这个问题，提出了一个非常独特的方案。他指出，CSS变换和动画的优势在于浏览器知道动画什么时候开始，因此会计算出正确的循环间隔，在恰当的时候刷新UI。而对于JavaScript动画，浏览器无从知晓什么时候开始。因此他的方案就是创造一个新方法mozRequestAnimationFrame()，通过它告诉浏览器某些JavaScript代码将要执行动画。这样浏览器可以在运行某些代码后进行适当的优化。

mozRequestAnimationFrame()方法接收一个参数，即在重绘屏幕前调用的一个函数。这个函数 负责改变下一次重绘时的DOM样式。为了创建动画循环，可以像以前使用setTimeout()一样，把多个对mozRequestAnimationFrame()的调用连缀起来。比如:

```javascript
function updateProgress(){
    var div = document.getElementById("status");
    div.style.width = (parseInt(div.style.width, 10) + 5) + "%";
    if (div.style.left != "100%"){
        mozRequestAnimationFrame(updateProgress);
    } 
}
mozRequestAnimationFrame(updateProgress);
```
因为mozRequestAnimationFrame()只运行一次传入的函数，因此在需要再次修改UI从而生成动画时，需要再次手工调用它。同样，也需要同时考虑什么时候停止动画。这样就能得到非常平滑流畅的动画。

### webkitRequestAnimationFrame与msRequest-AnimationFrame

基于mozRequestAnimationFrame()，Chrome和IE10+也都给出了自己的实现，分别叫webkit- RequestAnimationFrame()和msRequestAnimationFrame()。这两个版本与 Mozilla的版本有两个方面的微小差异。首先，不会给回调函数传递时间码，因此你无法知道下一次重绘将发生在什么时间。 其次，Chrome又增加了第二个可选的参数，即将要发生变化的DOM元素。知道了重绘将发生在页面中哪个特定元素的区域内，就可以将重绘限定在该区域中。既然没有下一次重绘的时间码，那Chrome和IE没有提供mozAnimationStartTime的实现也就很容易理解了：没有那个时间码，实现这个属性也没有什么用。不过，Chrome倒是又提供了另一个方法webkitCancelAnimationFrame()，用于取消之前计划执行的重绘操作。

### Page Visibility API

不知道用户是不是正在与页面交互，这是困扰广大Web开发人员的一个主要问题。如果页面最小 化了或者隐藏在了其他标签页后面，那么有些功能是可以停下来的，比如轮询服务器或者某些动画效果。 而Page Visibility API(页面可见性API)就是为了让开发人员知道页面是否对用户可见而推出的。
这个API本身非常简单，由以下三部分组成。

document.hidden：表示页面是否隐藏的布尔值。页面隐藏包括页面在后台标签页中或者浏览
器最小化。

document.visibilityState：表示下列 4 个可能状态的值。
页面在后台标签页中或浏览器最小化。

* 页面在前台标签页中。
* 实际的页面已经隐藏，但用户可以看到页面的预览(就像在 Windows 7 中，用户把鼠标移动到任务栏的图标上，就可以显示浏览器中当前页面的预览)。
* 页面在屏幕外执行预渲染处理。

visibilitychange事件：当文档从可见变为不可见或从不可见变为可见时，触发该事件。

### Geolocation API

地理定位(geolocation)是最令人兴奋，而且得到了广泛支持的一个新API。通过这套API，JavaScript代码能够访问到用户的当前位置信息。

Geolocation API 在浏览器中的实现是 navigator.geolocation 对象，这个对象包含 3 个方法。第一个方法是 getCurrentPosition()，调用这个方法就会触发请求用户共享地理定位信息的对话框。这个方法接收 3 个参数：成功回调函数、可选的失败回调函数和可选的选项对象。其中，成功回调函数会接收到一个Position对象参数，该对象有两个属性：coords和timestamp。

而coords对象中将包含下列与位置相关的信息。

* latitude：以十进制度数表示的纬度。
* longitude：以十进制度数表示的经度。
* accuracy：经、纬度坐标的精度，以米为单位。

有些浏览器还可能会在 coords 对象中提供如下属性。

* altitude：以米为单位的海拔高度，如果没有相关数据则值为null。
* altitudeAccuracy：海拔高度的精度，以米为单位，数值越大越不精确。 
* heading：指南针的方向，0°表示正北,值为NaN表示没有检测到数据。 
* speed：速度，即每秒移动多少米，如果没有相关数据则值为null。

在实际开发中,latitude 和 longitude 是大多数 Web 应用最常用到的属性。

getCurrentPosition()的第二个参数,即失败回调函数，在被调 用的时候也会接收到一个参数。这个参数是一个对象，包含两个属性：message和code。其中，message属性中保存着给人看的文本消息，解释为什么会出错，而code属性中保存着一个数值，表示错误的类型：用户拒绝共享、位置无效或者超时。

getCurrentPosition()的第三个参数是一个选项对象，用于设定信息的类型。可以设置的选项有三个：enableHighAccuracy是一个布尔值，表示必须尽可能使用最准确的位置信息；timeout是 以毫秒数表示的等待位置信息的最长时间；maximumAge表示上一次取得的坐标信息的有效时间，以毫秒表示，如果时间到则重新取得新坐标信息。

这三个选项都是可选的，可以单独设置，也可以与其他选项一起设置。

### File API

File API在表单中的文件输入字段的基础上，又添加了一些直接访问文件信息的接口。HTML5在DOM中为文件输入元素添加了一个files集合。在通过文件输入字段选择了一或多个文件时，files集合中将包含一组File对象，每个File对象对应着一个文件。每个File对象都有下列只读属性。

* name：本地文件系统中的文件名。
* size：文件的字节大小。
* type：字符串，文件的MIME类型。
* lastModifiedDate：字符串，文件上一次被修改的时间(只有Chrome实现了这个属性)。

##### FileReader 类型

FileReader类型实现的是一种异步文件读取机制。可以把FileReader想象成XMLHttpRequest，区别只是它读取的是文件系统，而不是远程服务器。为了读取文件中的数据，FileReader提供了如下几个方法。

* readAsText(file,encoding)：以纯文本形式读取文件，将读取到的文本保存在result属性中。第二个参数用于指定编码类型，是可选的。
* readAsDataURL(file)：读取文件并将文件以数据URI的形式保存在result属性中。 
* readAsBinaryString(file)：读取文件并将一个字符串保存在result属性中，字符串中的
每个字符表示一字节。 
* readAsArrayBuffer(file)：读取文件并将一个包含文件内容的ArrayBuffer 保存在result属性中。

##### 读取部分内容

有时候，我们只想读取文件的一部分而不是全部内容。为此，File对象还支持一个 slice()方法，这个方法在Firefox中的实现叫mozSlice()，在Chrome中的实现叫 webkitSlice()，Safari的5.1及之前版本不支持这个方法。slice()方法接收两个参数：起始字节及要读取的字节数。这个方法返回一个Blob的实例，Blob是File类型的父类型。

##### 对象URL

对象URL也被称为blobURL，指的是引用保存在File或Blob中数据的URL。使用对象URL的好处是可以不必把文件内容读取到JavaScript中而直接使用文件内容。为此，只要在需要文件内容的地方提供对象URL即可。要创建对象URL，可以使用window.URL.createObjectURL()方法，并传入File或Blob对象。

##### 读取拖放的文件

围绕读取文件信息，结合使用HTML5拖放API和文件API，能够创造出令人瞩目的用户界面:在页面上创建了自定义的放置目标之后，你可以从桌面上把文件拖放到该目标。与拖放一张图片或者一个链接类似，从桌面上把文件拖放到浏览器中也会触发drop事件。而且可以在event.dataTransfer.files中读取到被放置的文件，当然此时它是一个File对象，与通过文件输入字段取得的File对象一样。

##### 使用XHR 上传文件

通过File API能够访问到文件内容，利用这一点就可以通过XHR直接把文件上传到服务器。当然 啦，把文件内容放到send()方法中，再通过POST请求，的确很容易就能实现上传。但这样做传递的是文件内容，因而服务器端必须收集提交的内容，然后再把它们保存到另一个文件中。其实，更好的做 法是以表单提交的方式来上传文件。

这样使用FormData类型就很容易做到了。首先，要创建一个FormData对象，通过它调用append()方法并传入相应的File对象作为参数。然后，再把FormData对象传递给XHR的send()方法，结果与通过表单上传一模一样。

### Web 计时

Web计时机制的核心是window.performance对象。对页面的所有度量信息，包括那些规范中已经定义的和将来才能确定的，都包含在这个对象里面。Web Timing规范一开始就为performance对象定义了两个属性。

### Web Workers

随着Web应用复杂性的与日俱增，越来越复杂的计算在所难免。长时间运行的 JavaScript进程会导致浏览器冻结用户界面，让人感觉屏幕”冻结”了。Web Workers规范通过让JavaScript在后台运行解决了这个问题。浏览器实现 Web Workers规范的方式有很多种，可以使用线程、后台进程或者运行在其他 处理器核心上的进程，等等。

##### 使用Worker

实例化Worker对象并传入要执行的JavaScript文件名就可以创建一个新的Web Worker。

```javascript
var worker = new Worker("stufftodo.js");
```
这行代码会导致浏览器下载 stufftodo.js，但只有Worker接收到消息才会实际执行文件中的代码。要给Worker传递消息，可以使用postMessage()方法(与 XDM 中的 postMessage()方法类似)：

```javascript
worker.postMessage(“start! ");
```
消息内容可以是任何能够被序列化的值，不过与XDM不同的是，在所有支持的浏览器中，postMessage()都能接收对象参数(Safari4是支持Web Workers的浏览器中最后一个只支持字符串参数的)。

##### Worker 全局作用域

关于Web Worker，最重要的是要知道它所执行的JavaScript代码完全在另一个作用域中，与当前网页中的代码不共享作用域。在Web Worker中，同样有一个全局对象和其他对象以及方法。但是，Web Worker中的代码不能访问 DOM，也无法通过任何方式影响页面的外观。
Web Worker中的全局对象是worker对象本身。也就是说，在这个特殊的全局作用域中,this和self引用的都是worker对象。为便于处理数据，Web Worker本身也是一个最小化的运行环境。

* 最小化的navigator对象，包括onLine、appName、appVersion、userAgent和platform 属性；
* 只读的 location 对象；
* setTimeout()、setInterval()、clearTimeout()和 clearInterval()方法；
* XMLHttpRequest 构造函数。

显然，Web Worker 的运行环境与页面环境相比,功能是相当有限的。



