---
layout: post
title:  "jQuery基础教程-学习笔记（6）"
date:   2015-09-26 18:28:16
categories:
- jquery
---

### 使用插件

+ 使用插件很简单，找到插件的URL，在HTML中引用它，然后在脚本中使用。

+ 通过Cycle插件可以将这个列表转换成可以交互的幻灯片，在DOM中适当的容器上调用.cycle()方法，就可以实现。

```javascript
$(document).ready(function(){
  $('#books').cycle({
    timeout: 2000,
    speed: 200,
    pause: true//鼠标进入时暂停播放
  });
});
```
.cycle('pause') 和.cycle('resume')可以暂停和恢复播放，可以放到单击事件中，对于存在多组幻灯片的情况，
利用cycle提供的自定义:paused选择符可以找到被暂停的幻灯片，例如：$('ul:paused').cycle('resume')

+ Cookie插件提供读写页面中cookie值的接口，$.cookie()函可以取得或设置个别的cookie值。

```javascript
$.cookie('cyclePaused','y',{path: '/', expires: 7})//设置cookie值为y，在整个站点都可以访问到，保存时间是7天
$.cookie('cyclePaused','null')//通过传递null，删除cookie值
```

+ jQuery UI的插件.animate() .addClass() .removeClass() .toggleClass()都可以接受第二个可选参数，控制动画时长。

+ easeInExpo函数会让动画速度以指数方式加快，例如：

```javascript
$(document).ready(function(){
  $('h1').click(function(){
    $(this).toggleClass('highlighted','slow','easeInExpo');
  });
})
```

+ 通过.effect()方法可以实现更复杂的动画，transfer和size可以用来改变元素的形状和位置，explode和puff可以产生更吸引人的隐藏动画，pulsate和shake可以用来让元素更吸引人眼球。

```javascript
$(this).effect('shake',{
  distance: 10,
  duration: 80
});
```

+ Resizable组件的.resizable()方法，就可以把元素区域变成可以调整大小的元素。

+ jQuery UI还提供一些可靠的用户界面部件，.buttom() .slider()都是这样的方法

```javascript
$('<buttom>pause</buttom>').buttom({
  icons: {primary: 'ui-icon-pause'}//指定primary图标
})
```

+ 滑动条部件

```javascript
$(document).ready(function(){
  $('<div id="books-controls"></div>').insertAfter('#books');
  $('#books').cycle({
    before: function(){
      $('#slider')
      .slider('value',$('#books li').index(this));
    }
  });

  $('<div id="slider"></div>').slider({
    min: 0,
    max: $('#books li').length -1,
    slide: function(event,ui){
      $('#books').cycle(ui.value);
    }
  }).appendTo('#books-controls');
})
```
### 高级事件处理

+ 􏰤􏴞􏰞􏲁􏸇􏴰􏱺􏺊􏷷􏰙􏰑􏰮􏲬􏷄􏲋􏺊􏷷􏰑􏹋􏶦􏶙􏶚当鼠标移动到照片上时显示照片的详细信息，可以有几种方法实现。

.hover()方􏱜法

```javascript
$(document).ready(function() {
  $('div.photo').hover(function() {
    $(this).find('.details').fadeTo('fast', 0.7);
  }, function() {
    $(this).find('.details').fadeOut('fast');
  });
});
```
􏱯给mouseenter和􏲑mouseleave绑定事件的方法

```javascript
$(document).ready(function() {
  $('div.photo').on('mouseenter mouseleave', function(event) {
    var $details = $(this).find('.details');
    if (event.type == 'mouseenter') {
      $details.fadeTo('fast', 0.7);
    } else {
      $details.fadeOut('fast');
    }
  });
});􏸰􏳤
```
+ 使用事件委托把事件添加到通过Ajax调用的元素上。

+ jQuery的.on()方法内内置了委托管理能力。例如：

```javascript
$(document).ready(function() {
  $(document).on('mouseenter mouseleave', 'div.photo',
  function(event) {
    var $details = $(this).find('.details');
    if (event.type == 'mouseenter') {
      $details.fadeTo('fast', 0.7);
    } else {
      $details.fadeOut('fast');
    }
  });
});
```

+ 自定义事件必须在代码中通过手工方式来触发。从某种意义讲，自定义事件类似于我们的平常定义的函数，因为他们是一个预定义的代码块，可以在脚本中的其他位置调用执行。例如：

```javascript
(function($) {
  $(document).on('nextPage', function() {
    var url = $('#more-photos').attr('href');
    if (url) {
      $.get(url, function(data) {
        $('#gallery').append(data);
      });
    }
  });
  var pageNum = 1;
  $(document).on('nextPage', function() {
    pageNum++;
    if (pageNum < 20) {
      $('#more-photos').attr('href', 'pages/' + pageNum + '.html');
    }
    else {
      $('#more-photos').remove();
    }
  });
})(jQuery);
```
上面的代码是一次触发导致多个事件的绑定。

+ 无穷滚动，通过滚动触发上面定义的nextPage事件。

```javascript
(function($) {
  function checkScrollPosition() {
    var distance = $(window).scrollTop() + $(window).height();
    if ($('#container').height() <= distance) {
      $(document).trigger('nextPage');
    }
  }
  $(document).ready(function() { $(window).scroll(checkScrollPosition).trigger('scroll');
￼￼￼￼  });
})(jQuery);
```

+ 无穷滚动最大的问题是性能问题，不断的计算窗口和页面的大小，导致页面反应迟钝，此时需要节流事件。限制一些无所谓的计算。

### 第七单元练习

(1)把幻灯片的切换周期延长到1.5秒，把动画效果修改为下一张幻灯片淡入之前，前一张幻灯片淡出。请参考Cycle插件的文档，找到实现上述功能的选项。

```javascript
$(document).ready(function(){
	$('#books').cycle({
		timeout: 1500,
		fx: 'fade'   // 值：字符串，作用：选择特效,目前jquery.cycle.js支持27种切换效果。
	});
});
```
(2)设置名为cyclePaused的cookie，将它的有效期设置为30天。

```javascript
$(document).ready(function(){
	$.cookie('cyclePaused', 'the_value', { expires: 30 });
	alert($.cookie('cyclePaused'));
})
```
(3)限制书名区域，每次缩放只允许以10像素为单位。

```javascript
$(document).ready(function(){
  $('#books .title').resizable({ grid: [10, 10] });
})
```
(4)修改滑动条动画，让幻灯片切换时，滑块从当前位置平滑地移动到下一个位置。

```javascript
$(document).ready(function(){
  $('<div id="books-controls"></div>').insertAfter('#books');
  $('#books').cycle({
    timeout: 1500,
    fx: 'fade',   
    before: function(){
      $('#slider')
      .slider('value',$('#books li').index(this));
    }
  });

  $('<div id="slider"></div>').slider({
    min: 0,
    max: $('#books li').length -1,
    slide: function(event,ui){
      $('#books').cycle(ui.value);
    }
  }).appendTo('#books-controls');
})
```
(5)不像以前那样循环播放幻灯片，而是在播放完最后一张幻灯片后停止。当幻灯片停止播放时，也禁用相应的按钮和滑动条。

```javascript
$(document).ready(function() {
  var stop_flag = 1;
  var $books = $('#books').cycle({
    timeout: 2000,
    speed: 200,
    pause: true,
    nowrap: 1,//使幻灯片只播放一遍，不循环
    before: function() {
      $('#slider').slider('value', $('#books li').index(this));
    },
    end: function(){
      $('button').click(function(event){
        $(this).effect('shake', {
          distance: 10
        });
      });
      stop_flag = 0;
    }//end回掉函数可以和autostop或者nowrap配合使用
  });
  if ( $.cookie('cyclePaused') ) {
    $books.cycle('pause');
  }
  var $controls = $('<div id="books-controls"></div>').insertAfter($books);
  $('<button>Pause</button>').click(function(event) {
    if(stop_flag == 1){
      event.preventDefault();
      $books.cycle('pause');
      $.cookie('cyclePaused', 'y');
    };
  }).button({
    icons: {primary: 'ui-icon-pause'}
  }).appendTo($controls);
    $('<button>Resume</button>').click(function(event) {
      if(stop_flag == 1){
        event.preventDefault();
        var $paused = $('ul:paused');
        if ($paused.length) {
            $paused.cycle('resume');
            $.cookie('cyclePaused', null);
        }else {
            $(this).effect('shake', {
                distance: 10
            });
        };    
      };
    }).button({
      icons: {primary: 'ui-icon-play'}
    }).appendTo($controls);

  $('<div id="slider"></div>').slider({
    min: 0,
    max: $('#books li').length - 1,
    slide: function(event, ui) {
      if(stop_flag == 1){
        $books.cycle(ui.value);
      }else{
        $(this).effect('shake', {
            distance: 10
        });
      };
    }
  }).appendTo($controls);
});
```
