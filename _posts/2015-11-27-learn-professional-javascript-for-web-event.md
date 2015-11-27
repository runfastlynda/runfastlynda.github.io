---
layout: post
title: "JavaScript高级程序设计学习笔记：事件"
categories:
- 博客
---

### 事件流

事件流描述的是从页面中接收事件的顺序。IE和Netscape开发团队居然提出了相反的事件流的概念。IE的事件流是事件冒泡流，Netscape的事件流是事件捕获流。

##### 事件冒泡

IE的事件流是事件冒泡流，即事件开始时最具体的元素（文档中嵌套层次最深的那个节点）接收，然后逐级向上传播到较为不具体的节点（文档）。以下面的HTML页面为例：

```javascript
<html>
<head>
    <title>Event Bubbling Example</title>
</head>
<body>
    <div id="myDiv">Click Me</div>
</body>
</html>
```
如果你点击了页面中的div元素，那么这个click事件按照如下顺序传播：
div =》body =》html =》document

也就是，click事件首先在div元素上发生，而这个元素就是我们点击的元素。然后，click事件沿DOM树向上传播，在每一级节点上都会发生，直至传播到document对象。

##### 事件捕获

Netscape的事件流是事件捕获流，事件捕获的用意在于在事件到达目标之前捕获它。那么上面相同的click事件在事件捕获流中按照如下顺序传播：
document =》html =》body =》div

由于老版本的浏览器不支持，因此很少有人使用事件捕获。我们也建议读者放心的使用事件冒泡，在有特殊需要再使用事件捕获。

##### DOM事件流

DOM2级事件规定的事件流包括三个阶段：事件捕获阶段，处于目标阶段和事件冒泡阶段。事件捕获为捕获事件提供了机会，然后是实际的目标接收到事件，最后的冒泡阶段对事件作出响应。

还拿上面的click事件为例：在DOM事件流中，实际的目标（div元素）在捕获阶段不会接收事件。这意味着在捕获阶段，事件从document到html再到body后就停止了，下一个阶段是“处于目标”阶段，于是事件在div上发生，并在事件处理中被看成冒泡阶段的一部分。然后，冒泡阶段发生，事件又传播回文档。

### 事件处理程序

事件就是用户或浏览器自身执行的某种动作，响应某个事件的函数为事件处理程序，以on开头。

##### HTML事件处理程序

某个元素支持的每种事件，都可以使用一个与相应事件处理程序同名的HTML特性来指定。这个特性的值应该是能够执行的javascript代码。例如：

```javascript
<input type="button" value="Click Me" onClick="document.write('clicked')"/>
```
但是在HTML中定义的事件处理程序可以包含要执行的具体动作(有权访问全局作用域中的任何代码)：

```javascript
<script type="text/javascript">
    function showMessage() {
        document.write("Hello world!"); 
    }
</script>
```
这样指定事件处理程序具有一些独到之处。因为这样会创建一个封装着元素属性值的函数，而这个函数有一个局部变量event，也就是事件对象：

```javascript
<input type="button" value="Click Me" onClick="alert(event.type)"/>
```

HTML事件处理程序的缺点：

* 存在一个时差问题。因为用户可能会在HTML元素一出现在页面上就触发相应的事件，但当时的事件处理程序有可能尚不具备执行条件。通常使用try--catch来捕获异常。
* 这样扩展事件处理程序的作用域链在不同浏览器中会导致不同的结果。
* HTML与JavaScript代码紧密耦合，不好修改代码。

##### DOM0级事件处理程序

通过JavaScript指定事件处理程序的传统方法，就是将一个函数赋值给一个事件处理程序的属性。每个元素都有自己的事件处理程序属性。例如：

```javascript
<input id="myBtn" type="button" value="Click Me" />
<script>
var btn = document.getElementById("myBtn");
btn.onclick = function() {
    alert("Clicked");   
    alert(this.id);
};
<script>
```
使用DOM0级方法指定的事件处理程序被认为是元素的方法。因此，这时候的事件处理程序是在元素的作用域中运行；则程序中的this引用当前的元素，甚至可以通过this访问元素的任何属性和方法。

我们可以指定属性为空，则删除事件处理程序：

```javascript
btn.onclick = null; //删除事件处理程序
```
##### DOM2级事件处理程序

DOM2级事件定义了两个方法，用于处理指定和删除事件处理程序的操作：addEventListener()和removeEventListener()。所有DOM节点中都包含这两个方法，并且它们都接受三个参数：要处理的事件名，作为事件处理程序的函数和一个布尔值。最后这个布尔值参数是true，表示在捕获阶段调用事件处理程序；如果是false，表示在冒泡阶段调用事件处理程序(一般都是冒泡阶段来处理事件)：

```javascript
<input id="myBtn" type="button" value="Click Me" />
<script>
    var btn = document.getElementById("myBtn");
    btn.addEventListener("click", function(){
        alert(this.id);
    }, false);
</script>
```
而DOM2级事件的好处是可以添加多个事件处理程序（DOM0级事件处理程序无法办到）：

```javascript
var btn = document.getElementById("myBtn");
btn.addEventListener("click", function(){
    alert(this.id);
}, false);
btn.addEventListener("click", function(){
    alert("Hello world!");  
}, false);
```
事件处理会按照它们添加的顺序触发。通过addEventListener()添加的事件处理程序只能使用removeEventListener()来移除；移除时候传入的参数与添加处理程序时使用的参数相同。这就意味着通过addEventListener()添加的匿名函数将无法移除：

```javascript
var btn = document.getElementById("myBtn");
btn.addEventListener("click", function(){
    alert(this.id);
}, false);
//移除失败!因为匿名函数不相等
btn.removeEventListener("click", function(){
    alert(this.id); 
}, false)
//修改如下
var handler = function() {
    alert(this.id); 
};
var btn = document.getElementById("myBtn");
btn.addEventListener("click", handler, false);
//移除失败!因为匿名函数不相等
btn.removeEventListener("click", handler, false)
```

##### IE级事件处理程序

IE提供与DOM类似的两个方法：attachEvent()和detachEvent()。它们接受两个参数：事件处理程序名称和事件处理程序函数。它与DOM2级事件处理程序有以下不同：

* 事件处理程序会在全局作用域中运行(而DOM是在元素的作用域中运行)
* 添加不同的事件处理程序后,是以相反的顺序被触发的(和DOM是完全相反)
* 事件处理程序以on开头

```javascript
var handler = function() {
    alert(this.id); 
};
var btn = document.getElementById("myBtn");
btn.attachEvent("onclick", handler);
```

##### 跨浏览器的事件处理程序

创建addHandler()和removeHandler()方法，结合DOM0级方法，DOM2级方法和IE级方法来处理跨浏览器的事件处理程序。

```javascript
var EventUtil = {
    addHandler : function(element, type, handler) {
        //DOM2
        if (element.addEventListener) {
            element.addEventListener(type, handler, false); 
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);  
        } else {
            element["on" + type] = handler; 
        }
    },  
    removeHandler : function(element, type, handler) {
        //DOM2  
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);  
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);  
        } else {
            element["on" + type] = null;    
        }
    }
};
```

而我们可以这样使用EventUtil对象：

```javascript
var btn = document.getElementById("myBtn");
var handler = function() {
    alert("clicked");   
};
EventUtil.addHandler(btn,"click", handler);
//省略其他代码
EventUtil.removeHandler(btn, "click", handler);
```

### 事件对象

在触发DOM上的某个事件时，会产生一个事件对象event，这个对象中包含着所有与事件有关的信息，包括导致事件的元素，事件的类型以及其他特定事件相关的信息。

##### DOM中的事件对象

兼容DOM的浏览器会将一个event对象传入到事件处理程序中。无论指定事件处理程序时使用什么方法(DOM0/DOM2)，都会传入event对象：

```javascript
var btn = document.getElementById("myBtn");
btn.onclick = function(event) {
    alert(event.type + " DOM0");    
};
btn.addEventListener("click", function(event){
    alert(event.type + " DOM2");    
}, false);
```
这里程序只会弹出DOM0和DOM2，而HTML的并未弹出。

event对象包含与创建它的特定事件有关的属性和方法。触发的事件类型不一样，可用的属性和方法也不一样。不过，所有事件都会有下表列出的成员：


| 属性/方法        | 类型           | 读/写 | 说明 |
|:-------------:|:-------------:|:-----:|:-----:|
|bubbles|Boolean|只读|表明事件是否冒泡|
|cancelable|Boolean|只读|表明是否可以取消事件的默认行为|
|currentTarget|Element|只读|其事件处理程序当前正在处理事件的那个元素|
|defaultPrevented|Boolean|只读|为true表示已经调用了preventDefault()(DOM3级事件中新增)|
|detail|Integer|只读|与事件相关的细节信息|
|eventPhase|Integer|只读|调用事件处理程序的阶段：1表示捕获阶段，2表示处于目标，3表示冒泡阶段|
|preventDefault()|Function|只读|取消事件的默认行为。如果cancelable是true，则可以使用这个方法|
|stopImmediatePropagation()|Function|只读|取消事件的进一步捕获或冒泡，同时阻止任何事件处理程序被调用(DOM3级事件中新增)|
|stopPropagation()|Function|只读|取消事件的进一步捕获或冒泡。如果bubbles为true，则可以使用这个方法|
|target|Element|只读|事件的目标|
|trusted|Boolean|只读|为true表示事件是浏览器生成的。为false表示事件是由开发人员通过javascript创建的。(DOM3级事件中新增)|
|type|String|只读|被触发的事件类型|
|view|AbstractView|只读|与事件关联的抽象视图。等同于发生事件的window对象。|

在事件处理程序内部，对象this始终等于currentTarget的值，而target则只包含事件的实际目标。如果直接将事件处理程序指定给了目标元素，则this、currentTarget和target包含相同的值：

```javascript
var btn = document.getElementById("myBtn");
btn.onclick = function(event) {
    //this为当前对象
    //currentTarget为事件处理程序当前正在处理事件的元素
    //target为事件的目标
    alert(event.currentTarget === this);    //true
    alert(event.target === this);       //true
};

document.body.onclick = function(event) {
    alert(event.currentTarget === document.body);   //true
    alert(this === document.body);  //true
    alert(event.target === document.getElementById("myBtn"));   //true
};
```
在需要通过一个函数处理多个事件时，可以使用type属性：

```javascript
var btn = document.getElementById("myBtn");
var handler = function(event) {
    switch (event.type) {
        case "click":
            alert("clicked");
            break;
        case "mouseover":
            event.target.style.backgroundColor = "red";
            break;
        case "mouseout":
            event.target.style.backgroundColor = "";
            break;  
    }   
};
btn.onclick = handler;
btn.onmouseover = handler;
btn.onmouseout = handler;
```
则鼠标移动到按钮上时候，会显示红色，移开则恢复默认值。点击则弹出警告框。我们可以通过preventDefault()来阻止特定事件的默认行为：

```javascript
//阻止默认导航
var link = document.getElementById("myLink");
link.onclick = function(event) {
    event.preventDefault(); 
};
```
我们也可以使用stopPropagation()来停止事件在DOM层次中的传播：

```javascript
var btn = document.getElementById("myBtn");
btn.onclick = function(event) {
    alert("Clicked");
    event.stopPropagation();    //如果注释掉,则body会弹出警告框
};
document.body.onclick = function(event) {
    alert("Body clicked");  
};
```
##### IE中的事件对象

访问IE中的event对象，取决于指定的事件处理程序方法。

* 使用DOM0级方法添加事件处理程序时，event对象作为window对象的一个属性存在。
* 使用attachEvent()添加，则有一个event对象作为参数传入。同时也可以通过window.event访问。
* 通过HTML特性指定事件处理程序时，可以通过一个名叫event的变量访问event对象。

IE中所有的event对象包含以下属性/方法：

| 属性/方法        | 类型           | 读/写 | 说明 |
|:-------------:|:-------------:|:-----:|:-----:|
|cancelBubble|Bubble|读/写|默认为false，设为true可取消事件冒泡（类似DOM中的stopPropagation()方法）|
|returnValue|Value|读/写|默认为true，设为false可取消事件默认行为。（类似DOM2中的preventDefault()方法）|
|srcElement|Element|只读|事件的目标（与DOM2中target属性相同）|
|type|String|只读|被触发的事件类型。|

##### 跨浏览器的事件对象

创建getEvent()、getTarget()、preventDefault()和stopPropagation()方法，结合DOM0级方法，DOM2级方法和IE级方法来处理跨浏览器的事件处理程序。

```javascript
var EventUtil = {
    addHandler : function(element, type, handler) {
        //DOM2
        if (element.addEventListener) {
            element.addEventListener(type, handler, false); 
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);  
        } else {
            element["on" + type] = handler; 
        }
    },  
    getEvent : function(event) {
        return event ? event : window.event;    
    },
    getTarget : function(event) {
        return event.target || event.srcElement;
    },
    preventDefault : function(event) {
        if (event.preventDefault) {
            event.preventDefault(); 
        } else {
            event.returnValue = false;  
        }
    },
    removeHandler : function(element, type, handler) {
        //DOM2  
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);  
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);  
        } else {
            element["on" + type] = null;    
        }
    },
    stopPropagation : function(event) {
        if (event.stopPropagation) {
            event.stopPropagation();    
        } else {
            event.cancelBubble = true;  
        }
    }
};
```

### 事件类型

##### UI事件

UI事件指的是那些不一定与用户操作有关的事件。这些事件在DOM规范出现之前，都是以这种或那种形式存在的，而在DOM规范中保留是为了向后兼容。这些事件主要与元素焦点相关，仅在兼容DOM的浏览器中受到支持：

###### load事件

当页面完全加载后在window上面触发，当所有框架都加载完毕时在框架集上面触发，当图像加载完毕时在img元素上面触发，或者当嵌入的内容加载完毕时在object元素上面触发。一般有两种指定onload事件处理程序的方式。

第一种是JavaScript方式(推荐使用)：

```javascript
EventUtil.addHandler(window, "load", function(event){
    alert("load window success!");
});
```
第二种方式是在body元素添加一个onload特性(因为HTML中无法访问window元素)：

```javascript
<body onload="alert('load body success!')">
```
###### unload事件

当页面完全卸载后在window上面触发，当所有框架都卸载后在框架集上面触发，或者当嵌入的内容卸载完毕后在object元素上面触发。

```javascript
EventUtil.addHandler(window, "unload", function(event){
    alert("Unloaded");
});
```
###### resize事件

当窗口或框架的大小变化时在window或框架上面触发。

```javascript
EventUtil.addHandler(window, "resize", function(event){
    alert("resize window success!");
});
```
###### scroll事件

当用户滚动带滚动条的元素中的内容时，在该元素上面触发。body元素中包含所加载页面的滚动条。

```javascript
EventUtil.addHandler(window, "scroll", function(event){
    if (document.compatMode == "CSS1Compat") {
        alert(document.documentElement.scrollTop);  
    } else {
        alert(document.body.scrollTop); 
    }
});
for (var i = 0; i < 100; i++) {
    print("hello world");   
}
``` 
与resize事件类似，scroll事件也会在文档被滚动期间重复触发，所以有必要尽量保持事件处理程序的代码简单。

##### 焦点事件

焦点事件会在页面元素获得或失去焦点.有用的四个焦点事件:

* blur：在元素失去焦点时触发。这个事件不会冒泡。
* focus：在元素获得焦点时触发。这个事件不会冒泡。
* focusin：在元素获得焦点时触发，与focus等价，但是冒泡。
* focusout：在元素失去焦点时触发，与blur等价。

##### 鼠标事件

DOM3级事件定义了9个鼠标事件：

* click：单击鼠标或按下回车键
* dblclick：双击主鼠标(一般是左鼠标)
* mousedown：按下任意鼠标按钮
* mouseenter：在鼠标光标从元素外部首次移动到元素范围内时触发。这个事件不冒泡
* mouseleave：在位于元素上方的鼠标光标移动到元素范围之外时触发。这个事件不冒泡
* mousemove：当鼠标指针在元素内部移动时重复的触发。不能通过键盘触发这个事件
* mouseout：在鼠标指针位于一个元素上方，然后用户将其移入另一个元素时触发
* mouseover：在鼠标指针位于一个元素外部，然后用户将其首次移入另一个元素边界之内时触发
* mouseup：在用户释放鼠标按钮时触发。不能通过键盘触发这个事件

###### 客户区坐标位置/页面坐标位置/屏幕坐标位置

鼠标事件都是在浏览器视口中的特定位置上发生的，这个位置信息保存在事件对象的clientX和clientY属性中，它们的值表示事件发生时鼠标指针在视口中的水平和垂直坐标。

```javascript
<div id="myDiv" style="background-color:red;height:100px;width:100px">Click me</div>
<script type="text/javascript">
    var div = document.getElementById("myDiv");
    EventUtil.addHandler(div, "click", function(event){
        event = EventUtil.getEvent(event);
        alert("X:" + event.clientX + ",Y:" + event.clientY);    
    });
</script>
```
当我们单击div内部时，会弹出坐标值，而对于页面来说（存在滚轮的情况下），应该使用pageX和pageY。而对于整个屏幕而言，应该使用screenX和screenY：

```javascript
<div id="myDiv" style="background-color:red;height:1000px;width:1000px">Click me</div>
<script type="text/javascript">
    var div = document.getElementById("myDiv");
    EventUtil.addHandler(div, "click", function(event){
        event = EventUtil.getEvent(event);
        alert("X:" + event.clientX + ",Y:" + event.clientY);
        alert("PageX:" + event.pageX + ",PageY:" + event.pageY);
        alert("ScreenX:" + event.screenX + ",ScreenY:" + event.screenY);    
    });
</script>
```
###### 修改键

我们可以通过shiftKey，ctrlKey，altKey和metaKey来判断Shift，Ctrl，Alt和Meta键是否被按下：

```javascript
<div id="myDiv" style="background-color:red;height:1000px;width:1000px">Click me</div>
<script type="text/javascript">
    var div = document.getElementById("myDiv");
    EventUtil.addHandler(div, "click", function(event){
        event = EventUtil.getEvent(event);
        var keys = new Array();
        if (event.shiftKey) {
            keys.push("shift");
        }
        if (event.ctrlKey) {
            keys.push("ctrl");  
        }
        if (event.altKey) {
            keys.push("alt");   
        }
        if (event.metaKey) {
            keys.push("meta");  
        } 
        alert("Keys:" + keys.join(","));
    });
</script>
```

###### 相关元素

对于mouseover和mouseout事件而言，会涉及更多的元素。对mouseover事件而言，事件的主目标是获得光标的元素，而相关元素就是那个失去光标的元素。类似的，对于mouseout事件而言，事件的主目标是失去光标的元素，而相关元素则是获得光标的元素。

如下面的例子：在页面上会显示一个div元素。如果鼠标指针一开始位于这个div元素上，然后移出了这个元素，那么就会在div元素上触发mouseout事件，相关元素就是body元素，与此同时，body元素上面会触发mouseover事件，而相关元素变成了div。

我们可以通过属性relatedTarget来获取元素的信息：

```javascript
<div id="myDiv" style="background-color:red;height:100px;width:100px">Click me</div>
<script type="text/javascript">
    var div = document.getElementById("myDiv");
    EventUtil.addHandler(div, "mouseout", function(event){
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        var relatedTarget = EventUtil.getRelatedTarget(event);
        alert("moused out of " + target.tagName + " to " + relatedTarget.tagName);
    });
</script>
```

##### 键盘与文本事件

有三个键盘事件:

* keydown：按下键盘上面的任意键时候触发，如果按住不放会重复触发。
* keypress：按下键盘上的字符键时触发，如果按下不放会重复触发。
* keyup：释放键盘上的键时触发。

一个文本事件：textInput。在文本插入文本框之前会触发textInput事件。

* 键码：当发生keydown时，event对象的keyCode属性会包含一个代码，与特定的键对应。
* 字符编码：为charCode。

但是一般情况下，keyCode和charCode不可同时拥有值，所以会做出如下的判断：

```javascript
getCharCode: function(event){
    if (typeof event.charCode == "number"){
        return event.charCode;
    } else {
        return event.keyCode;
    }
}
```   
实例如下：

```javascript
<input id="myText" type="text" value="input" />
<script type="text/javascript">
function print(str) {
    document.write(str + "<br />");
}
var myText = document.getElementById("myText");
EventUtil.addHandler(myText, "keyup", function(event){
    event = EventUtil.getEvent(event);
    alert(event.keyCode);
});
</script>
```
每次输入字符，会弹出其ASCII码。而DOM3级事件引入了一个新事件：textInput。它和keypress的textInput事件的行为不同在于两点：

* 任何可以获得焦点的元素都可以触发keypress事件，但只有可编辑区域才能触发textInput事件。
* textInput事件只会在用户按下能够输入实际字符的键时才会被触发，而keypress事件则在按下那些能够影响文本显示的键时也会触发（例如退格键）。

```javascript
var myText = document.getElementById("myText");
    EventUtil.addHandler(myText, "textInput", function(event){
        event = EventUtil.getEvent(event);
        alert(event.data);
    });
```
textInput事件：当用户在可编辑区域中输入字符时，会触发textInput事件。只有编辑区域才能触发textInput事件。事件只会在用户按下能够输入实际字符的键时才会被触发。事件event对象中包含一个data属性，保存用户输入的字符。

##### 合成事件（用IME输入）

##### 变动事件（DOM结构更新）

变动事件是为XML或HTML DOM设计的：

* DOMSubtreeModified：在DOM结构中发生任何变化时触发。这个事件在其他任何事件触发后都会触发。
* DOMNodeInserted：在一个节点作为子节点被插入到另一个节点中触发。
* DOMNodeRemoved：在节点从其父节点中被移除时触发。
* DOMNodeInsertedIntoDocument：在一个节点被直接插入文档或通过子树间接插入文档之后触发.这个事件在DOMNodeInserted之后触发。
* DOMNodeRemovedFromDocument：在一个节点被直接从文档中移除或通过子树间接从文档中移除之前触发。这个事件在DOMNodeRemoved之后触发。
* DOMAttrModified：在特性被修改之后触发。
* DOMCharacterDataModified：在文本节点的值发生变化时触发。

###### 删除节点

在使用removeChild()或replaceChild()从DOM中删除节点时，首先会触发DOMNodeRemoved事件。这个事件的目标（event.target）是被删除的节点，而 event.relatedNode 属性中包含着对目标节点父节点的引用。在这个事件触发时，节点尚未从其父节点删除，因此其 parentNode 属性仍然指向父节点（与event.relatedNode相同）。这个事件会冒泡，因而可以在DOM的任何层次上面处理它。

以下为例:

```html
<ul id="myList">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>
```
JavaScript

```javascript
function print(str) {
    document.write(str + "<br />");
}
EventUtil.addHandler(window, "load", function(event){
    var list = document.getElementById("myList");
    
    EventUtil.addHandler(document, "DOMSubtreeModified", function(event){
        print("---DOMSubtreeModified");
        print(event.type);
        print(event.target);
    });
    
    EventUtil.addHandler(document, "DOMNodeRemoved", function(event){
        print("---DOMNodeRemoved");
        print(event.type);
        print(event.target);
        print(event.relatedNode);
    });
    
    EventUtil.addHandler(document, "DOMNodeRemovedFromDocument", function(event){
        print("---DOMNodeRemovedFromDocument");
        print(event.type);
        print(event.target);
    });
    
    list.parentNode.removeChild(list);
});
```
要移除ul元素,会依次触发以下事件：

* 在ul元素上触发DOMNodeRemoved事件。relatedNode属性等于document.body。
* 在ul元素上触发DOMNodeRemovedFromDocument事件。
* 在身为ul元素子节点的每个li元素及文本节点上触发DOMNodeRemovedFromDocument事件。
* 在document.body上触发DOMSubtreeModefied事件，因为ul元素是document.body的直接子元素。

###### 插入节点

在使用appendChild()、replaceChild()或insertBefore()向DOM中插入节点时，首先会触发DOMNodeInserted事件。这个事件的目标是被插入的节点，而 event.relatedNode属性中包含一个对父节点的引用。在这个事件触发时，节点已经被插入到了新的父节点中。这个事件是冒泡的，因此可以在DOM的各个层次上处理它。紧接着，会在新插入的节点上面触发DOMNodeInsertedIntoDocument事件。这个事件不冒泡，因此必须在插入节点之前为它添加这个事件处理程序。这个事件的目标是被插入的节点，除此之外event对象中不包含其他信息。最后一个触发的事件是DOMSubtreeModified，触发于新插入节点的父节点。

##### HTML5事件

###### contextmenu事件

Windows95在PC中引入了上下文菜单的概念，即通过单击鼠标右键可以调出上下文菜单。不久，
这个概念也被引入了Web领域。为了实现上下文菜单，开发人员面临的主要问题是如何确定应该显示上下文菜单（在Windows中，是右键单击；在Mac中，是Ctrl+单击），以及如何屏蔽与该操作关联默认上下文菜单。为解决这个问题，就出现了contextmenu这个事件，用以表示何时应该显示上下文菜单，以便开发人员取消默认的上下文菜单而提供自定义的菜单。

由于contextmenu事件是冒泡的，因此可以为document指定一个事件处理程序，用以处理页面
中发生的所有此类事件。这个事件的目标是发生用户操作的元素。在所有浏览器中都可以取消这个事件：在兼容DOM的浏览器中，使用event.preventDefalut()；在IE中，将event.returnValue的值设置为false。因为contextmenu事件属于鼠标事件，所以其事件对象中包含与光标位置有关的所有属性。通常使用contextmenu事件来显示自定义的上下文菜单，而使用onclick事件处理程序来隐藏该菜单。

###### beforeunload事件

之所以有发生在window对象上的beforeunload事件，是为了让开发人员有可能在页面卸载前
阻止这一操作。这个事件会在浏览器卸载页面之前触发，可以通过它来取消卸载并继续使用原有页面。但是，不能彻底取消这个事件，因为那就相当于让用户无法离开当前页面了。为此，这个事件的意图是将控制权交给用户。显示的消息会告知用户页面行将被卸载（正因为如此才会显示这个消息），询问用户是否真的要关闭页面，还是希望继续留下来。

###### DOMContentLoaded事件

如前所述，window的load事件会在页面中的一切都加载完毕时触发，但这个过程可能会因为要
加载的外部资源过多而颇费周折。而DOMContentLoaded事件则在形成完整的DOM树之后就会触发，不理会图像、JavaScript文件、CSS文件或其他资源是否已经下载完毕。与load事件不同，DOMContentLoaded支持在页面下载的早期添加事件处理程序，这也就意味着用户能够尽早地与页面进行交互。要处理DOMContentLoaded事件，可以为document或window添加相应的事件处理程序（尽管这个事件会冒泡到window，但它的目标实际上是document）。

###### readystatechange 事件

IE为DOM文档中的某些部分提供了readystatechange事件。这个事件的目的是提供与文档或
元素的加载状态有关的信息，但这个事件的行为有时候也很难预料。支持readystatechange事件的每个对象都有一个readyState属性，可能包含下列5个值中的一个。

* uninitialized（未初始化）：对象存在但尚未初始化。
* loading（正在加载）：对象正在加载数据。
* loaded（加载完毕）：对象加载数据完成。
* interactive（交互）：可以操作对象了，但还没有完全加载。
* complete（完成）：对象已经加载完毕。

###### pageshow和pagehide事件

Firefox和Opera有一个特性，名叫“往返缓存”（back-forward cache，或 bfcache），可以在用户使用浏览器的“后退”和“前进”按钮时加快页面的转换速度。这个缓存中不仅保存着页面数据，还保存了DOM和JavaScript的状态；实际上是将整个页面都保存在了内存里。如果页面位于bfcache中，那么再次打开该页面时就不会触发load事件。尽管由于内存中保存了整个页面的状态，不触发load事件也不应该会导致什么问题，但为了更形象地说明bfcache的行为，Firefox还是提供了一些新事件。第一个事件就是pageshow，这个事件在页面显示时触发，无论该页面是否来自bfcache。

在重新加载的页面中，pageshow会在load事件触发后触发；而对于bfcache中的页面，pageshow会在页面状态完全恢复的那一刻触发。另外要注意的是，虽然这个事件的目标是document，但必须将其事件处理程序添加到window。

###### hashchange事件

HTML5新增了hashchange事件，以便在URL的参数列表（及URL中“#”号后面的所有字符串）发生变化时通知开发人员。之所以新增这个事件，是因为在Ajax应用中，开发人员经常要利用URL参数列表来保存状态或导航信息。必须要把hashchange事件处理程序添加给window对象，然后URL参数列表只要变化就会调用它。此时的event对象应该额外包含两个属性oldURL和newURL。这两个属性分别保存着参数列表变化前后的完整URL。

##### 设备事件（特定设备，比如游戏机）

###### orientationchange事件

苹果公司为移动Safari中添加了orientationchange事件，以便开发人员能够确定用户何时将设备由横向查看模式切换为纵向查看模式。移动Safari的window.orientation属性中可能包含3个值：0表示肖像模式，90表示向左旋转的横向模式（“主屏幕”按钮在右侧），-90表示向右旋转的横向模式（“主屏幕”按钮在左侧）。相关文档中还提到一个值，即180表示iPhone头朝下；但这种模式至今尚未得到支持。

##### MozOrientation事件

Firefox3.6为检测设备的方向引入了一个名为MozOrientation的新事件。（前缀Moz表示这是特定于浏览器开发商的事件，不是标准事件。）当设备的加速计检测到设备方向改变时，就会触发这个事件。但这个事件与iOS中的orientationchange事件不同，该事件只能提供一个平面的方向变化。由于MozOrientation事件是在window对象上触发的，所以可以使用以下代码来处理。

```javascript
EventUtil.addHandler(window, "MozOrientation", function(event){
 //响应事件
});
```
此时的event对象包含三个属性：x、y 和 z。这几个属性的值都介于1到-1之间，表示不同坐标
轴上的方向。在静止状态下，x值为0，y值为0，z值为1（表示设备处于竖直状态）。如果设备向右倾斜，x值会减小；反之，向左倾斜，x值会增大。类似地，如果设备向远离用户的方向倾斜，y值会减小，向接近用户的方向倾斜，y值会增大。z轴检测垂直加速度度，1表示静止不动，在设备移动时值会减小。（失重状态下值为0。）

###### deviceorientation事件

本质上，DeviceOrientation Event规范定义的deviceorientation事件与MozOrientation事件类似。它也是在加速计检测到设备方向变化时在window对象上触发，而且具有与MozOrientation事件相同的支持限制。不过，deviceorientation事件的意图是告诉开发人员设备在空间中朝向哪儿，而不是如何移动。

设备在三维空间中是靠 x、y和z轴来定位的。当设备静止放在水平表面上时，这三个值都是0。x
轴方向是从左往右，y轴方向是从下往上，z轴方向是从后往前。

###### devicemotion事件

DeviceOrientation Event规范还定义了一个devicemotion事件。这个事件是要告诉开发人员设备什么时候移动，而不仅仅是设备方向如何改变。例如，通过devicemotion能够检测到设备是不是正在往下掉，或者是不是被走着的人拿在手里。触发devicemotion事件时，事件对象包含以下属性。

* acceleration：一个包含 x、y和z属性的对象，在不考虑重力的情况下，告诉你在每个方向
上的加速度。
* accelerationIncludingGravity：一个包含 x、y和z属性的对象，在考虑z轴自然重力加
速度的情况下，告诉你在每个方向上的加速度。
* interval：以毫秒表示的时间值，必须在另一个devicemotion事件触发前传入。这个值在每
个事件中应该是一个常量。

##### 触摸与手势事件

iOS版Safari为了向开发人员传达一些特殊信息，新增了一些专有事件。因为iOS设备既没有鼠标也没有键盘，所以在为移动Safari开发交互性网页时，常规的鼠标和键盘事件根本不够用。随着Androi中的WebKit的加入，很多这样的专有事件变成了事实标准，导致W3C开始制定Touch Events规范。

###### 触摸事件

包含iOS2.0软件的iPhone3G发布时，也包含了一个新版本的Safari浏览器。这款新的移动Safari
提供了一些与触摸（touch）操作相关的新事件。后来，Android上的浏览器也实现了相同的事件。触摸事件会在用户手指放在屏幕上面时、在屏幕上滑动时或从屏幕上移开时触发。具体来说，有以下几个触摸事件。

* touchstart：当手指触摸屏幕时触发；即使已经有一个手指放在了屏幕上也会触发。
* touchmove：当手指在屏幕上滑动时连续地触发。在这个事件发生期间，调用preventDefault()
可以阻止滚动。
* touchend：当手指从屏幕上移开时触发。
* touchcancel：当系统停止跟踪触摸时触发。关于此事件的确切触发时间，文档中没有明确说明。

上面这几个事件都会冒泡，也都可以取消。虽然这些触摸事件没有在DOM规范中定义，但它们却
是以兼容DOM的方式实现的。因此，每个触摸事件的event对象都提供了在鼠标事件中常见的属性：bubbles、cancelable、view、clientX、clientY、screenX、screenY、detail、altKey、shiftKey、ctrlKey和metaKey。除了常见的DOM属性外，触摸事件还包含下列三个用于跟踪触摸的属性。

* touches：表示当前跟踪的触摸操作的Touch对象的数组。
* targetTouchs：特定于事件目标的Touch对象的数组。
* changeTouches：表示自上次触摸以来发生了什么改变的Touch对象的数组。

每个Touch对象包含下列属性。

* clientX：触摸目标在视口中的x坐标。
* clientY：触摸目标在视口中的y坐标。
* identifier：标识触摸的唯一ID。
* pageX：触摸目标在页面中的x坐标。
* pageY：触摸目标在页面中的y坐标。
* screenX：触摸目标在屏幕中的x坐标。
* screenY：触摸目标在屏幕中的y坐标。
* target：触摸的DOM节点目标。

使用这些属性可以跟踪用户对屏幕的触摸操作。

###### 手势事件

iOS2.0中的Safari还引入了一组手势事件。当两个手指触摸屏幕时就会产生手势，手势通常会改变
显示项的大小，或者旋转显示项。有三个手势事件，分别介绍如下。

* gesturestart：当一个手指已经按在屏幕上而另一个手指又触摸屏幕时触发。
* gesturechange：当触摸屏幕的任何一个手指的位置发生变化时触发。
* gestureend：当任何一个手指从屏幕上面移开时触发。

只有两个手指都触摸到事件的接收容器时才会触发这些事件。在一个元素上设置事件处理程序，意
味着两个手指必须同时位于该元素的范围之内，才能触发手势事件（这个元素就是目标）。由于这些事件冒泡，所以将事件处理程序放在文档上也可以处理所有手势事件。此时，事件的目标就是两个手指都位于其范围内的那个元素。

触摸事件和手势事件之间存在某种关系。当一个手指放在屏幕上时，会触发touchstart事件。如果另一个手指又放在了屏幕上，则会先触发gesturestart事件，随后触发基于该手指的touchstart事件。如果一个或两个手指在屏幕上滑动，将会触发gesturechange事件。但只要有一个手指移开，就会触发gestureend事件，紧接着又会触发基于该手指的touchend事件。

与触摸事件一样，每个手势事件的event对象都包含着标准的鼠标事件属性：bubbles、cancelable、view、clientX、clientY、screenX、screenY、detail、altKey、shiftKey、ctrlKey和metaKey。此外，还包含两个额外的属性：rotation和scale。其中，rotation 属性表示手指变化引起的旋转角度，负值表示逆时针旋转，正值表示顺时针旋转（该值从0开始）。而scale属性表示两个手指间距离的变化情况（例如向内收缩会缩短距离）；这个值从1开始，并随距离拉大而增长，随距离缩短而减小。

### 内存和性能

在JavaScript中，添加到页面上的事件处理程序数量将直接关系到页面的整体运行性能。导致这一问题的原因是多方面的。首先，每个函数都是对象，都会占用内存；内存中的对象越多，性能就越差。其次，必须事先指定所有事件处理程序而导致的DOM访问次数，会延迟整个页面的交互就绪时间。事实上，从如何利用好事件处理程序的角度出发，还是有一些方法能够提升性能的。

##### 事件委托

对“事件处理程序过多”问题的解决方案就是事件委托。事件委托利用了事件冒泡，只指定一个事
件处理程序，就可以管理某一类型的所有事件。例如，click事件会一直冒泡到document层次。也就是说，我们可以为整个页面指定一个onclick事件处理程序，而不必给每个可单击的元素分别添加事件处理程序。以下面的HTML代码为例。

```javascript
<ul id="myLinks">
    <li id="goSomewhere">Go somewhere</li>
    <li id="doSomething">Do something</li>
    <li id="sayHi">Say hi</li>
</ul> 
```
其中包含3个被单击后会执行操作的列表项。按照传统的做法，需要像下面这样为它们添加3个事件处理程序。

```javascript
var item1 = document.getElementById("goSomewhere");
var item2 = document.getElementById("doSomething");
var item3 = document.getElementById("sayHi");
EventUtil.addHandler(item1, "click", function(event){
    location.href = "http://www.wrox.com";
});
EventUtil.addHandler(item2, "click", function(event){
    document.title = "I changed the document's title";
});
EventUtil.addHandler(item3, "click", function(event){
    alert("hi");
}); 
```
此时，可以利用事件委托技术解决这个问题。使用事件委托，只需在DOM树中尽量最高的层次上添加一个事件处理程序，如下面的例子所示。

```javascript
var list = document.getElementById("myLinks");
EventUtil.addHandler(list, "click", function(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    switch(target.id){
        case "doSomething":
            document.title = "I changed the document's title";
        break;
        case "goSomewhere":
            location.href = "http://www.wrox.com";
        break;
        case "sayHi":
            alert("hi");
        break;
    }
}); 
```
如果可行的话，也可以考虑为document对象添加一个事件处理程序，用以处理页面上发生的某种
特定类型的事件。这样做与采取传统的做法相比具有如下优点。

* document对象很快就可以访问，而且可以在页面生命周期的任何时点上为它添加事件处理程序
（无需等待DOMContentLoaded或load事件）。换句话说，只要可单击的元素呈现在页面上，就可以立即具备适当的功能。
* 在页面中设置事件处理程序所需的时间更少。只添加一个事件处理程序所需的DOM引用更少，所花的时间也更少。
* 整个页面占用的内存空间更少，能够提升整体性能。

最适合采用事件委托技术的事件包括click、mousedown、mouseup、keydown、keyup和keypress。虽然mouseover和mouseout事件也冒泡，但要适当处理它们并不容易，而且经常需要计算元素的位置。（因为当鼠标从一个元素移到其子节点时，或者当鼠标移出该元素时，都会触发mouseout事件。）

### 模拟事件

事件，就是网页中某个特别值得关注的瞬间。事件经常由用户操作或通过其他浏览器功能来触发。但很少有人知道，也可以使用JavaScript在任意时刻来触发特定的事件，而此时的事件就如同浏览器创建的事件一样。也就是说，这些事件该冒泡还会冒泡，而且照样能够导致浏览器执行已经指定的处理它们的事件处理程序。

在测试Web应用程序，模拟触发事件是一种极其有用的技术。DOM2级规范为此规定了模拟特定事件的方式，IE9、Opera、Firefox、Chrome和Safari都支持这种方式。IE有它自己模拟事件的方式。

##### DOM中的事件模拟

可以在document对象上使用createEvent()方法创建event对象。这个方法接收一个参数，即
表示要创建的事件类型的字符串。在DOM2级中，所有这些字符串都使用英文复数形式，而在DOM3级中都变成了单数。这个字符串可以是下列几字符串之一。

* UIEvents：一般化的UI事件。鼠标事件和键盘事件都继承自UI事件。DOM3级中是UIEvent。
* MouseEvents：一般化的鼠标事件。DOM3级中是MouseEvent。
* MutationEvents：一般化的DOM变动事件。DOM3级中是MutationEvent。
* HTMLEvents：一般化的HTML事件。没有对应的DOM3级事件（HTML事件被分散到其他类
别中）。

###### 模拟鼠标事件

创建新的鼠标事件对象并为其指定必要的信息，就可以模拟鼠标事件。创建鼠标事件对象的方法是
为createEvent()传入字符串"MouseEvents"。返回的对象有一个名为initMouseEvent()方法，用于指定与该鼠标事件有关的信息。这个方法接收15个参数，分别与鼠标事件中每个典型的属性一一对应；这些参数的含义如下。

* type（字符串）：表示要触发的事件类型，例如"click"。
* bubbles（布尔值）：表示事件是否应该冒泡。为精确地模拟鼠标事件，应该把这个参数设置为true。
* cancelable（布尔值）：表示事件是否可以取消。为精确地模拟鼠标事件，应该把这个参数设
置为true。
* view（AbstractView）：与事件关联的视图。这个参数几乎总是要设置为document.defaultView。
* detail（整数）：与事件有关的详细信息。这个值一般只有事件处理程序使用，但通常都设置为0。
* screenX（整数）：事件相对于屏幕的X坐标。
* screenY（整数）：事件相对于屏幕的Y坐标。
* clientX（整数）：事件相对于视口的X坐标。
* clientY（整数）：事件想对于视口的Y坐标。
* ctrlKey（布尔值）：表示是否按下了Ctrl键。默认值为false。
* altKey（布尔值）：表示是否按下了Alt键。默认值为false。
* shiftKey（布尔值）：表示是否按下了Shift键。默认值为false。
* metaKey（布尔值）：表示是否按下了Meta键。默认值为false。
* button（整数）：表示按下了哪一个鼠标键。默认值为0。
* relatedTarget（对象）：表示与事件相关的对象。这个参数只在模拟mouseover或mouseout
时使用。

###### 模拟键盘事件

“DOM2级事件”中没有就键盘事件作出规定，因此模拟键盘事件并没有现成的思路可循。“DOM2级事件”的草案中本来包含了键盘事件，但在定稿之前又被删除了；Firefox根据其草案实现了键盘事件。需要提请大家注意的是，“DOM3级事件”中的键盘事件与曾包含在“DOM2级事件”草案中的键盘事件有很大区别。

DOM3级规定，调用createEvent()并传入"KeyboardEvent"就可以创建一个键盘事件。返回的事件对象会包含一个initKeyEvent()方法，这个方法接收下列参数。

* type（字符串）：表示要触发的事件类型，如"keydown"。
* bubbles（布尔值）：表示事件是否应该冒泡。为精确模拟鼠标事件，应该设置为true。
* cancelable（布尔值）：表示事件是否可以取消。为精确模拟鼠标事件，应该设置为 true。
* view（AbstractView）：与事件关联的视图。这个参数几乎总是要设置为 document.
defaultView。
* key（布尔值）：表示按下的键的键码。
* location（整数）：表示按下了哪里的键。0表示默认的主键盘，1表示左，2表示右，3表示
数字键盘，4表示移动设备（即虚拟键盘），5表示手柄。
* modifiers（字符串）：空格分隔的修改键列表，如"Shift"。
* repeat（整数）：在一行中按了这个键多少次。

###### 模拟其他事件

虽然鼠标事件和键盘事件是在浏览器中最经常模拟的事件，但有时候同样需要模拟变动事件和
HTML事件。要模拟变动事件，可以使用createEvent("MutationEvents")创建一个包含
initMutationEvent()方法的变动事件对象。这个方法接受的参数包括：type、bubbles、
cancelable、relatedNode、preValue、newValue、attrName和attrChange。下面来看一个模拟变动事件的例子。

```javascript
var event = document.createEvent("MutationEvents");
event.initMutationEvent("DOMNodeInserted", true, false, someNode, "","","",0);
target.dispatchEvent(event);
```
以上代码模拟了DOMNodeInserted事件。其他变动事件也都可以照这个样子来模拟，只要改一改
参数就可以了。

##### IE中的事件模拟

在IE8及之前版本中模拟事件与在DOM中模拟事件的思路相似：

先创建event对象，然后为其指定相应的信息，然后再使用该对象来触发事件。当然，IE在实现每个步骤时都采用了不一样的方式。调用document.createEventObject()方法可以在IE中创建event对象。但与DOM方式不同的是，这个方法不接受参数，结果会返回一个通用的event对象。然后，你必须手工为这个对象添加所有必要的信息（没有方法来辅助完成这一步骤）。

最后一步就是在目标上调用fireEvent()方法，这个方法接受两个参数：事件处理程序的名称和event对象。在调用fireEvent()方法时，会自动event对象添加srcElement和type属性；其他属性则都是必须通过手工添加的。换句话说，模拟任何IE支持的事件都采用相同的模式。
