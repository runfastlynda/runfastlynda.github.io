---
layout: post
title: "JavaScript高级程序设计学习笔记：DOM"
categories: 
- javascript
---

### Node类型

DOM1级定义了一个Node接口，该接口将由DOM中的所有节点类型实现。javascript中的所有节点类型都继承自Node类型，因此所有节点类型都共享着相同的基本属性和方法。

每个节点都有一个nodeType属性，用于表明节点的类型：

* Node.ELEMENT_NODE(1);
* Node.ATTRIBUTE_NODE(2);
* Node.TEXT_NODE(3);
* Node.CDATA_SECTION_NODE(4);
* Node.ENTITY_REFERENCE_NODE(5);
* Node.ENTITY_NODE(6);
* Node.PROCESSING_INSTRUCTION_NODE(7);
* Node.COMMENT_NODE(8);
* Node.DOCUMENT_NODE(9);
* Node.DOCUMENT_TYPE_NODE(10);
* Node.DOCUMENT_FRAGMENT_NODE(11);
* Node.NOTATION_NODE(12);

nodeName保存元素的标签名，而nodeValue始终为null。由于这两个属性完全取决于节点的类型，所以使用之前最好进行一次比较。

##### 节点关系

每个节点都有一个childNodes属性，其中保存着一个NodeList对象。NodeList是一种类数组对象，用于保存一组有序的节点，可以通过位置来访问这些节点。NodeList对象的独特之处在于：它实时反映DOM结构的变化。

DOM将HTML和XML文档映射成一个由不同节点组成的树型机构，每种节点都对应于文档中的信息或标记，节点有自己的属性和方法，并和其他节点存在某种关系，节点之间的关系构成了节点层次，例如：

```html
<html>
  <head>
    <title>标题</title>
  </head>
  <body>
    <p>测试</p>
  </body>
</html>
```

文档节点Document是每个文档的根节点。

文档元素：文档节点只有一个子节点，即html元素，称之为文档元素。文档元素是文档的最外层元素，其他所有元素都包含在文档元素中，每个文档只能有一个文档元素。在HTML中，文档元素永远是html元素，但是在XML中，没有预定义元素，因此任何元素都可能成为文档元素。

文档中每一段标记都通过树中的一个节点来表示，比如HTML元素通过元素节点表示，特性（attribute）通过特性节点表示，文档类型通过文档类型节点表示，而注释则通过注释节点表示。

元素的childNodes属性来表示其所有子节点，它是一个NodeList对象，会随着DOM结构的变化动态变化。

* hasChildNodes()：是否有子节点。

```javascript
var headlines=document.getElementById("headline_block");
var childs=headlines.childNodes;
childs.length;
//1
childs[0];
//取第一个子节点
childs.item(0);
//取第一个子节点
```

而每个节点都有一个parentNode属性，该属性指向文档树中的父节点。我们可以通过列表中的每个节点的previousSibling和nextSibling属性，访问同一列表中的其他节点。列表中第一个节点的previousSibling属性值为null，而最后一个节点的nextSibling也为null：

* parentNode：指向其DOM树中的父节点；
* previousSibling：当前节点前面相邻的兄弟节点；
* nextSibling：当前节点后面相邻的兄弟节点。

```javascript
var li1=childs[0].childNodes[2];
li1.previousSibling;
li1.nextSibling;
```

##### 节点操作

关于节点类型nodeType，在DOM1中定义了12种常量，是作为Node类型构造函数的属性定义的（静态属性），这些节点类型都实现了Node接口，因此都可以访问Node类型的属性和方法（不支持子节点的节点类型上调用appendChild()、insertBefore()、replaceChild()、removeChild()等方法时会抛出异常）。

* appendChild()：向节点的childNodes末尾追加一个节点。如果传入的节点已经是其子节点，那么会将该节点移动到末尾。

```javascript
var headlines=document.getElementById("headline_block");
var ul=headlines.childNodes[0];
var firstnode=ul.firstChild
ul.appendChild(firstnode);
```

* insertBefore(newnode,somenode)：向指定位置来插入子节点。第一个参数是要插入的节点，第二个是作为参照的节点。

```javascript
var headlines=document.getElementById("headline_block");
var ul=headlines.childNodes[0];
var firstnode=ul.firstChild;
ul.insertBefore(firstnode,ul.childNodes[2]);
```

* replaceChild(newnode,oldnode)：替换节点。第一个参数是要插入的新节点，第二个参数是要被替换掉的节点。
* removeChild(somenode)：移除节点指定节点。

```javascript
var headlines=document.getElementById("headline_block");
var ul=headlines.childNodes[0];
ul.removeChild(ul.childNodes[0]);
```

### Document类型

javascript通过Document类型表示文档。在浏览器中，document对象是HTMLDocument(继承自Document类型)的一个实例，表示整个HTML页面。而且，document对象是window对象的一个属性，因此可以将其作为全局对象来访问(Document并不表示具体的节点，而是表示整个HTML页面)。Document节点具有下列特征：

* nodeType的值为9
* nodeName的值为#document
* nodeValue的值为null
* parentNode的值为null
* ownerDocument的值为null
* 其子节点可能是一个DocumentType(最多一个)，Element(最多一个)，ProcessingInstruction或Comment。

##### 查找元素

getElementById()：接收一个参数为要取得元素的ID。(但是如果多个元素的ID相同，则只返回第一次出现的元素，但是在DOM情况下，一般ID都是唯一的)

getElementsByTagName()：接收一个参数为要取得元素的标签名。而返回的是包含零个或多个元素的NodeList。

namedItem()：通过元素的name来取得集合中的项(多个name相同情况下，只会取第一个name的值)

getElementsByName()：根据元素的name来取得集合中的所有项。

##### 文档写入

* write：要写入的输出流的文本
* writeln：要写入的输出流的文本，但是字符串末尾会加换行符\n

##### 文档信息

document.title：获取或修改页面title，修改后会反映在浏览器标签页上，但是不会修改title元素。

```javascript
document.title;
document.title="xxx";
document.URL：显示页面完整的URL。
document.referrer：来源页面的完整地址。
document.domain：页面的域名，该属性是可以设置的。
```
但要注意几点：

* 不能将domain设置为当前所在域名中不包含的域；
* 不能将松散的域再设置为紧绷的域；
* 跨域通信：由于跨域安全限制，不用域的页面之间是无法进行javascript通信的。通过将两个页面的document.domain设置为相同值，就可以互相访问对方包含的javascript对象了。

##### 特殊集合

* document.anchors：带name特性的a签；
* document.links：带链接的a签；
* document.images：页面中所有img元素。

### Element类型

Element类型用于表现XML或HTML元素，提供了对元素标签名，子节点及特性的访问。Element节点具有以下特征：

* nodeType的值为1
* nodeName的值为元素的标签名
* nodeValue的值为null
* parentNode可能是Document或Element
* 其子节点可能是Element，Text，Comment，ProcessingInstruction，CDATASection或EntityReference。

要访问元素的标签名，可以使用nodeName属性，也可以使用tagName属性；这两个属性会返回相同的值。

##### 标签名

tagName返回的是标签名大写格式，比较时要先进行大小写转换。

```javascript
node.tagName.toLowerCase()=="a";
```

HTML元素基本特性className：与元素的class特性对应，用于指定元素的css样式。

##### 元素属性

getAttribute()：获取元素的某个特性。这里的特性名与元素实际的特性相同，所以想获得样式名就直接使用“class”而不是“clssName”。

setAttribute(attr,value)：设置元素特性。第一个参数是特性名称，第二个参数是特性的值。使用该方法设置的特性名称会自动转换为小写。

removeAttribute(attr)：彻底移除元素的某个属性。

##### 创建元素

通过document.createElement()方法来创建新元素。但是新元素的创建还需要appendChild()，insertBefore()或replaceChild()方法添加到文档树中：

```javascript
var div = document.createElement("div");
div.id = "myDiv2";
var body = document.body;
body.appendChild(div);
var myDiv2 = document.getElementById("myDiv2");
var textNode = document.createTextNode("haha");
myDiv2.appendChild(textNode);
```

### Text类型

文本节点由Text类型表示，包含纯文本内容。纯文本中可以包含转义后的HTML字符，但不能包含HTML代码。Text具有以下的特征：

* nodeType的值为3;
* nodeName的值为"#text";
* nodeValue的值为节点所包含的文本;
* parentNode是一个Element;
* 不支持(没有)子节点。

可以通过nodeValue属性或data属性访问Text节点中包含的文本，这两个属性中包含的值相同。以下方法可操作节点中的文本：

* appendData(text)：将text添加到节点的末尾。
* deleteData(offset,count)：从offset指定的位置开始删除count个字符。
* insertData(offset,text)：在offset指定的位置插入text。
* replaceData(offse, count,text)：用text替换从offset指定的位置开始到offset+count为止的文本。
* splitText(offset)：从offset指定的位置将当前文本节点分成两个文本节点。
* substringData(offset,count)：提取从offset指定的位置开始到offset+count为止处的字符串。

文本节点由Text类型表示，包含的是可以按字面解释的纯文本内容，可以包含转义后的HTML字符，但不能包含HTML代码，例如：获取节点文本内容：nodeValue或者data属性均可。

```javascript
var node=document.getElementById("xxx");
//获取文本节点
var textnode=node.childNodes[0];
//获取节点文本值
var data=textnode.data;
//追加文本
textnode.appendData("Text");
//删除文本片段
textnode.deleteData(8,10);
//插入文本
textnode.insertData(8,"x");
//替换文本
textnode.replaceData(5,25,',加油');
//获取文本片段
textnode.substringData(5,1);
//分割为多个节点
textnode.splitText(',');
//规范化
node.normalize();
```

##### 创建文本节点

可以使用document.createTextNode()创建新文本节点，接受一个要插入节点中的文本。但是我们要把新节点添加到文档树中已经存在的节点。

```javascript
var div = document.getElementById("myDiv1");
var textNode = document.createTextNode("Hello world!");
//两个节点连接起来
div.appendChild(textNode);    
//hello world1 Hello world!
```

##### Comment类型

注释在DOM中是通过Comment类型来表示的。Comment节点具有下列特征：

* nodeType的值为8;
* nodeName的值为"#comment";
* nodeValue的值为注释的内容。
* parentNode可能是document或Element;
* 不支持(没有)子节点。

Comment类型与Text类型继承自相同的基类，拥有除了splitText之外的所有操作方法。注释节点可以通过父节点来访问。

### DocumentFragment类型

在所有节点类型中，只有DocumentFragment是没有对应的标记的，DOM规定DocumentFragment是一种“轻量级”的文档，可以包含和控制节点，但不会像完整的文档那样占用额外的资源。DocumentFragment类型可以作为一个容器来使用，可以把后面要对文档进行的添加、修改、移除等操作先对DocumentFragment进行，然后再将DocumentFragment添加至文档中，从而避免DOM视图的多次渲染。

```javascript
(function(){
var ul=document.getElementById("myList");
var frag=document.createDocumentFragment();
var li=null,text=null;
for(var i=0;i<3;i++){
  li=document.createElement("li");
  text=document.createTextNode("item"+（i+1）);
    fragment.appendChild(li);
  }
  ul.appendChild(fragment);
})();
```
需要注意的是，在DocumentFragment中的节点不属于文档，如果将文本中的节点添加至DocumentFragment中，该节点将会从文档树中移除。

### DOM操作技术

##### 动态脚本

通过src包含外部脚本文件。加载完成后就可以在页面其他地方调用了。

```javascript
function LoadScriptSrc(src){
  var script=document.createElement("script");
  script.type="text/javascript";
  script.src=src;
  document.body.appendChild(script);
}
```
动态添加行内代码脚本。代码作用域为全局，而且执行完后立马可用。

```javascript
function LoadScript(){
var script=document.createElement("script");
script.type="text/javascript";
try{
  script.appendChild(document.createTextNode("function begin(){console.log('hello world.')}"));
}catch(ex){
  script.text="function begin(){console.log('hello world.')}";
}
document.body.appendChild(script);
}
```

##### 动态样式

注意样式要添加到head中。使用Link动态添加来自外部的样式文件，执行是异步的。

```javascript
function loadCss(url){
var link=document.createElement("link");
link.rel="stylesheet";
link.href=url;
var head=document.getElementsByTagName("head")[0];
head.appendChild(link);
}
```
使用style动态添加嵌入式CSS样式代码。向页面中添加样式后立即就能看到效果。

```javascript
function loadCss(css){
var style=document.createElement("style");
style.type="text/css";
try{
  style.appendChild(document.createTextNode(css));
}catch(ex){
  style.styleSheet.cssText=css;
}
var head=document.getElementsByTagName("head")[0];
head.appendChild(style);
}
loadCss("body{background-color:red}");
```
