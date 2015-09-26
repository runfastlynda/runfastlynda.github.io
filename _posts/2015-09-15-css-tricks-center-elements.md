---
layout: post
title: CSS技巧之居中元素的几种方法
categories:
- 博客
---
居中元素我们经常会用到，下面介绍下各种情况下居中元素的方法。

### 居中一个行内元素

常用的行内元素有 span,   strong,   em,  br,  img ,  input,  label,  select,  textarea等等，        
##### 行内元素的特点：

+ 行内元素不会独占一行，相邻的行内元素会排列在同一行里，直到一行排不下，才会换行，其宽度随元素的内容而变化。
+ 行内元素设置width,  height无效
+ 行内元素的水平方向的padding-left,padding-right,margin-left,margin-right 都产生边距效果，但是竖直方向的padding-top,padding-bottom,margin-top,margin-bottom都不会产生边距效果。

如果要把行内元素居中，只需要把行内元素包裹在一个属性display为block的父层元素中，并且把父层元素添加如下属性便可以实现居中的效果：

    text-align: center;

这个简单的方法通常用在段落或者标题中的文稿内居中字句， 例如：

    P { text-align: center }

### 居中一个块级元素

有时侯并不是文稿需要居中排列,
而是把文本块作为一个整体居中排列，或者说, 我们居中一个块级元素。

块级元素和行内元素不同，块级元素会独占一行，可以设置 width, height属性，可以设置margin 和 padding。

居中一个块级元素有一个特备重要的地方：给div设置一个宽度，然后添加margin:0 auto属性才会有效，就像这里：

      div{
              width:200px;
              margin:0 auto;
         }

##### 最终效果
[codepen在线demo](http://codepen.io/runfastlynda/pen/epJByp?editors=110) 居中了页面的图像。

##### 使用技巧：居中外包围框
在支持响应式布局的页面中，添加一个外包围边框，可以方便的改变内部所有的元素宽度，
只需要调整外包围框的宽度便可以，非常有效！

页面的外包围框有几个作用：

+ 居中内容
+ 围框里所有 block 元素的默认宽度是充满父容器的宽度，不需要个别为每个元素设置宽度。


### 绝对定位元素的居中实现

使用CSS实现绝对定位元素的居中效果，兼容性不错的主流用法是：

      .element {
          width: 400px;
          height: 400px;
          position: absolute;
          left: 50%;
          top: 50%;
          margin-top: -200px;    /* 高度的一半 */
          margin-left: -200px;    /* 宽度的一半 */
      }

可是这种方法有一个很明显的不足，就是需要提前知道元素的尺寸。否则margin负值的调整无法精确。
此时，往往要借助JS获得。

CSS3的兴起，使得绝对定位元素的居中实现有了更好的解决方法，就是使用transform代替margin。

transform中translate偏移的百分比值是相对于自身大小的，于是，我们可以：

      .element {
          width: 400px;
          height: 400px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);    /* 50%为自身尺寸的一半 */
      }

于是，无论绝对定位元素的尺寸是多少，其都是水平垂直居中显示的。
当然这种方法的兼容性不好。

### 居中一个浮动元素

居中一个浮动元素和绝对定位元素的居中实现特别相似，需要重点注意的是这里宽度是必须的，确定容器的宽高，
高度可以不设，设置div的上外边距和左外边距分别是宽高的一半。

实现居中的关键就在于 margin设置与 position:relative。

      .div {
          float：left
          width: 400px ;
          height: 400px;
          margin: -200px 0 0 -200px;
          position: relative;
          left: 50%;
          top: 50%;
      }

[codepen在线demo](http://codepen.io/runfastlynda/pen/meVLqE)
