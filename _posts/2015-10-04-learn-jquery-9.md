---
layout: post
title:  "jQuery基础教程-学习笔记（9）"
date:   2015-10-04 18:28:16
categories:
---
### 高级Ajax

+ 渐进增强就是先着手实现一个具有基本功能的产品,然后在些基础上为使用现代浏览器的用户添加一些装饰,以保证所有用户享受到基本甚至更好的体验。

+ .load()方法取得页面中相关的部分可以显示到页面的#response容器内，但是API站点有一个不同的主机名,浏览器的同源策略不允许这样传输数据。现在需要一个跨域数据传输方案。

```javascript
$(document).ready(function() {
  var $ajaxForm = $('#ajax-form'),
      $response = $('#response');
  $ajaxForm.on('submit', function(event) {
    event.preventDefault();
    $response.load('http://api.jquery.com/ #content',
      $ajaxForm.serialize());
  });
});
```

+ JSONP是简单的JSON加上了服务器支持,能够向不同的站点发送请求。在请求JSONP数据时,需要提供一个特殊的查询字符串参数,发送请求的脚本就是通过该参数来收获数据的。

```javascript
$(document).ready(function() {
  var $ajaxForm = $('#ajax-form'),
      $response = $('#response');
  $ajaxForm.on('submit', function(event) {
    event.preventDefault();
    $.ajax({
      url: 'http://book.learningjquery.com/api/',
      dataType: 'jsonp',
      data: {
        title: $('#title').val()
      },
      success: function(data) {
        console.log(data);
      }
    });
  });
});
```

+ 处理 Ajax 错误

在应用中引入任何形式的网络交互,都会同时带来某种不确定因素。用户的连接可能会在中途停止,偶尔的服务器问题可能会中断通信。$.ajax()函数可以接收一个名为error的回调函数,这个函数可以处理这些问题。在这个回调函数中,我们应该向用户提供某种形式的反馈,告知用户发生了错误。

```javascript
$(document).ready(function() {
  var $ajaxForm = $('#ajax-form'),
      $response = $('#response'),
      noresults = 'There were no search results.', failed = 'Sorry, but the request could not ' +
        'reach its destination. Try again later.';
  $ajaxForm.on('submit', function(event) {
    event.preventDefault();
    $.ajax({
      url: 'http://book.learningjquery.com/api/',
      dataType: 'jsonp',
      data: {
        title: $('#title').val()
      },
      success: response,
      error: function() {
        $response.html(failed);
      }
    });
  });
});
```
触发这个错误回调函数的情况有很多种。下面列出了其中的一些错误。

+ 服务器返回了错误状态码,例如403 Forbidden、404 Not Found或500 Internet Server Error。
+ 服务器返回了间接的状态码,例如301 Moved Permanently。状态码为304 Not Modified的 异常不会触发错误,因为浏览器可以正确地处理这种情况。
+ 服务器返回的数据不能按照指定方式正确解析(例如,在dataType指定为json时,返回 的不是有效的JSON数据)。
+ XMLHttpRequest对象调用了.abort()方法。

有些错误可以立即检测到,而有些情况则 会导致请求到最终错误响应之间产生很长的时间延迟。在没有既定的服务器端超时机制的情况下,我们可以在客户端强制设定请求的超时。通过给
timeout选项传递一个以毫秒表示的时间值,就相当于告诉$.ajax():如果响应在多长时间内没有返回,那么就调用它自己的.abort()方法。

```javascript
$.ajax({
  url: 'http://book.learningjquery.com/api/',
  dataType: 'jsonp',
  data: {
￼￼    title: $('#title').val()
  },
  timeout: 15000,
  success: response,
  error: function() {
    $response.html(failed);
  }
});
```

+ Ajax承诺

可以通过延迟对象来设置在某个操作完成后触发的回调函数。Ajax调用就是这样一种操作,而jqXHR对象提供了延迟对象所承诺的方法。

使用这些承诺对象的方法,可以重写$.ajax()调用,把success和error回调函数替换成调用.done()和.fail()这两个承诺方法,这样做的好处：第一,可以多次调用这两个方法,根据需要添加多个处理程序。第二,如果把调用$.ajax()的结果保存在一个变量中,那么就可以考虑代码的可读性,在后面再添加处理程序。第三,如果在添加处理程序的时候Ajax操作已经完成,就会立即调用该处理程序。第四, 我们最好采用与jQuery库中其他代码一致的语法,这带来的好处不言而喻。

使用承诺方法还可以在请求期间添加一个加载指示器,然后在请求完成时或在其他情况下隐藏它。

```javascript
$ajaxForm.on('submit', function(event) {
  event.preventDefault();
  $response.addClass('loading').empty();
  $.ajax({
    url: 'http://book.learningjquery.com/api/',
    dataType: 'jsonp',
    data: {
      title: $('#title').val()
    },
    timeout: 15000
  })
  .done(response)
  .fail(function() {
    $response.html(failed);
  })
  .always(function() {
    $response.removeClass('loading');
  });
￼￼});
```
在发送$.ajax()调用之前,给#response容器添加loading类。而在加载完成时,则删除这个类。

+ 缓存响应

重复使用同一段数据时重复发送Ajax请求显示是一种浪费。为了避免这样做,可以把返回的数据缓存在一个变量中。在需要使用某些数据时,可以检查缓存中是否有这些数据。如果有,就直接拿来用即可。如果没有,则需要发送Ajax请求,并在它的.done()处理程序中将数据保存在缓存里,然后再操作返回的数据。

```javascript
var api = {};
$ajaxForm.on('submit', function(event) {
  event.preventDefault();
  $response.empty();
  var search = $('#title').val();
  if (search == '') {
    return;
  }
  $response.addClass('loading');
  if (!api[search]) {
    api[search] = $.ajax({
      url: 'http://book.learningjquery.com/api/',
      dataType: 'jsonp',
      data: {
        title: search
      },
      timeout: 15000
    });
  }
  api[search].done(response).fail(function() {
    $response.html(failed);
  }).always(function() {
    $response.removeClass('loading');
  });
});
```
这里新声明了一个变量,名叫api,用来保存创建的jqXHR对象。这个变量本身是一个对象,它的键对应着执行的搜索关键词。在提交表单时,检查jqXHR对象中是否有那个键。如果没有,就像以前一样执行查询,并把结果对象保存在api变量中。

+ 截流 Ajax 请求

搜索时常见的一个功能是在用户输入过程动态地列出搜索结果，可以通过给 keyup事件绑定一个处理程序来实现这个效果。

```javascript
$('#title').on('keyup', function(event) {
  $ajaxForm.triggerHandler('submit');
});
```

+ Ajax预过滤器

通过$.ajaxPrefilter()函数可以添加预过滤器。所谓预过滤器,就是一些回调函数,它们可以在发送请求之前对请求进行过滤。预过滤器会在$.ajax()修改或使用它的任何选项之前调用,因此通过预过滤器可以修改这些选项或基于新的自定义选项发送请求。预过滤器通过返回要使用的数据类型,也可以操作请求的数据类型。

```javascript
$.ajaxPrefilter(function(options) {
  if (/\.yml$/.test(options.url)) {
    return 'yaml';
  }
});
```
