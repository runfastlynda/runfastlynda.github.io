---
layout: post
title:  "jQuery基础教程-学习笔记（3）"
date:   2015-09-23 18:28:16
categories:
---

### 样式和动画

+ 使用的样式没有在样式表中定义，使用.css()方法

这个方法集合setter（设置方法）和getter（获取方法）于一体，获取某个样式属性值，只需要传入一个参数：属性名，
设置样式需要传入属性名和属性值。

获取：.css('backgroundColor)
设置：.css('backgroundColor' , '#fff')

+ .hide()和.show()方法就是.css('display','string')方法的简写。

string是适当的显示值，先使用.hide()方法可以把之前的display的属性值记住，
在使用.show()时就可以调用之前的设置了。

这两种方法还可以传入参数，控制速度。使用方法：.show('speed') ，speed包括`slow`,`normal`,`fast`。

+ 淡入淡出使用.fadeIn('speed')和.fadeOut('speed')。

+ 滑上滑下使用.slideDown('speed')和.slideUp('speed')。

+ .slideToggle('speed')方法复合了.toggle()和.slideUp().slideDown()方法。

+ .animate()可以创建控制更加细致的自定义动画。

第一种形式：
```
      .animate({property1: 'value1', property2: 'value2'},
      duration, easing, function() {
          alert('The animation is finished.');
        }
```

第二种形式：
```
      .animate({
            property1: 'value1',
            property2: 'value2'
          }, {
            duration: 'value',
            easing: 'value',
            specialEasing: {
              property1: 'easing1',
              property2: 'easing2'
            },
            complete: function() {
              alert('The animation is finished.');
            },
            queue: true,
            step: callback
      });
```

+ 排队效果：通过使用连缀方法
􏵣􏵤􏵥􏵦􏵧􏵨􏵩􏵪􏵫􏳽􏳾􏴽􏴾􏵣􏵤􏵥􏵦􏵧􏵨􏵩􏵪􏵫􏳽􏳾􏴽􏴾􏵣􏵤􏵥􏵦􏵧􏵨􏵩􏵪
例如：
```
       $(document).ready(function() {
            $('div.label').click(function() {
              var paraWidth = $('div.speech p').outerWidth();
              var $switcher = $(this).parent();
              var switcherWidth = $switcher.outerWidth();
              $switcher
                .css({position: 'relative'})
                .animate({left: paraWidth - switcherWidth}, 'slow')
                .animate({height: '+=20px'}, 'slow')
                .animate({borderWidth: '5px'}, 'slow');
            });
      });
```

+ 一组元素上的效果：

当在一个.animate()方法中以多个属性的方式应用时，是同时发生的；

当以方法连缀的形式应用时，是按顺序发生的（排队效果）————除非queue选项值为false。

+ 多组元素上的效果：

默认情况下是同时发生的；

当在另一个效果方法或者在.queue()方法的回调函数中应用时，是按顺序发生的（排序效果）。

###4单元课后习题

(1)修改样式表，一开始先隐藏页面内容，当页面加载后，慢慢地淡入内容。
```
      $(document).ready(function(){
        $('body').css('display','none');
        $('body').fadeIn(3000);
      });
```

(2)在鼠标悬停到段落上面时，给段落应用黄色背景。
```
      $(document).ready(function(){
        $('p').mouseover(function(){
          $(this).css('backgroundColor', 'yellow')
          .mouseout(function(){
            $(this).css('backgroundColor', 'white')
          });
        });
      });
```
(3)单击标题(<h2>)使其不透明度变为25%，同时添加20px的左外边距，当这两个效果完成后，把讲话文本变成50%的不透明度。
```
      $(document).ready(function(){
        $('h2').on('click', function(){
          $(this)
          .fadeTo('slow', 0.25)
          .animate({
            paddingLeft: '+=200px'
          },{
            duration: 'slow',
            queue:false
          })
          .queue(function(next) {
            $('div.speech').fadeTo('slow', 0.5)
          });
        });
      });
```
(4)挑战：按下方向键时，使样式转换器向相应的方向平滑移动20像素；四个方向键的键码分别是37(左)、38(上)、39(右)、40(下)。
```
      $(document).ready(function(){
        var key_left = 37;
        var key_up = 38;
        var key_right = 39;
        var key_down = 40;
        var $switcher = $('#switcher');
        $switcher.css('position', 'relative');
        $(document).keyup(function(event){
          switch(event.which){
            case 37:
              $switcher
              .animate({
                left: '-=20px'
              },{
                duration: 'fast'
              })
                break;
            case 38:
              $switcher
              .animate({
                top: '-=20px'
              },{
                duration: 'fast'
              })
              break;
            case 39:
              $switcher
              .animate({
                left: '+=20px'
              },{
                duration: 'fast'
              })
              break;
            case 40:
              $switcher
             .animate({
               top: '+=20px'
             },{
               duration: 'fast'
             });
          };
        });
      });
```