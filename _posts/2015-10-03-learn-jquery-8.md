---
layout: post
title:  "jQuery基础教程-学习笔记（8）"
date:   2015-10-03 18:28:16
categories:
---
### 高级DOM操作

+ 服务器排序的页面每次排序时都得刷新页面，使用jQuery提供的Ajax方法可以帮我们避免页面刷新。把表头中的链接通过jQuery转换为Ajax请求:

```javascript
$(document).ready(function() {
  $('#my-data th a').click(function(event) {
    event.preventDefault();
    $('#my-data tbody').load($(this).attr('href'));
  });
});
```

+ 三种jQuery排序机制包括:

根据从HTML内容中提取的内容排序; 
根据HTML5自定义数据属性排序;
根据表格数据的JSON表示排序。

+ 为已有的文本添加链接

.wrapInner()方法,这个方法会把一个新元素(在这里就是a元素)放到匹配元素的内部, 同时包含匹配元素的子元素。

```javascript
$(document).ready(function() {
  var $table1 = $('#t-1');
  var $headers = $table1.find('thead th').slice(1);
  $headers
    .wrapInner('<a href="#"></a>')
    .addClass('sort');
});
```
使用.slice()方法跳过每个表格的第一个th元素,同时也没有必要为封面图片加标签或排序。给其他表头(th)元素添加了sort类,区分不可以用来排序的表头。

+ 简单的JavaScript数组排序：

利用JavaScript内置的.sort()方法，这个方法在默认情况下是按照字母表顺序排序的。实际上,对于数值数组还是
按照数值大小排序才有意义。为此,可以给.sort()方法传入一个比较函数:

```JavaScript
arr.sort(function(a,b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  ￼￼￼return 0;
});
```

+ 对DOM元素排序:

```JavaScript
$headers.on('click', function(event) {
  event.preventDefault();
  var column = $(this).index();
  var rows = $table1.find('tbody > tr').get();
  rows.sort(function(a, b) {
    var keyA = $(a).children('td').eq(column).text();
    keyA = $.trim(keyA).toUpperCase();
    var keyB = $(b).children('td').eq(column).text();
    keyB = $.trim(keyB).toUpperCase();
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });
  $.each(rows, function(index, row) {
    $table1.children('tbody').append(row);
  });
});
```

在找到被单击的表头单元格的索引之后,取得了包含所有数据行的数组。使用.get()方法将jQuery对象转换为DOM节点数组。在取得DOM节点数组之后,就可以对它们排序了。

+ 在 DOM 元素中保存数据

使用jQuery的.data()方法(用于设置和取得与页面元素相关的任意信息)把计算结果保存起来，在比较函数中比较这些关键字就可以了,排序速度有明显提高。

+ 变换排序方向

与排序有关的最后一项增强,是实现既能够按升序(ascending)排序也能够按降序 (descending)排序。

```javascript
if (keyA < keyB) return -sortDirection;
if (keyA > keyB) return sortDirection;
return 0;
```

如果sortDirection等于1,那么排序结果同以前一样。如果它等于1,则排序方向会反转。

+ 使用 JSON 排序和构建行

编写两个函数:buildRow()和buildRows()。前者用于构建表格中的一行,后者使用$.map()循环遍历数据集中的所有行,在每一行数据上调用
buildRow()。

```javascript
function buildRow(row) {
  var authors = [];
  $.each(row.authors, function(index, auth) {
    authors[index] = auth.first_name + ' ' + auth.last_name;
  });
  ￼￼var html = '<tr>';
  html += '<td><img src="images/' + row.img + '"></td>';
  html += '<td>' + row.title + '</td>';
  html += '<td>' + authors.join(', ') + '</td>'; 4 html += '<td>' + row.published + '</td>';
  html += '<td>$' + row.price + '</td>';
￼  html += '</tr>';
  return html;
}
function buildRows(rows) {
  var allRows = $.map(rows, buildRow);
  return allRows.join('');
}
```

修改JSON对象,编写一个函数,在调用构建表格的函数之前,先修改、准备好用于排序和显示的数据,然后按需重新构建内容。

+ DOM创建挂钩

通过定义适当的挂钩,可以扩展很多取得和设置属性的jQuery方法,从而满足某些特殊情况下的需要。这些挂钩实际上是jQuery命名空间中的数组,比如$.cssHooks、$.attrHooks。一般来说,挂钩是保存着get和set方法的对象,前者用于取得请求的值,后者的作用则是提供新值。

+ 编写CSS挂钩

一个挂钩由针对元素的get方法和set方法构成。为了保持我们的例子尽量简单,这里只定义了set方法。
