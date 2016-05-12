---
layout: post
title: "巧用border实现梯形和三角形"
categories:
- 博客
---


### 如何实现梯形？

利用边框我们可以得到梯形，首先我们给一个div添加边框，当给边框设置四个不同的颜色时，我们可以得到这样的样式，可以看到这里上边框是一个梯形，那么如果我们给其他边框设置颜色为透明(transparent)，就可以得到一个梯形了。梯形的高便是边框的宽度设置。

![](../../../../img/160312-1.png)

```
div{
  width:100px;
  height:100px;
  margin: 80px auto;
  border-top: 50px solid pink;
  border-left: 50px solid grey;
  border-right: 50px solid #FFE767;
  border-bottom: 50px solid #57BA63;
}
```

### 三角形图案如何实现？

有了上面梯形的实现，想要一个三角形便更容易了，依旧使用border，观察上图中边框包围的空白的部分，那是content的部分，如果这部分为0，梯形就可以有三角了，那么只要把width，height都设置为0px，就可以得到一个三角形。

![](../../../../img/160312-2.png)

```
div{
  width:0px;
  height:0px;
  margin: 80px auto;
  border-top: 50px solid pink;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 50px solid transparent;
}
```


### 直角三角形

上面实现的是一个等腰三角形，如果我们想要一个直角三角形呢？实现的方法有两种。

![](../../../../img/160312-3.png)

方法一：去掉左边框影响上边框三角形构成的左边界

```
div{
  width:0px;
  height:0px;
  margin: 80px auto;
  border-top: 100px solid pink;
  border-left: 0px solid transparent; //重点在这里，不设置左边框
  border-right: 100px solid transparent;
  border-bottom: 100px solid transparent;
}
```

方法二：上边框构成的三角形和左边框构成的三角形组合成一个直角三角形

```
div{
  width:0px;
  height:0px;
  margin: 80px auto;
  border-top: 100px solid pink;
  border-left: 100px solid pink;//把透明变粉色
  border-right: 100px solid transparent;
  border-bottom: 100px solid transparent;
}
```