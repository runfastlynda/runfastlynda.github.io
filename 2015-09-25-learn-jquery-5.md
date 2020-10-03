---
layout: post
title:  "jQuery基础教程-学习笔记（5）"
date:   2015-09-25 18:28:16
categories:
- jquery
---

### 通过AJAX发送数据

+ Ajax是一种无需刷新页面即可从服务器上加载数据的手段。

+ 渐进增强的原则，让页面没有javascript的情况下照样可以使用。

+ 对象字面量和数组字面量

+ $.getJSON()方法，解析JSON格式的文本字符串，并将其处理得到的javascript对象提供给调用代码。

+ getJSON()是作为全局jquery对象的方法定义的，也就是说，他不是个别jquery对象实例的方法。

+ 另一个全局函数$.each()函数依次遍历每个项，它以数组或映射作为第一个参数，以回调函数做第二个参数。

+ $.getScript()全局函数，接受一个URL参数查找脚本文件。以这种方法取得的脚本会在当前页面的全局环境下执行，这意味着脚本有权访问在全局环境下中定义的函数和变量，当然包括jquery自身。

+ $.get()方法，通常只是取得URL指定的文件，然后把纯文本格式的数据提供给回调函数，但当服务器提供的MIME类型知道响应的是XML格式，提供给回调函数的将是XML DOM树。

+ $.get()函数输入的第二个参数是一个用来构建查询字符串的键和值的映射

```javascript
$('#letter-e a').click(function(){
  var requestData = {term: $(this).text()};
  $.get('e.php',requestData,function(data){
  $('#dictionary').html(data);
  });
  return false;
});
```
在这个例子中，键始终是term，而值取自每个链接的文本。

+ $.post()函数和$.get()方法用法相似，最大的区别就是get请求把参数放在作为URL一部分的查询字符串中，而post不是。

+ .serizlize()方法作用于一个jquery对象，将匹配的dom元素转换成能够随Ajax请求传递的查询字符串。

+ .ajaxStart().ajaxStop()方法可以添加到任何jquery对象，当Ajax请求开始且尚未进行其他传输时，触发.ajaxStart()的回调函数，
相反，最后一次活动请求终止时，会执行通过.ajaxStop()的回调函数。

+ $.ajax()函数不针对任何特定的ajax通信类型，而是接受一个选项映射参数，并根据该参数来决定相应的行为。



###第六单元练习

(1)页面加载后，把exercises-content.html的主体(body)内容提取到页面的内容区域。

```javascript
$(document).ready(function(){  
  $('#dictionary').load('exercises-content.html .letter');   
});
```
(2)不要一次就显示整个文档，请为左侧的字母列表创建“提示条”，当用户鼠标放到字母上时，从exercises-content.html中加载与该字母有关的内容。

```javascript
$(document).ready(function(){  
  $('h3').mouseover(function(){  
    var letter_id = $(this).parent().attr('id');  
    $('#dictionary').load('exercises-content.html #' + letter_id);  
  });  
});  
```
(3)为页面加载添加错误处理功能，在页面的内容区显示错误消息。修改脚本，请求does-not-exist.html
而不是exercises-content.html，以测试错误处理功能。

```javascript
$(document).ready(function(){  
  $('h3').mouseover(function(){  
  var letter_id = $(this).parent().attr('id');  
  $('#dictionary').load('does-not-exist.html #' + letter_id, function(response, status, xhr){  
    if(status == 'error'){  
      var msg = 'Sorry but there was an error: ';  
      $('#dictionary').html(msg + xhr.status + ' ' + xhr.statusText );  
    };  
  });  
  });  
});
```
(4)挑战：页面加载后，向GitHub发送一个JSONP请求，取得某个用户代码库的列表。把每个代码库的名称和URL插入到页面的内容区。取得jQuery项目代码库的URL是http://api.github.com/users/jquery/repos。

```javascript
$(document).ready(function(){  
  $.getJSON('https：//api.github.com/users/jquery/repos', function(data){  
  var html = '';  
  $.each(data, function(jsonIndex, json_val){  
    html += '<ul style="list-style-type:none;">' + (jsonIndex + 1);  
    html += '<li>name: ' + json_val.name + '</li>';  
    html += '<li>html_url: ' + json_val.html_url + '</li>';  
    html += '</ul>';  
  });  
  $('#dictionary').html(html);  
  });  
});
```
