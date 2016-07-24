---
layout: post
title: "简单实现回到顶部的效果"
categories:
- html
- css
- javascript
- frontend
---

实现一个简单的回到顶部的效果实质是在一个图片（或文字）添加click事件，
点击图片回到页面的开始。如果它可以逐渐出现，逐渐消失，动态的显示就更好了，那么现在开始！

### HTML代码

```html
    <body style="height: 3000px;">
    	<div class="go-top dn" id="go-top">
    	    <a href="javascript:;" class="go"><img src="backtotop.png"></a>
    	</div>
    </body>
```
有了上面的html后，当我们点击有箭头的这个图片时，就会自动跳转到页面的顶部。

### CSS代码

```css
    .dn {
    	display: none;
    }

    .go-top {
    	position: fixed;
    	bottom: 40px;
    	right: 20px;
    	width: 46px;
    	z-index: 999;
    }
```
默认情况下我们给包含跳转链接的div设置为隐藏，通过position：fixed的属性实现侧边屏幕绝对定位。

### javascript代码

开始时跳转链接是隐藏的，所以使用jQuery要实现的效果是：浏览器滚动条处于最顶部的时候，跳转链接处于隐藏状态。当滚动条向下滚动后，跳转链接逐渐显出，当点击跳转链接后，页面逐渐滚动至顶部，跳转链接逐渐消失。

```javascript
      $(function(){
      	$(window).on('scroll',function(){
      		var st = $(document).scrollTop();
          //当滚动条的位置处于距顶部300像素以下时，跳转链接出现，否则消失
      		if( st>300 ){
      			$('#go-top').fadeIn(function(){
      				$(this).removeClass('dn');
      			});
      		}else{
      			$('#go-top').fadeOut(function(){
      				$(this).addClass('dn');
      			});
      		}
      	});
        //当点击跳转链接后，滚动条跳到0的位置，也就是页面顶部，页面移动速度是500。
      	$('#go-top .go').on('click',function(){
      		$('html,body').animate({'scrollTop':0},500);
      	});
      });
```

[在线codepen演示地址](http://codepen.io/runfastlynda/pen/rONMrj)
