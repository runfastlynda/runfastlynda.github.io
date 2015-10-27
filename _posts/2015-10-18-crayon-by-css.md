---
layout: post
title:  "用CSS画支蜡笔"
date:   2015-10-18 18:28:16
categories:
---

阅读了[single div-drawings with css](https://hacks.mozilla.org/2014/09/single-div-drawings-with-css/)这篇文章，不觉感叹CSS的强大，现把学习到新的技能，整理出来，在开始画纯CSS的蜡笔之前，先说说会涉及到的相关知识点。比如：我们会用到图形的组合，渲染颜色等等。

### 如何实现梯形？

最常见的梯形，利用边框我们可以得到，首先我们给一个div添加边框，当给边框设置四个不同的颜色时，就可以看到边框此时由四个不同颜色的梯形组成，那么想留下哪个梯形，
就把其他梯形对应的边框颜色设置为透明(transparent)，就可以得到一个梯形了。梯形的高便是边框的宽度设置。

```css
div{
  width： 100px;
  height: 100px;
  border-top: 50px solid pink;
  border-left: 50px solid grey;
  border-right: 50px solid #FFE767;
  border-bottom: 50px solid #57BA63;
}
```
![](http://7xjufd.dl1.z0.glb.clouddn.com/tixing.png)

### 如何实现三角形？

有了上面的梯形，想要一个三角形便更容易了，依旧使用border，观察上图中边框包围的空白的部分，那是content的部分，如果这部分为0，梯形就可以变成三角形，那么只要把width，height都设置为0px，
就可以得到一个三角形。

```css
div{
  width: 0px;
  height: 0px;
  border-top: 50px solid pink;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 50px solid transparent;
}
```
### 如何实现直角三角形?

上面实现的是一个等腰三角形，如果我们想要一个直角三角形呢？实现的方法有两种。

方法一：去掉左边框影响上边框三角形构成的左边界

```css
div{
  border-top: 100px solid pink;
  border-left: 0px solid transparent; //重点在这里，不设置左边框
  border-right: 100px solid transparent;
  border-bottom: 100px solid transparent;
}
```
方法二：上边框构成的三角形和左边框构成的三角形组合成一个直角三角形

```css
div{
  border-top: 100px solid pink;
  border-left: 100px solid pink;//把透明变粉色
  border-right: 100px solid transparent;
  border-bottom: 100px solid transparent;
}
```
### Gradient渐变

Gradient分为linear-gradient(线性渐变)和radial-gradient(径向渐变)。

##### linear-gradient(线性渐变)
###### 使用语法：

linear-gradient(angle,color-stop)
color-stop = color[ length | percentage]

详细介绍

+ angle：用角度值指定渐变的方向（或角度）。

to left：设置渐变为从右到左。相当于: 270deg
to right：设置渐变从左到右。相当于: 90deg
to top：设置渐变从下到上。相当于: 0deg
to bottom：设置渐变从上到下。相当于: 180deg。

+ color-stop 用于指定渐变的起止颜色：
+ color：指定颜色。
+ length：用长度值指定起止色位置。不允许负值
+ percentage：用百分比指定起止色位置。

使用百分比：

```css
div{
  width:200px;
  height:200px;
  margin:80px auto;
  background-image: linear-gradient(to bottom,pink 64%,purple 100%);
}
```

使用长度：

```css
div{
  width:200px;
  height:200px;
  margin:80px auto;
  background-image: linear-gradient(to bottom,pink 30px,purple 30px, purple 60px, pink 60px,pink 170px,purple 170px);
}
```
可以这样理解：方向自上往下，这里第一个pink在30px这个边界的上边是止的含义，代表0-30px是粉色，接着purple紫色从30px这里开始，到60px截止，依次后面一致。

##### radial-gradient(径向渐变)

radial-gradient径向渐变由它的中心定义。
为了创建一个径向渐变，你也必须至少定义两种颜色结点。颜色结点即你想要呈现平稳过渡的颜色。同时，你也可以指定渐变的中心、形状（原型或椭圆形）、大小。默认情况下，渐变的中心是 center（表示在中心点），渐变的形状是 ellipse（表示椭圆形），渐变的大小是 farthest-corner（表示到最远的角落）。

###### 语法
background: radial-gradient(center, shape size, start-color, ..., last-color);

径向渐变 - 颜色结点均匀分布（默认情况下）：

```css
div {
      background: radial-gradient(pink,purple);
}
```

径向渐变 - 颜色结点不均匀分布：

```css
div{
     background: radial-gradient(pink 40%, purple 60%);
}
```

###### 设置形状
shape 参数定义了形状。它可以是值 circle 或 ellipse。其中，circle 表示圆形，ellipse 表示椭圆形。默认值是 ellipse。

##### 形状为圆形的径向渐变：
```css
div {
	background: radial-gradient(circle, pink,purple);
}
```
###### 不同尺寸大小关键字的使用
size 参数定义了渐变的大小。它可以是以下四个值：closest-side，farthest-side，closest-corner，farthest-corner

##### 带有不同尺寸大小关键字的径向渐变：
```css
div {
	background: radial-gradient(60% 55%, farthest-side,blue,green,yellow,black);
}
```

讲了这么多，其实是想通过这些小工具，我们来做个纯CSS的铅笔图。废话少说开始正题。

### CSS画蜡笔
![](http://7xjufd.dl1.z0.glb.clouddn.com/1.7.png)

蜡笔由两个基础图形构成：矩形的笔身和三角形的笔尖。

HTML

```html
<div></div>
```
使用 div 和 background 颜色制作蜡笔的身体部分，从顶部到底部渐变，并使用 box-shadow 暗示立体感：

```css
div {
    background: #237449;
    background-image: linear-gradient(to bottom,
                                  transparent 62%,
                                  rgba(0,0,0,.3) 100%);
    box-shadow: 2px 2px 3px rgba(0,0,0,.3);
}
```
![](http://7xjufd.dl1.z0.glb.clouddn.com/1.1.jpg)
然后，使用一个从左到右的 linear-gradient 制作纸包装。alpha值为0.6，这样的之前的渐变可以透出来。

```css
div {
    background-image: linear-gradient(to right,
                                  transparent 12px,
                                  rgba(41,237,133,.6) 12px,
                                  rgba(41,237,133,.6) 235px,
                                  transparent 235px);
}
```
![](http://7xjufd.dl1.z0.glb.clouddn.com/1.2.jpg)

接下来，我继续使用同样的方式，从左到右渐变，制作蜡笔上的条纹。

```css
div {
    background-image: linear-gradient(to right,
                                  transparent 25px,
                                  rgba(0,0,0,.6) 25px,
                                  rgba(0,0,0,.6) 30px,
                                  transparent 30px,
                                  transparent 35px,
                                 rgba(0,0,0,.6) 35px,
                                 rgba(0,0,0,.6) 40px,
                                  transparent 40px,
                                  transparent 210px,
                                 rgba(0,0,0,.6) 210px,
                                 rgba(0,0,0,.6) 215px,
                                  transparent 215px,
                                  transparent 220px,
                                 rgba(0,0,0,.6) 220px,
                                 rgba(0,0,0,.6) 225px,
                                  transparent 225px);
}
```
![](http://7xjufd.dl1.z0.glb.clouddn.com/1.3.jpg)

纸包装上印刷的椭圆，使用一个 radial-gradient 轻松搞定！

```css
div {
    background-image: radial-gradient(ellipse at top,
                                 rgba(0,0,0,.6) 50px,
                                  transparent 54px);
}
```
![](http://7xjufd.dl1.z0.glb.clouddn.com/1.4.jpg)

完成了 div，我们把注意力转移到 :before 伪类元素上，创建蜡笔的笔头。
使用实心和透明的边框，我制作了一个三角形，把它和我之前绘制的 div 放到一起。

```css
div:before {
    height: 10px;
    border-right: 48px solid #237449;
    border-bottom: 13px solid transparent;
    border-top: 13px solid transparent;
}
```
![](http://7xjufd.dl1.z0.glb.clouddn.com/1.5.jpg)

比起蜡笔笔杆，笔头看起来有点平，我们可以使用 :after 伪类元素来修复这个问题。我添加一个从顶部到底部的 linear-gradient，制作了一个反光效果，贯穿整只蜡笔。

```css
div:after {
    background-image: linear-gradient(to bottom,
                                    rgb(255,255,255，0) 12px,
                                    rgb(255,255,255，.2) 17px,
                                    rgb(255,255,255，.2) 19px,
                                    rgb(255,255,255，0) 24px);
}
```
![](http://7xjufd.dl1.z0.glb.clouddn.com/1.6.jpg)
