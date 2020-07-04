---
date: 2016-09-16
title: "CSS还原一个紫色播放器ICON"
---

实话说，我很喜欢用 CSS 实现一个图形，就像之前完成的大白之类的，不过以前模仿更多一些，正巧那天整理以前的一些设计稿，就想用 CSS 实现一模一样的设计，那中秋放假比较闲就动动脑，动动手啦。下图是要实现的紫色播放器 ICON：

![](http://7xjufd.dl1.z0.glb.clouddn.com/100in100_purple_player.png)

实现这样的图形，拆解最重要！马上小纸小笔画起来：

![](http://7xjufd.dl1.z0.glb.clouddn.com/%E7%B4%AB%E8%89%B2icon%E8%A7%A3%E6%9E%90.png)

+ 背景

渐变色感觉最近很流行，当然如果内容单一的话，纯色背景有时会比较单调，那么渐变色就是你最好的选择。我们这里没什么特别的，简单的线性渐变就可以。

```
background: linear-gradient(to bottom right, #ECA7FF, #7D23FF);
```

+ ICON

ICON 的样式基本就是常用的圆角和阴影，也没什么特别的，但是内部表盘的内阴影设置没有用到 border-shadow，因为控制盘的立体效果，这里我叠加了两个大小不同的圆：console-bg 和 console，设置大的控制盘的不透明度为0.35，注意这两个控制盘的关系是兄弟关系，不是父子关系，因为不透明度会遗传。

```
.console-bg {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: 0px 6px 10px rgba(0,0,0,0.5);
  background: linear-gradient(to bottom right, #E500E7, #00D7FF);
  opacity: 0.35;
}

.console {
  width: 184px;
  height: 184px;
  border-radius: 50%;
  background: linear-gradient(to bottom right, #E500E7, #00D7FF);
}

```

就这样按着样式需求实现，一个 ICON 就实现了，到了这一步，再给按钮添加简单的动画效果，简单通过JS控制按钮的点击事件，添加 class 类名就可以。

```
.button {
  transform: rotate(0deg);
  transition: transform 3s;
}

.on {
  transform: rotate(180deg);
}

```

想查看最终实现的效果的[点击这里](http://runfastlynda.com/demos/purple-player)。