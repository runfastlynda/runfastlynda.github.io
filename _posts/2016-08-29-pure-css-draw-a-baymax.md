---
layout: post
title: "CSS画个大白有哪些技巧"
categories:
- sourcecode
---

最近看到不少纯 CSS 打造的图案和动画，效果很精巧，也非常有趣，就像这个[大白](http://runfastlynda.com/demos/purple-player)([作者的原链接在这里](http://www.jianshu.com/p/6d3feca2b5f7))，其实实现这样的图案有很多重复的技巧。就拿这个大白举例：

先来读一读源代码：

#### HTML

```
<div id="baymax">

  <div id="head">
    <div id="eye"></div>
    <div id="eye2"></div>
    <div id="mouth"></div>
  </div>
  
  <div id="torso">
    <div id="heart"></div>
  </div>
  
  <div id="belly">
    <div id="cover"></div>
  </div>
  
  <div id="left-arm">
    <div id="l-bigfinger"></div>
    <div id="l-smallfinger"></div>
  </div>
  
  <div id="right-arm">
    <div id="r-bigfinger"></div>
    <div id="r-smallfinger"></div>
  </div>
  
    <div id="left-leg"></div>

    <div id="right-leg"></div>
</div>
```

#### CSS

```
body {
  background: #eee;
}

#baymax {
  margin: 0 auto;
  height: 600px;
  overflow: hidden;
}

#head {
  height: 64px;
  width: 100px;
  border-radius: 50%;
  background: #fff;
  margin: 0 auto;
  margin-bottom: -20px;
  border-bottom: 5px solid #e0e0e0;
  z-index: 100;
  position: relative;
}

#eye, #eye2 {
  width: 11px;
  height: 13px;
  background: #282828;
  border-radius: 50%;
  position: relative;
  top: 30px;
  left: 27px;
  transform: rotate(8deg);
}

#eye2 {
  transform: rotate(-8deg);
  left: 69px;
  top: 17px;
}

#mouth {
  width: 38px;
  height: 1.5px;
  background: #282828;
  position: relative;
  left: 34px;
  top: 10px;
}

#torso, #belly {
  margin: 0 auto;
  height: 200px;
  width: 180px;
  background: #fff;
  border-radius: 47%;
  border: 5px solid #e0e0e0;
  border-top: none;
  z-index: 1;
}

#belly {
  height: 300px;
  width: 245px;
  margin-top: -140px;
  z-index: 5;
}

#cover {
  width: 190px;
  background: #fff;
  height: 150px;
  margin: 0 auto;
  position: relative;
  top: -20px;
  border-radius: 50%;
}

#heart {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  position: relative;
  box-shadow: 2px 5px 2px #ccc inset;
  right: -115px;
  top: 40px;
  z-index: 111;
  border: 1px solid #ccc;
}

#left-arm, #right-arm {
  height: 270px;
  width: 120px;
  border-radius: 50%;
  background: #fff;
  margin: 0 auto;
  position: relative;
  top: -350px;
  left: -100px;
  transform: rotate(20deg);
  z-index: -1;
}

#right-arm {
  transform: rotate(-20deg);
  left: 100px;
  top: -620px;
}

#l-bigfinger,
#r-bigfinger{
    height: 50px;
    width: 20px;
    border-radius: 50%;
    background: #fff;
    position: relative;
    top: 250px;
    left: 50px;
    transform: rotate(-50deg);
}

#r-bigfinger{
    left: 50px;
    transform: rotate(50deg);
}

#l-smallfinger,
#r-smallfinger{
    height: 35px;
    width: 15px;
    border-radius: 50%;
    background: #fff;
    position: relative;
    top: 195px;
    left: 66px;
    transform: rotate(-40deg);
}

#r-smallfinger{
    background: #fff;
    transform: rotate(40deg);
    top: 195px;
    left: 37px;
}

#left-leg,
#right-leg{
    height: 170px;
    width: 90px;
    border-radius: 40% 30% 10px 45%;
    background: #fff;
    position: relative;
    top: -640px;
    left: -45px;
    transform: rotate(-1deg);
    z-index: -2;
    margin: 0 auto;
}

#right-leg{
    background: #fff;
    border-radius: 30% 40% 45% 10px;
    margin: 0 auto;
    top: -810px;
    left: 50px;
    transform: rotate(1deg);
}

```

### 技巧一：清晰的HTML代码结构

这个技巧好模糊，为什么和没说一样，先看看大白的 HTML 结构，其实实现这样的图案就是一个组合的过程，大白的 HTML 结构写的很清晰，只要阅读完大白的 HTML 的源码就可以理解组合的含义，先拆分大白的所有身体部分，比如：头部是一个独立的部分，眼睛和鼻子（或嘴巴？不知道大白的眼睛间的那条横线是那个器官啦。）都在头部，所以被包含在一个 div 上，依次类推，组合所有大白的身体部位。

组合完的不同的部位就需要填充样式，控制位置，这两点应该是最重要的。

### 技巧二：位置控制

位置的控制是图形组合展示的最重要的部分了，不仅需要控制图形的位置，还需要考虑层叠的顺序。那这就很明显了，一个是用到了 postion 方法，一个用到 z-index 方法。

需要注意的是 postion 方法使用 relative ，相对定位更好和嵌套的元素组合控制位置，比如：眼睛在头部，那么控制眼睛的位置相对头部的位置更好，如果我们想让大白摇一摇头只需要控制大白的头部就可以，不需要担心眼睛的位置走位。当然具体的 top，left 值需要自己精确的计算了。

z-index 不需要过多赘述，正常的使用方法，但效果很好。

最后还有一个方法需要注意：transform，像大白的眼睛，当然 transform 有更多好玩的方法可以使用，灵活的使用需要更多的熟悉和练习。

### 技巧三：巧用border控制图案形状

图案形状要求高才可以更形象，才有用 CSS 实现这样的图案的意义，否则还不如直接使用图片效果更好。一般可以控制到图案的方法都是和 border 相关的。

特别常用的是：border-radius 和 border。

border 的使用可以看我的[《巧用border实现梯形和三角形》](http://runfastlynda.com/2016/03/12/use-border-make-triangle/)这篇文章，这里就不多说了，border 的使用不仅仅是边框的作用。

对于 border-radius 有一点需要知道，border-radius 可以单独设置四个圆角的大小。那这样就可以灵活的控制图案的形状了，具体的例子就看大白的胳膊：

```
#left-leg,
#right-leg{
  border-radius: 40% 30% 10px 45%;
}
```

绘画的时候，为了让图形更饱满，生动，一定会添加阴影，这里也是一样，我们使用 box-shadow 给图案添加阴影。box-shadow 可以设置一个或多个阴影效果，如果元素同时设置了 border-radius ，阴影也会有圆角效果。

其实，自己动手写一个这样的图案不是很难，让这样的图形动起来也很简单，这个过程不仅有趣，还可以加强了对 CSS 的理解。
