---
layout: post
title:  "jQuery基础教程-学习笔记（2）"
date:   2015-09-22 18:28:16
categories:
- jquery
---

### 事件

+ $(document).ready(）事件处理程序可以用来触发函数中的代码。

```javascript
$(document).ready(function() {
　　//这里是代码... ...（保证当前文档中DOM树加载完成后执行代码，以免无法定位DOM元素）
});
```

+ 使用noConflict()方法实现同一个页面中多个javascript库的和平共存。

+ 通过鼠标事件处理程序和.bind()或.click()方法响应用户在页面元素上的单击操作，改变应用于页面的样式。

```javascript
$(document).ready(function() {
  $('#some-id').bind('click', function() {
    $(this).addClass('selected'); //关键字this引用的就是#some-id
    alert("you have clicked some-id");
    $(this).removeClass('selected'); //去除class
　});
});        
```
希望用户单击按钮时执行，引入.bind()方法

.bind('click', function() {})的简写是.click()，.unbind()移除绑定。

+ .removeClass()方法的参数是可选的，即当省略参数时，该方法会移除元素中所有的类。

例如：$('body').removeClass()

+ 通过使用.toggle()交替的扩展和折叠页面元素。该方法接受两个参数，而且这两个参数都是函数。第一次在元素上单击会调用第一个函数，第2次单击会触发第2个函数。

```javascript
$(document).ready(function(){
  $('#switcher h3').toggle(function(){
    $('#switcher button').addClass('hidden');
  },function(){
    $('#switcher button').removeClass('hidden');
  });
});
```
在第一次点击后，所有按钮(class="#switcher")都会隐藏起来，第二次点击则又恢复了它们的可见性。

+ 通过使用.hover()突出显示位于鼠标指针下方的页面元素。

.hover()控制鼠标指针进入元素和离开元素时执行任意操作，IE浏览器对:hover伪类选择符支持不好，开发时要注意。

+ 对于只需触发一次，随后要立即解除绑定的情况也有一种简写方法为.one()

+ 通过.stopPropagation()和.preventDefault()来影响事件的传播和默认动作，决定哪个元素能够响应事件。

+ 实现事件委托，减少页面中必须绑定的事件处理程序数量。

+ 调用.unbind() 移除停用的事件处理程序。

+ 利用事件命名空间分离相关的事件处理程序，以便于分组处理。

+ 通过.trigger()引发执行绑定的事件处理程序。

也就是说.trigger()方法可以完成模拟事件的操作，比如$('#some-id').trigger('click')

+ 使用键盘事件处理程序通过.keyup()响应用户的按键操作。



### 3单元课后习题

要完成以下练习，需要此书本章素材，可以从[Packt Publishing](􏴒􏴓http://www.packtpub.com/support)􏱄􏴔􏰖􏲦网站下载这些文件。

![素材index.html](http://7xjufd.dl1.z0.glb.clouddn.com/blog18.1.png)

(1)在Charles Dickens被单击时，给它应用selected样式。

```javascript
$(document).ready(function(){
  $('.author').on('click',function(){
    $(this).addClass('selected');
  });
});
```
(2)在双击章标题时，切换章文本的可见性。

```javascript
$(document).ready(function(){
  $('.chapter-title').on('dblclick',function(){
    $(this).nextAll().toggleClass('hidden');
  });
});
```
或者

```javascript
$(document).ready(function(){
  $('.chapter-title').dblclick(function(){
    $(this).siblings().toggleClass('hidden');
  });
});
```
(3)当用户按下向右方向键时，切换到下一个body类；右方向键的键码是39。

```javascript
$(document).ready(function(){
  var temp = '#switcher-default';
  var key = 39;
  $('#switcher-default').addClass('selected').on('click', function(){
    $('body').removeClass().addClass('default');
  });
  $('#switcher-default').trigger('click');
  $('#switcher-narrow').on('click', function(){
    $('body').removeClass().addClass('narrow');
  })
  $('#switcher-large').on('click', function(){
    $('body').removeClass().addClass('large');
  })
  $('#switcher button').on('click', function(){
    $('#switcher button').removeClass('selected');
    $(this).addClass('selected');
    temp = $(this);
  });
$(document).keyup(function(event){
  if(key == event.which){
    if(temp == '#switcher-default'){
      $('#switcher-default').trigger('click');
    }
    if(temp.attr('id') == 'switcher-large'){
      $('#switcher-default').trigger('click');
    }else{
      $(temp).removeClass('selected').next().trigger('click');
    };
  };
});
});
```
(4)挑战：使用console.log()函数记录在段落中移动的鼠标的坐标位置。（注意：console.log()可以在Firefox的firebug扩展、Safari的Web Inspector或Chrome、IE中的Developer Tools中使用。）

```javascript
$(document).ready(function(){
  $(document).mousemove(function(event){
    console.log(event.pageX);
    console.log(event.pageY);
  });
});
```
(5)挑战：使用.mousedown()和.mouseup()跟踪页面中的鼠标事件。如果鼠标按键在按下它的地方被释放，则为所有段落添加hidden类。如果是在按下它的地方之下被释放的，删除所有段落的hidden类。

```javascript
$(document).ready(function(){
  var up_Y,down_Y;
  $(document).on('click', function(){
    $('p').addClass('hidden');
  });
  $(document).mousedown(function(down){
    down_Y = down.pageY;
  });
  $(document).mouseup(function(up){
    up_Y = up.pageY;
    if(down_Y < up_Y){
      $('p').removeClass('hidden');
    };
  });
});
```