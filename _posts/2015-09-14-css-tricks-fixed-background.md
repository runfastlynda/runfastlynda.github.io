---
layout: post
title: CSS技巧之固定背景
categories:
- css
---

当我们滚动页面时发现：

页面的背景是固定的，不随页面的滚动而滚动，同时放大和缩小窗口可以发现页面背景也会随之放大和缩小。

这种固定背景的效果该如何实现？下面来看看！
### CSS 技巧 - 固定背景

##### 最终效果
[codepen在线demo](http://codepen.io/runfastlynda/pen/epJByp?editors=110)

##### 实现代码

背景固定有两种实现方式，一种是元素 fixed，其背景不做特殊处理；
另一种是背景固定，元素不做特殊处理。
一般情况下后者是最便利的。

```css
    body {
      background-image: url(图片地址);
      background-attachment: fixed;
      background-size: cover;
      background-position: center;
    }
```
##### 实现原理：

```css
    background-attachment: fixed
```
如果设为 fixed，背景图片不会随着包含它的元素一直滚动，而是一直固定固定在屏幕的一个位置。
background-attachment的默认参数是scroll，如果设为 scroll，背景图片会随着包含它的区块一起滚动。

```css
    background-size: cover;
```
使背景图始终填满整个屏幕

```css
    background-position: center;
```
background-position 指定背景图片的初始位置。设置为center使背景图居中。

###### background-position属性

背景位置属性控制一个元素的背景图片的位置。必须注意的是，实际上位置的指定是相对于元素的左上角
，定位图像的左上角。看下面的例子：

```css
      /* 1: 默认 */
      background-position: 0 0;

      /* 2: 移动图片到右边 */
      background-position: 75px 0;

      /* 3: 移动图片到左边 */
      background-position: -75px 0;

      /* 4: 下移图片 */
      background-position: 0 100px;
```
![](http://7xjufd.dl1.z0.glb.clouddn.com/5.png)

背景位置属性还有其他的值:关键字和百分比。

使用时它们的顺序是和值为像素完全一样，x轴值第一，和y轴的值的第二，就像这样：

```css
      background-position: top right;
      background-position: 100% 50%;
```