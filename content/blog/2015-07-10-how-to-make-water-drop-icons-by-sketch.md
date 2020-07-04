---
date: 2015-07-10
title: "如何用sketch制作一个水滴图标"
tags: ["sketch"]
categories:
- sketch
---

如何用sketch制作一个水滴图标呢？效果图如下：

![效果图](http://7xjufd.dl1.z0.glb.clouddn.com/1-1.png-content4blog)

#### step1 添加Artboard

* 单击inset选项，选择Artboard
* 在iPad screens下选择landscape

![效果图](http://7xjufd.dl1.z0.glb.clouddn.com/1-2.png-content4blog)

#### step2 创建背景
* 点击`R`键，拖动鼠标，创建一个长方形，命名为background
 * 坐标设置为：x：0，Y:0；
 * 大小设置为：width：1024，height：768  
* 点击`Fills`，选择第二种填图方式
 * 点击6个小正方形下面线条的左边，点击后成方块状
 * 设置颜色为H:190 S:50 B:100 A:100
 * 同样点击6个小正方形下面的线条的右边，点击后成方块状
 * 设置颜色为H:210 S:50 B:100 A:100


![效果图](http://7xjufd.dl1.z0.glb.clouddn.com/1-3.png-content4blog)

（记得取消边框设置）

#### step3 创建图标
* 点击`R`键，拖动鼠标，创建一个正方形，命名为`icon`
 * 坐标设置为：x：251，Y:122；
 * 大小设置为：width：515，height：515
* 设置`icon`的`Radius`的值34，就可以使`icon`的角变圆,像这样：

![icon](http://7xjufd.dl1.z0.glb.clouddn.com/1-4.png-content4blog)

* 设置`icon`的`shadow`
  * 位置和大小为：X:0, Y:25, Blur:55, Spread:0
  * 颜色为：H:210 S:70 B:80 A:100
* 设置`Inner Shadows`
 * 位置和大小为：X:0, Y:-13, Blur:21, Spread:0
 * 颜色为：H:190 S:30 B:100 A:100

![效果图](http://7xjufd.dl1.z0.glb.clouddn.com/1-5.png-content4blog)

#### step4 制作水滴图案
* 点击`O`键，拖动鼠标，创建一个圆（weight：200，height：200）
* 单击`inset`选项，选择`shape`下得`Triangle`，创建一个三角形（weight：200，height：200）
* 现在把三角形和圆组合在一起，像一个水滴的图形（大概像即可）

![水滴](http://7xjufd.dl1.z0.glb.clouddn.com/1-6.png-content4blog)

* 选中三角形和圆，点击`union`,做它们的交集为水滴
* 现在修整水滴，单击水滴图上的三角形，点`edit`
 * 设置`Corners`为34

![水滴1](http://7xjufd.dl1.z0.glb.clouddn.com/1-7.png-content4blog)

 * 拉动三角形的左右两边使其和圆贴合

![水滴2](http://7xjufd.dl1.z0.glb.clouddn.com/1-8.png-content4blog)

 * 设置水滴大小 Width:266,Height：377
* 设置`Fills`选择第三种填图方式
 * 点击6个小正方形下面线条的左边，点击后成方块状（类似step2）
 * 设置颜色为H:190 S:70 B:100 A:100
 * 同样点击6个小正方形下面的线条的右边，点击后成方块状
 * 设置颜色为H:210 S:70 B:100 A:100
* 设置`Inner Shadows`
 * 位置和大小为：X:0, Y:-34, Blur:55, Spread:0
 * 颜色为：H:190 S:100 B:100 A:100

![效果图](http://7xjufd.dl1.z0.glb.clouddn.com/1-9.png-content4blog)

####水滴图标完成！
