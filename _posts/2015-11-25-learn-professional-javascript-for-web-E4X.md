---
layout: post
title: "JavaScript高级程序设计学习笔记：E4X"
categories:
- 博客
---
E4X本身不是一门语言，它只是ECMAScript语言的可选扩展。就其本身而言，E4X为处理XML定义了新的语法，也定义了特定于XML的对象。

### E4X的类型

##### XML类型

XML类型可以用来表现XML结构中任何独立的部分。XML的实例可以表现元素、特性、注释、处理指令或文本节点。XML类型继承自object类型，因此它也继承了所有对象默认的所有属性和方法。创建XML对象的方法有如下几种：

* 调用构造函数：创建一个空的XML对象。

```javascript
var x = new XML();
```

* 也可以传入数据：

```javascript
var x = new XML("<employee position=\"Software Engineer\"><name>Nicholas "+"Zakas</name></employee>");
```

使用这些方法，我们可以使用XML字面量将XML数据直接指定给一个变量。

```javascript
var employee = <employee position="Software Engineer">
    <name>Nicholas C. Zakas</name>
</employee>;
```

##### XMLList

XMLList类型表现XML对象的有序集合。XMLList的DOM对等类型是NodeList，但与Node和NodeList之间的区别相比，XML和XMLList之间的区别是有意设计得比较小的。要显式的创建一个XMLList对象，像下面这样使用XMLList构造函数：

```javascript
var list = new XMLList("<item/><item/>");
```
还可以使用加号（+）操作符来组合两个或多个XML对象，从而创建XMLList对象。

```javascript
var list = <item/>+<item/>;
```

##### Namespace

E4X中使用Namespace对象来表现命名空间。通常用来映射命名空间前缀和命名空间URI的。通常这样创建Namespace对象：

```javascript
var ns = new Namespace();
```
而传入URI或前缀加URI，就可以初始化Namespace对象。

```javascript
var ns = new Namespace("http://www.wrox.com/");
var wrox = new Namespace("wrox", "http://www.wrox.com/");
```
可以使用prefix和uri属性来取得Namespace对象中的信息：

```javascript
alert(ns.uri); //"http://www.wrox.com/"
alert(ns.prefix); //undefined
alert(wrox.uri); //"http://www.wrox.com/"
alert(wrox.prefix); //"wrox"
```

##### QName

QName类型表现的是XML对象的限定名，即命名空间与内部名称的组合。向QName构造函数中传入名称或Namespace对象和名字，可以手动创建新的QName对象，如下所示：

```javascript
var wrox = new Namespace("wrox", "http://www.wrox.com/");
var wroxMessage = new QName(wrox, "message");
//表示"wrox:message"
```
创建了QName对象之后，可以访问它的两个属性：uri和localName。

```javascript
alert(wroxMessage.uri);   //"http://www.wrox.com/"
alert(wroxMessage.localName);   //"message"
```

### 一般用法

如果子元素只包含文本，则相应的属性只返回文本：

```javascript
var employee = <employee position="Software Engineer">
    <name>Nicholas C. Zakas</name>
</employee>;
alert(employee.name); //"Nicholas C. Zakas"
```
children()方法始终返回所以子元素。

```javascript
var allChildren = employees.children();
```
还有一个elements()的行为与child()类似，只是它返回表示元素的XML对象。

```javascript
var employeeList = employees.elements("employee"); //employees.employee 
var allChildren = employees.elements("*"); //employees.*相同
```
删除子元素

```javascript
delete employees.employee[0];
alert(employees.employee.length());     //1
```
##### 访问特性

访问特性也可以使用点语法，不过其语法稍有扩充。为了区分特性名与子元素的标签名，必须在名称前面加上一个@字符。

```javascript
var employees = <employees>
    <employee position="Software Engineer">
        <name>Nicholas C. Zakas</name>
    </employee>
    <employee position="Salesperson">
        <name>Jim Smith</name>
    </employee>
</employees>;
alert(employees.employee[0].@position); //"Software Engineer"
```

也可以child()方法来访问特性，只要传入带有@前缀的特性的名称即可。

```javascript
alert(employees.employee[0].child("@position")); //"Software Engineer"
```
还可以使用attribute()方法并传入特性名。

```javascript
alert(employees.employee[0].attribute("position")); //"Software Engineer"
```
##### 其他节点类型

使用下面这样设置XML构造函数的下列两个属性。

```javascript
XML.ignoreComments = false;
XML.ignoreProcessingInstructions = false;
```
设置了这两种属性之后，E4X就会将注释和处理指令解析到XML结构中。

使用nodeKind()方法可以得到XML对象表示的类型，该访问可能会返回“text”、“element”、“comment”、“processing-instruction”、“attribute”。

##### 查询

使用下面的代码可以访问所有的后代节点

```javascript
var allDescendants = employees..*; //<employees/>的所有后代节点
```
##### 构建和操作XML

将XML数据转换成XML对象的方式有很多种，XML字面量方式更方便一些，因为可以在字面量中嵌入javascript变量，语法是使用花括号({})。

```javascript
var tagName = "color"; 18 var color = "red";
var xml = <{tagName}>{color}</{tagName}>;
alert(xml.toXMLString());     //"<color>red</color>
```
XML字面量的标签名和文本值都是使用花括号语法插入的。有了这个语法，就可以省去在构建XML结构时拼接字符串的麻烦。

使用加号操作可以再添加一个employee元素。

```javascript
employees.employee += <employee position="Salesperson">
    <name>Jim Smith</name>
</employee>;
```
结果是：

```javascript
<employees>
    <employee position="Software Engineer">
        <name>Nicholas C. Zakas</name>
    </employee>
    <employee position="Salesperson">
        <name>Jim Smith</name>
    </employee>
</employees>
```
### 其他变化

为了与ECMAScript做到无缝集成，E4X也对语言基础进行了一些修改，其中之一就是引入了for-each-in循环，以便迭代遍历每一个属性并返回属性的值。

```javascript
var employees = <employees>
    <employee position="Software Engineer">
        <name>Nicholas C. Zakas</name>
    </employee>
    <employee position="Salesperson">
        <name>Jim Smith</name>
￼￼￼</employee>
</employees>;
for each (var child in employees){
    alert(child.toXMLString());
}
```
在这个例子中for-each-in循环，employee的每个子节点会依次被赋值child变量，其中包括注释、处理指令和/或文本节点。要想要返回特性节点，则需要对一个由特性节点组成的XMLList对象进行操作。

```javascript
or each (var attribute in employees.@*){ //alert(attribute);
}
```
对应数组，for-each-in循环会返回每一项。

E4X还有一个全局函数，叫做isXMLName()。这个函数接受一个字符串，并在这个字符串是元素或特性的有效内部名称的情况下返回true。


