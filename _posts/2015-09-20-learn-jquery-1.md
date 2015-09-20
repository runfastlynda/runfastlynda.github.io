---
layout: post
title: jQuery基础教程-学习笔记（1）
categories:
- 博客
---
### jQuery的安装和使用

jQuery不需要安装,要使用它只需该文件的一个副本,该副本可以放在外部站点上,也可以放在自己的服务器上。什么时候需要使用jQuery,只要在HTML文档中使用script元素把它导入进来即可。

[jQuery官方网站](http://jquery.com/)始终都包含该库最新的稳定版本,通过官网的首页就可以下载。
随着jQuery的日益流行,很多公司都通过自己的CDN(Content Delivery Networks,内容分发 网络)来托管其库文件,让开发人员能更方便地使用它。
最典型的就是[谷歌](https:// developers.google.com/speed/libraries/devguide)和[微软](http://www.asp.net/ajaxlibrary/cdn.ashx) 和[jQuery项目自己的服务器](http://code.jquery.com/),
jQuery库文件被放在了强劲、低延时的服务器上,这些服务器遍布全球各地,无论用户在哪个国家,都能以最快速度下载到jQuery。

使用jQuery只需要在script标签中引入jQuery文件，例如

```
<script src="jQuery.js"></script>
```

注意这行代码应该写在在引用样式表文件的代码之后,和引用自定义脚本文件的script标签之前。否则,在我们编写的代码中将引用不到jQuery框架。

### 使用Chrome开发者工具

打开Chrome开发者工具后,当前页面中会出现一个提供信息的新面板。
在面板中默认的Elements(元素)标签页中,左侧显示的是当前页面的结构,
右侧显示的是当前选中元素的详细信息(例如应用于它的CSS规则)。在研究网页结构,查找CSS问题的时候,这个标签页很有用,

Sources(资源)标签页显示的是页面中加载的所有脚本,右键单击行号可以设置普通断点、条件断点,还可以让代码执行到当前行。
断点是暂停执行脚本,然后一步一步观察执行情况的有效方法。在这个标签页的右侧,可以输入一些想要监控的变量和表达式,以便随时观察它们的值。

Console(控制台)标签页可以在里面输入JavaScript语句,按回车后,语句的执行结果就会显示在上方。还可以直接编写与控制台交互的代码,这就要用到console.log()方法，
console.log()方法是对JavaScript的alert()函数的绝好替代,在测试jQuery代码时也会非常有用。

### 选择元素

jQuery最强大的特性之一就是它能够简化在DOM中选择元素的任务。

为了创建jQuery对象,就要使用$()函数。这个函数接受CSS选择符作为参数,充当一个工厂,返回包含页面中对应元素的jQuery对象。
所有能在样式表中使用的选择符都可以传给这个函数

##### 基本选择符列表

| *CSS* | *jquery* | *说明* |
| :-------------: |:-------------:| :-----:|
| P {}  | $('p')  | 取得文档中所有的段落 |
| #some-id {} | $('#some-id') | 取得文档中ID为some-id的一个元素 |
| .some-class {} | $('.some-class') | 取得文档中类为some-class的所有元素 |



##### CSS 选择符

```
$('#selected-plays > li')
```
选取id为selected-plays的所有li子元素

```
$('#selected-plays li:not(.horizontal)').addClass('sub-level'):
```
选取id为selected-plays没有horizontal类的所有后代li元素

```
$('a[@title]')
```

选择所有带title属性的链接

```
$('div[ol]')
```
取得包含一个ol的所有div属性
>注意：方括号左边的才是选择的目标对象，方括号里的筛选的条件

```
$('a[href^=mailto:]').addClass('mailto');
```
选择href属性以mailto为开头的a

```
$('a[href$=.pdf]').addClass('pdflink');
```
选择href属性以.pdf为结尾的a


```
$('div.horizontal:eq(1)')
```
选取带有horizontal类的div集合中的第二个
>注意：Javascript数组是从0开始的

```
$('tr:odd').addClass('odd');
```
选取偶数行
>为什么针对偶数行使用:odd选择符呢?很简单,:eq()选择符、:odd和:even选
择符都使用JavaScript内置从0开始的编号方式,因此,第一行的编号为0(偶数),第二行的编号 为1(奇数),依此类推

```
$('tr:even').addClass('even');
```
选取奇数行
>注意：适用于页面只有单表格,多表格另有方法

```
$('td:contains("Henry")').addClass('highlight');
```
选取带有Henry字符串的所有td

```
$('th').parent().addClass('table-heading');
```
选取th的父母(tr):标题行

```
$('tr:not([th]):even').addClass('even');
```
选取不含有th的tr的奇数

```
$('tr:not([th]):odd').addClass('odd');
```
选取不含有th的tr的偶数
>注意这里$('tr:not([th]):even')和tr:even:not([th])不一样，有先后顺序

```
$('td:contains("Henry")').next().addClass('highlight');
```
选取带有Henry字符串的td的下一个td

```
$('td:contains("Henry")').siblings().addClass('highlight');
```
选取带有Henry字符串的所有td的其他同辈td

```
$('td:contains("Henry")').parent().find('td:eq(0)').addClass('highlight');
```
选取带有Henry的单元格,取得他得父元素,然后找到该元素的第一个单元格
