---
date: 2015-09-17
title: CSS设计模型之给文档流以外的东西留空间
categories:
- css
---

我们常常会看到类似下面例子里的页面效果，这样的效果通常有相似之处：图片和文字上下分离或者左右分离，
这样的效果实现的思路就是给文档流以外的东西留空间。

网页头部logo:

![](http://7xiv3r.com1.z0.glb.clouddn.com/logo17.2.png)

内容介绍:

![](http://7xjufd.dl1.z0.glb.clouddn.com/logo17.png)



### 实现方式
我们想做这样的效果：

![](http://7xjufd.dl1.z0.glb.clouddn.com/4.jpg)

HTML:

```html
<header>
  <h1>The Big Bang Theory</h1>
</header>
```
CSS:

```css
header {
  background-image: url("TheBigBangTheory.png");
  background-repeat: no-repeat;
  background-size: contain;
  padding-top: 120px;
}
```
##### 实现原理:

我们通过设置div的padding预留出存放图片的位置，background-position控制图片的位置，文字和图片的布局可以是上下，可以是左右，则设置padding-top、padding-left来控制。

```css
padding-top: 120px
```
通常图片的的大小是固定的。在这里预留的空间的值写图片的高就可以了。

##### codepen在线demo

[demo](http://codepen.io/runfastlynda/pen/xwVROG)
