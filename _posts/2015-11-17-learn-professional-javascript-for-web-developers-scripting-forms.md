---
layout: post
title: "JavaScript高级程序设计学习笔记：表单脚本"
categories:
- 博客
---

### 获取表单及表单元素引用的方式

取得form元素引用的方式主要有以下两种。

第一种通过getElementById：
```javascript
var form = document.getElementById("form");
```
第二种通过document.forms提取所有页面的表单，再通过数值索引或name值来取得特定的表单。
```javascript
var firstForm = document.forms[0];//取得页面中的第一个表单
var form = document.forms["form"];//取得页面中名称为"form2"的表单，如有同名的，则得到一组元素（例如radio button）
```
不过第二种方式不推荐使用。因为一是容易出错，二是将来的浏览器可能不会支持。

### 提交表单的方式

##### 按钮提交

用户单击提交按钮或图像按钮时，就会提交表单。使用input或button都可以定义提交按钮，只要将其type特性的值设置为submit即可，而图像按钮是通过将input的type特性值设置为image来定义。

```javascript
<input type="submit" value="Submit Form" />
<button type="submit">Submit Form</button>
<input type="image" src="xx.gif" />
```

以这种方式创建按钮，点击回车键时就会提交表单，在浏览器将请求发给服务器之前触发submit事件，我们就有机会验证表单数据，并以此决定是否提交表单，如果想取消表单提交，我们可以编写如下代码来取消表单的提交：

```javascript
EventUtil.addHandler(form, "submit", function(event){
  //取得事件对象
  event = EventUtil.getEvent(event);
  //阻止默认事件
  EventUtil.preventDefault(event);
});
```
##### 代码提交

也可以使用编程的方式调用submit()方法来提交表单。而且，这种方式无需表单包含提交按钮，任何时候都可以正常提交表单：

```
var form = document.getElementById("myForm");
//提交表单
form.submit();
```

需要注意：代码提交不会触发submit事件，因此必须在这之前验证表单数据。

### 表单字段

每个表单都有elements属性，该属性是表单中所有表单元素的集合。这个elements集合是一个有序列表，其中包含着表单中的所有字段，例如input，textarea，button和fieldset。每个表单字段在elements集合中的顺序，与它们出现在标记中的顺序相同，可以按照位置和name特性来访问它们。

##### 共有的表单字段属性

* disabled：布尔值，表示当前字段是否被禁用。
* form：指向当前字段所属表单的指针。
* name：当前字段的名称。
* readOnly：布尔值，表示当前字段是否可读。
* tabIndex：表示当前字段的切换(tab)序号。
* type：当前字段的类型，如checkbox。
* value：提交给服务器的值。

这里除了form属性之外，其他都可以通过JavaScript动态修改其他任何属性，例如：禁用提交按钮，防止用户重复提交：

```JavaScript
EventUtil.addHandler(form, "submit",function(event){
 event = EventUtil.getEvent(event);
 var target = EventUtil.getTarget(event);
 //取得提交按钮
 var btn = target.elements["submit-btn"];
 //禁用它
 btn.disabled = true;
});
```
但是这里我们不能通过onclick事件处理程序来实现这个功能，因为不同浏览器存在时差，有的浏览器会在触发表单的submit事件之前触发click事件，有些则相反。

##### 共有的表单字段方法   

而所有的表单字段都有两个方法：focus()和blur()，一个是聚焦，一个是移除焦点。其中，focus()方法用于将浏览器的焦点设置到表单字段，即激活表单字段，使其可以响应键盘事件。我们可以侦听load事件，在该事件发生时在表单的第一个字段上调用focus()方法，要注意的是，如果第一个表单字段是一个input元素，且其type特性的值为hidden，那么上述代码会导致错误。

HTML5为表单字段新增了一个autofocus属性。在支持这个属性的浏览器中，只要设置这个属性，不用JavaScript就能自动把焦点移动到相应字段：
```HTML
<input type="text" autofocus>
```
为了autofocus能够正常的运行，我们需要使用上面的方法，进行判断：
```JavaScript
EventUtil.addHandler(window, "load", function(event){
	var element = document.forms[0].elements[0];
	if (element.autofocus !== true) {
		element.focus();
	}
});
```
##### 共有的表单字段事件

表单支持以下三个事件：

* blur：当前字段失去焦点时触发。
* change：对于input和textarea元素，在它们失去焦点且value值改变时触发。对于select元素，在其选项改变时触发。
* focus：当前字段获得焦点时触发。

### 文本框/文本域（input/textarea）选中部分/全部内容


##### 选择文本

都支持select()方法，这个方法用于选择文本框中的所有文本，而我们可以在文本框获得焦点时选择其所有文本：

```javascript
//选择文本
textbox.select();
//在获取焦点时候选择文本
EventUtil.addHandler(textbox, "focus", function(event){
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	target.select();
});
```

##### 选择部分文本

主流浏览器的方式：
```javascript
var text = document.forms[0].elements['userName'];
text.select();//全选
text.setSelectionRange(0， 3);//选择前3个字符
```

IE浏览器设置/获取选中文本的方式与主流方式不同，设置选中的方式如下：
```javascript
var range = text.createTextRange();
range.collapse();//把范围折叠到开始位置
range.moveStart('character', 0);
range.moveEnd('character', 3);
range.select();
```
##### 取得选择的文本

通过select事件我们可以知道用户什么时候选择了文本，但仍然不知道用户选择了什么文本。HTML5添加了两个属性：selectionStart和selectionEnd，表示所选择文本的范围。但是对于IE8及更早的版本来说，需要通过document.selection来选择文本。

```javascript
function getSelectedText(textbox) {
  if (typeof textbox.selectionStart == "number") {
    return textbox.value.substring(textbox.selectionStart, textbox.selectionEnd);
  } else {
    return document.selection.createRange().text;
  }
}
```

### 过滤输入

##### 屏蔽字符

例如以下代码只允许用户输入数值：

```javascript
if (!/\d/.test(String.fromCharCode(charCode)) && charCode > 9 && !event.ctrlKey) {
  EventUtil.preventDefault(event);
}
//!/\d/.test(String.fromCharCode(charCode))--正常屏蔽非数值
//charCode > 9--屏蔽方向键
//!event.ctrlKey--屏蔽ctrl
```
##### 访问剪切板

对于访问剪切板，各浏览器的实现有差异，甚至有些浏览器不支持访问剪切板，所以不要试图修改不合适的剪切板内容以求验证通过，而应该阻止这些事件的默认行为，甚至在必要的时候可以禁用组合键可以通过取消paste/cut/copy事件的默认行为来禁用剪切板。

### 选择框脚本

选择框是通过select和option元素创建的，HTMLSelectElement类型提供了额外的属性和方法：

* add(newOption，relOption)：向控件中插入新option元素，其位置在相关项relOption之前。
* multiple：布尔值，表示是否允许多项选择，等价于HTML中的multiple特性。
* options：控件中所有option元素的HTMLCollection。
* remove(index)：移除给定位置的选项。
* selectedIndex：基于0的选中项的索引，如果没有选中项，则值为-1.对于多选的空间，只保存选中项中第一项的索引。
* size：选择框中可见的行数，等价于HTML中的size特性。

选择框的type属性不是select-one，就是select-multiple。而选择框中的value属性由当前选中项决定，相应规则是：

* 没有选择，则为空字符串。
* 选中，则为select或者option中value的值。
* 否则，为文本的值。

在DOM中，每个option元素都有一个HTMLOptionElement对象表示。为了便于访问数据，HTMLOptionElement对象添加了下列属性：

* index：当前选项在options集合中的索引。
* label：当前选项的标签，等价于HTML中的label特性。
* selected：布尔值，表示当前选项是否被选中。
* text：选项的文本。
* value：选项的值。

所以，我们不推荐使用DOM方法来访问这些信息：
```javascript
var selectbox = document.forms[0].elements["location"];
var text = selectbox.options[0].firstChild.nodeValue;
var value = selectbox.options[0].getAttribute("value");
```
而推荐使用以下方法：
```javascript
var selectbox = document.forms[0].elements["location"];
var text = selectbox.options[0].text;
var value = selectbox.options[0].value;
```
##### 添加选项
```javascript
//传统的DOM方法
var newOption = document.createElement("option");
newOption.appendChild(document.createTextNode("xx text"));
newOption.setAttribute("value", "xx value");
selectbox.appendChild(newOption);

//使用Option构造函数方法
newOption = new Option("xx text", "xx value");
selectbox.appendChild(newOption);

//使用选择框的add方法--设置最后一个参数为undefined为了兼容各个浏览器
newOption = new Option("xx text", "xx value");
selectbox.add(newOption, undefined);
```

##### 移除选项
```javascript
//DOM方法
selectbox.removeChild(selectbox.options[0]);	//移除第一个选项
//选择框remove方法
selectbox.remove(0);	//移除第一个选项
//浏览器遗留的方法，设置为null
selectbox.options[0] = null;
//移除所有选项
function clearSelectbox(selectbox) {
  for (var i = 0, length = selectbox.options.length; i < length; i++) {
    selectbox.remove(0);
  }
}
clearSelectbox(selectbox);
```

### 富文本编辑

富文本编辑WYSIWYG(What You See Is What You Get)：在页面中嵌入一个包含空HTML页面的iframe，通过设置designMode属性，这个空白的HTML页面可以被编辑，而编辑的对象则是该页面<body>元素的HTML代码。designMode属性有两个可能的值：off(默认值)和on，设置on时候可以进行编辑。

##### 实现富文本框的两种方式

* 插入iframe，设置src为空文档，并设置frames[iframeName].document.designMode = "on"；即可实现body可编辑。
* 设置任意元素的contentEditable属性，例如p.contentEditable = "true";可以实现任意元素可编辑。

注意：

上面给出的两种方式都是全浏览器兼容的，不必担心contentEditable是HTML5属性，因为IE在很多年前就实现了它。

contentEditable注意大写的E，小写无效。

富文本框并不是表单元素，所以不会自动提交，需要用隐藏表单字段来携带富文本内容。

虽然支持对富文本框内容的格式化（加粗、设置前/背景颜色等等），但各个浏览器的具体实现不同，因而相同的命令可能生成不同的文本内容。
