---
layout: post
title: "JavaScript高级程序设计学习笔记：JavaScript 与 XML"
categories:
- 博客
---

### 浏览器对 XML DOM 的支持

##### DOM2级核心

在DOM2级在document.implementation中引入了createDocument()方法（IE6~8不支持）。我们可以使用下面的代码在支持DOM2级的浏览器中创建一个空白XML。

```javascript
var xmldom = document.implemention.createDocument(namespaceUri,root,docype);
```
通过JavaScript处理XML时，通常只使用参数root，这个参数指定的是XML DOM文档元素的标签名。其他那两个参数不常用到。要创建一个新的文档元素为root的XML文档，可用如下代码：

```javascript
var xmldom = document.implementation.createDocument("","root",null);
alert(xmldom.documentElement.tagName);  //"root"
var child = xmldom.createElement("child");
xmldom.documentElement.appendChild(child);
```

如何检测浏览器是否支持DOM2级XML：

```javascript
var hasXmlDom = document.implementation.hasFeature("XML","2.0");
```

##### DOMParse类型

为了将XML解析为DOM文档，浏览器引入了DOMParse类型，解析XML之前，先创建一个DOMParse实例，再调用parseFromString()方法。这个方法接受两个参数：要解析的XML字符串和内容类型（内容类型始终为"text/xml"）。返回值是一个Document实例。

```javascript
var parser = new DOMParse();
var xmldom = parser.parseFromString("<root><child/></root>","text/xml");
alert(xmldom.documentElement.tagName);  //"root"
alert(xmldom.documentElement.firstChild.tagName);  //"child"
var anotherChild = xmldom.createElement("child");
xmldom.documentElement.appendChild(anthorChild);
var children = xmldom.getElementsByTagName("child");
alert(children.length);  //2
```
如果你的XML不是合格的样式，parseFromString()方法返回一个document的对象，但这个对象的文档元素是parsererror（Firefox、Opera），对象根元素第一个子元素为parsererro
r，parseerror元素的内容是对解析错误地描述。通过getElementsByTagName()查找parsererror确定是否有解析错误。

##### XMLSerializer类型

与前面相反，此类可将DOM文档序列化为XML字符串。要序列化DOM文档，首先必须创建XMLSerializer实例，然后将文档传入其serializerToString()方法：

```javascript
var serializer = new XMLSerializer();
var xml = serializer.serializeToString(xmldom);
alert(xml);
```

##### IE8及之前的版本中的XML

IE有6种不同的XML文档版本可供选择，只建议其中2种：

* MSXML2.DOMDocument.3.0：为了在JavaScript中使用，这是最低的建议版本。
* MSXML2.DOMDocument.6.0：通过脚本能够可靠地处理的最新版本。

要尝试创建每个版本的实例并观察是否有错误发生，可以确定哪个版本可用,例如：

```javascript
function createDocument(){
  if(typeof arguments.callee.activeXString ! = "string"){
    var versions = ["MSXML2.DOMDocument.6.0","MSXML2.DOMDocument.3.0","MSXML2.DOMDocument"];
    for(var i = 0, len = versions.length; i < len; i++){
      try{
        var xmldom = new ActiveXObject(versions[i]);
        arguments.callee.activeXString = versions[i];
        return xmldom;
      }catch(ex){
        //跳过
      }
    }
  }
  return new ActiveXObject(arguments.callee.activeXString);
}
```
要解析XML字符串，先创建XML DOM文档，然后调用其loadXML()方法。

```javascript
var xmldom = createDocument();
xmldom.loadXML("<root><child/></root>");
```
在新DOM文档中填充了XML内容后，就可以像操作其他DOM文档一样操作它了，如果解析过程中出错，可以在parseError属性对象中找到错误。包含多个保存错误信息的属性。

* errorCode：错误类型的数值编码；没有发生错误时值为0。
* filePos：文件中导致错误发生的位置。
* line：发生错误的行。
* linepos：发生错误的行中的字符。
* reason：对象错误地文本解析。
* srcText：导致错误的代码。
* url：导致错误的文件的URL。

###### 序列化XML

IE序列化XML的能力内置在了XML DOM文档中。每个XML DOM节点都有一个xml属性，其中保存着表示该节点的XML字符串。

```javascript
alert（xmldom.xml）
```
###### 加载XML文件

与DOM3级功能类似，要加载的XML文档必须与JS代码来自同一服务器。
加载文档的方式也可以分为同步和异步两种。要指定加载文档的方式，可以设置async属性，true表示异步（默认），false表示同步。

使用load(URI)方式加载。异步加载XML，需为XML DOM文档的onreadystatechange事件指定处理程序。有4个就绪状态（ready state）：

* 1：DOM正在加载数据。
* 2：DOM已经加载完数据。
* 3：DOM已经可以使用，但某些部分可能还无法访问。
* 4：DOM已经完全可以使用。

实际上，只需要关注状态4。通过XML文档的readyState属性可得其就绪状态。

##### 跨浏览器处理XML

```javascript
function parseXML(xml){
  var xmldom = null;
  if(typeof DOMParser != "undefined"){
    xmldom = (new DOMParser()).parseFromString(xml,"text/xml");
    var errors = xmldom.getElementsByTagName("parsererror");
    if(errors.length){
      throw new Error("XML parsing error:" + errors[0].textContent);
    }
  }else if(document.implementation.hasFeature("LS","3.0")){
    var implementation = document.implementation;
    var parser = implementation.createLSParser(implementation.MODE_SYNCHRONOUNS,null);
    var input = implementation.createLSInput();
    input.stringData = xml;
    xmldom = parser.parse(input);
  }else if(typeof ActiveXObject != "undefined"){
    xmldom = createDocument();
    xmldom.loadXML(xml);
    if(xmldom.parseError != 0){
      throw new Error("XML parsing error:" + xmldom.parseError.reason);
    }
  }else{
    throw new Error("No XML parser available.");
  }
  return xmldom;
}
```

用此函数解析XML字符串时，应该放在try-catch语句中

```javascript
var xmldom = null;
try{
  xmldom = parseXml("<root><child/><root>");
}
catch(ex){
  alert(ex.message);
}
```

序列化XML兼容代码

```javascript
function serializeXml(xmldom){
  if(typeof XMLSerializer != "undefined"){
    return(new XMLSerializer()).serializeToString(xmldom);
  }else if(document.implementation.hasFeature("LS","3.0")){
    var implementation = document.implementation;
    var serializer = implemetation.createLSSerializer();
    return serializer.writeToString(xmldom);
  }else if(typeof xmldom.xml != "undefined"){
    return xmldom.xml;
  }else{
    throw new Error("Could not serialize XMLDOM.");
  }
}
```

### 浏览器对XPath的支持

XPath是设计用来在DOM文档中查找节点的一种手段，因而对XML处理也很重要。

##### DOM3级Xpath

DOM3级支持XPath，用下面的代码检测浏览器是否支持：

```javascript
var supportsXPath = document.implementation.hasFeature("XPath","3.0");
```

DOM3级XPath中最重要的两个类型：XPathEvaluator和XPathResult。XPathEvalutor用于特定的上下文中队XPath表达式求值。这个类型有3个方法：

* createExpression(expression,nsresolver)：将XPath表达式及相应的命名空间信息转换成一个XPathExpression，这是查询的编译版。在多次使用一个查询时很有用。
* createNSResolver(node)：根据node的命名空间信息创建一个新的XPathNSResolver对象。在基于使用命名空间的XML文档求值时，需要使用XPathNSResolver对象。
* evaluate(expression,context,nsresolver,type,result)：在给定的上下文中，基于特定的命名空间信息来对XPath表达式求值。剩下的参数表示如何返回结果。

在支持DOM3级的浏览器中，Document类型通常都是与XPathEvaluator接口一起实现的。上面3个方法中，evalute最常用。接受5个参数：

* XPath表达式
* 上下文节点
* 命名空间解析器（只在XML代码中使用了XML命名空间时有必要指定，否则为null）
* 返回结果的类型
* 保存结果的XPathResult对象（通常是null，因为结果也会以函数值形式返回）

##### IE中的XPath

IE对XPath的支持是内置在XML DOM文档对象中的。含有两个方法。
* selectSingleNode()方法接受一个XPath模式，在找到匹配节点时返回第一个匹配的节点。

```javascript
var element = xmldom.documentElement.selectSingleNode("employee/name");
```
* selectNodes()，接受一个XPath模式作参数，返回与模式匹配的所有节点的NodeList（如果没有匹配的节点，则返回一个包含零项的NoedList）。

```javascript
var elements = xmldom.documentElement.selectNodes("employee/name");
Alert(elements.length);
```

IE对命名空间的也支持，首先必须知道自己使用的命名空间，并按格式创建一个字符串：

```javascript
"xmlns:prefix1 = 'uri1' xmlns:prefixf2 = 'uri2' xmlns:prefix3:'uri3' "
```

将上述格式字符串传入到XML DOM文档对象的特殊方法setProperty()中。setProperty()接受两个参数：要设置的属性名和属性值。这里属性名应为"SelectionNameSpaces"，属性值是前面格式的字符串。

```javascript
xmldom.setProperty("selectionNameSpaces","xmlns:wrox = http://www.wrox.com");
var result = xmldom.documentElement.selectNodes("wrox:book/wrox:author");
```

##### 跨浏览器使用XPath

```javascript
function selectSingleNode(context,expression,namespace){
  var doc = (context.nodeType != 9 ? context.ownerDocument : context);
  if(typeof doc.evaluate != "undefined"){
    var nsresolver = null;
    if(namespace instanceof Object){
      nsresolver = fucntion(prefix){
        return namespaces[prefix];
      };
    }
    var result = doc.evaluate(expression,context,nsresolver,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
    return(result !== null ? Result.singleNodeValue : null);
  }else if(typeof context.selectSingleNode != "undefined"){
    //创建命名空间字符串
    if(namespaces instanceof Object){
      var ns = "";
      for(var prefix in namespaces){
        if(namespaces.hasOwnproperty(prefix)){
          ns += "xmlns:" + prefix + "='" + namespaces[prefix] + "' ";
        }
      }
      doc.setProperty("SelectionNamespaces",ns);
    }
    return context.selectSingleNode(expression);
  }else{
    throw new Error("No Xpath engine found.");
  }
}
```

### 浏览器对XSLT的支持

XSLT是与XML相关的一种技术，它利用XPath将文档从一种表现形式转换成另一种表现形式。

##### IE中的XSLT转换

如果只是简单的XSLT转换：XSLT、XML分别加载到一个DOM文档中，再使用transformNode()方法。transformNode()方法：只有一个参数——包含XSLT样式表的文档。返回一个包含转换信息的字符串。可在xmldom各个节点机型转换。

```javascript
//加载xmldom各个节点进行转换
xmldom.load("employees.xml");
xsltdom.load("employees.xslt");
//转换
var result = xmldom.transformNode(xsltdom);
```

我们也可以使用复杂的XSLT转换：先将xml加载到“线程安全的XML DOM”中。然后把XSLT加载到“XSL模板”中使用“XSL处理器”进行转换。

* 自由线程DOM：MSXML2.FreeThreadedDOMDocument
* XSL模板：MSXML2.XSLTemplate
* XSL处理器：调用XSL模板的createProcessor()创建XSL处理器。

把XSLT样式表加载到一个线程安全的XML文档中。

```javascript
function createThreadSafeDocument(){
  if(typeof arguments.callee.activeXString != "string"){
    var versions = ["MSXML2.FreeThreadedDOMDocument.6.0","MSXML2.FreeThreadedDOMDocument.3.0","MSXML2.FreeThreadedDOMDocument\"];
    for(var i=0,len = version.length; i<len; i++){
      try{
        var xmldom = new ActiveXObject(versions[i]);
        arguments.callee.activeXString = versions[i];
        return xmldom;
      }catch(ex){
        // 跳过
      }
    }
  }
  return new ActiveXObject(arguments.callee.activeXString);
}
```
线程安全的XML DOM与常规XML DOM使用方式一致。

```javascript
var xsltdom = createThreadSafeDocument();
xsltdom.async = fasle;
xsltdom.load("employee.xslt");
```          
为自由线程DOM指定XSL模板

```javascript
fucntion createXSLTemplate(){
  if(typeof arugments.callee.activeXString != "string"){
    var versions = ["MSXML2.XSLTemplate.6.0","MSXML2.XSLTemplate.3.0","MSXML2.XSLTemplate"];
    for(var i=0,len=versions.length;i<len;i++){
      try{
        var template = new ActiveXObject(versions[i]);
        arguments.callee.activeXString = version[i];
        return template;
      }catch(ex){
        //跳过
      }
    }
  }
  return new ActiveXObject(arguments.callee.activeXString);
}
```
使用createXSLTemplate()函数创建用法：

```javascript
var template = createXSLTemplate();
template.stylesheet = xsltdom;
var processor = template.createProcessor();
processor.input = xmldom;
processor.transform();
var result = processor.output;
```
创建XSL处理器之后，须将要转换的节点指定给input属性。然后，调用transform()方法执行转换并将结果左字符串保存在output属性中。

使用XSL处理器可以对转换进行更多的控制，同时也支持更高级的XSLT特性。

* addParameter()：两个参数：要设置的参数名称（与在xsl:param的name特性中给指定的一样）和要指定的值（多数是字符串，也可以是数值或布尔值）。
* setStartMode()：接受一个参数，即要为处理器设置的模式。
* reset()：重置处理器，清除原先的输入和输出属性、启动模式及其它指定的参数。processor.reset();

##### XSLTProcessor类型（非IE浏览器支持）

基本原理：

* 加载两个DOM文档，一个基于XML，另一个基于XSLT。
* 创建一个新XSLTProcessor对象
* 使用importStylesheet()方法指定一个XSLT
* 最后使用transformToDocument()或transfromToFragment()方法可得一个文档片段对象。

```javascript
var processor = new XSLTProcessor();
processor.importStylesheet(xsltdom);
```
transformToDocument()：只要传入XML DOM，就可将结果作为一个完全不同的DOM文档使用。transformToFragement()：两个参数：要转换的XML DOM和应该拥有结果片段的文档

```javascript
var fragment = processor.transformToDocument(xmldom,document);
```
使用参数：

* setParameter()：3个参数：命名空间URI（一般为null）、参数内部名称和要设置的值
* getParameter()：取得当前参数的值，两个参数：命名空间和参数内部名。
* removeParameter()：移除当前参数的值，两个参数：命名空间和参数内部名。

重置处理器：reset()方法：从处理器中移除所有参数和样式表。

##### 跨浏览器使用XSLT

IE对XSLT转换支持与XSLTProcessor区别太大，跨浏览器兼容性最好的XSLT转换技术，只能是返回结果字符串。

```javascript
function transform(context,xslt){
  if(typeof XSLTProcess != "undefined"){
    var processor = new XSLTProcessor();
    processor.importStylesheet(xslt);
    var result = processor.transfromToDocument(context);
    return(new XMLSerialize()).serializeToString(result);
  }else if(typeof context.transforamNode != "undefined"){
    return context.transformNode(xslt);
  }else{
    throw new Error("No XSLT processor available.");
  }
}
```