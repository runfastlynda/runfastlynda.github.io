---
layout: post
title:  "jQuery基础教程-学习笔记（4）"
date:   2015-09-24 18:28:16
categories:
---

### DOM操作

+ attr():访问和改变属性值，用法和css()相同。

+ removeAttr():删除属性。

+ each():参数为匿名函数，该函数传递一个index参数，默认会自增，用这个函数操作前面每个选择的元素。

+ text():获取前面选择的标签包含的值。加参数则为修改该值，但不会立即在页面呈现。

+ html():同text，无参返回html形式的文本，加参数修改文本，以html方式。

+ end():结束当前查询，返回到最初。

+ $():在括号中放入一组html元素后，通过insertAfter等方法就能改变整个DOM结构。

+ 插入到其他元素前面：insertBefore()、before()，区别在于连缀方式。

+ 插入到其他元素后面：insertAfter()、after()，区别在于连缀方式。

+ 在其他元素中插入元素：prependTo()、prepend()，区别在于连缀方式。

+ appendTo():参数为已定义的容器，将前面选择的对象添加到该容器中，

+ append():在当前添加元素。

+ wrap():在前面选择的元素外面添加参数中的标签。

+ remove():移除每个匹配的元素及其后代元素。但不实际移除。

+ empty():移除每个匹配的元素

###第五单元练习

(1)修改添加back top链接的代码，以便这些链接只从第四段后面才开始出现。

```javascript
$(document).ready(function(){
  var $p = $('div.chapter p').eq(2).nextAll();
  $('<a href="#top">back to top</a>').insertAfter($p);
  $('<a id="top"></a>').prependTo('body');
});
```

(2)在单击back to top链接时，为每个链接后面添加一个新段落，其中包含You were here字样。确保链接仍然有效。

```javascript
$(document).ready(function(){
  $('<a href="#top">back to top</a>').insertAfter('div.chapter p');
  $('a[href$="#top"]').on('click', function(){
    $('<p>You were here</p>').insertAfter(this);
  });
});
```
(3)在单击作者名字时，把文本改为粗体(通过添加一个标签，而不是操作类或css属性)。

```javascript
$(document).ready(function(){
  $('#f-author').on('click', function(){
    $(this).html('<b>by Edwin A. Abbott</b>');
  });
});
```
(4)挑战:在随后单击粗体作者名字时，删除之前添加的元素(也就是在粗体文本与正常文本之间切换)。

```javascript
$(document).ready(function(){
  var simple = 'by Edwin A. Abbott';
  var b_simple = '<b>by Edwin A. Abbott</b>';
  $('#f-author').on('click', function(){
    if($(this).html() == simple){
      $(this).html(b_simple);
    }else if($(this).html() == b_simple){
      $(this).html(simple);
    };
  });
});
```
(5)挑战：为正文中的每一个段落添加一个inhabitants类，但不能调用.addClass()方法。确保不影响现有的类。

```javascript
$(document).ready(function(){
  $('p').each(function(){
    var a = $(this).attr('class');
    if(a == null){
      $(this).attr('class','inhabitants');
    }else{
      $(this).attr('class',a + ' inhabitants');
    };
  });
});
```