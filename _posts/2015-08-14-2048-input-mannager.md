---
layout: post
title: "2048源代码解读（2）"
categories:
- 博客
---
上文介绍了2048源码的宏观情况，下面打算仔细的看看源代码，我自己很感兴趣于键盘控制这一部分，所以决定先阅读input_mannager.js这一部分。

仔细查看了input_mannager.js的源代码发现好多的prototype。那先来看看prototype是什么？

###javascript中的prototype

在JavaScript语言中，每一个对象都有一个对应的原型对象，被称为prototype对象。定义在原型对象上的所有属性和方法，都能被派生对象继承。

那么这里如果修改了prototype对象，变动就立刻会体现在实例对象中。

###call()

JavaScript中this的动态切换，为其创造了巨大的灵活性，但也使得编程变的困难和模糊。input_mannager.js这里运用了call()的方法来固定this的确切指向，确定执行的作用域。

函数的call方法，可以指定该函数内部this的指向，然后在所指定的作用域中，调用该函数。




	func.call(thisValue, arg1, arg2, …)



 arg1, arg2是可以传入的参数。

###input_mannager.js

KeyboardInputManager函数有如下结构：

![思维导图](http://7xjufd.dl1.z0.glb.clouddn.com/blog2.1.png)

打开后我们看到了下面的代码



	if (window.navigator.msPointerEnabled) {
    //这里考虑的是浏览器兼容性的问题
    //if里的判断语句是判断用户设备是不是Internet Explorer 10 支不支持msPointer相关事件
    this.eventTouchstart    = "MSPointerDown";
    this.eventTouchmove     = "MSPointerMove";
    this.eventTouchend      = "MSPointerUp";
  	} else {
    this.eventTouchstart    = "touchstart";
    this.eventTouchmove     = "touchmove";
    this.eventTouchend      = "touchend";
  }



这是为了统一不同的浏览器中对触摸事件的处理，运用的if判断语句统一命名，为后面的编程做准备。

接着下一行有这样的代码



	this.listen();



this指代KeyboardInputManager这个函数，我们从KeyboardInputManager的原型链上找到了对listen的定义，也就是KeyboardInputManager.prototype.listen，那么查看这个对象。

首先是对键盘的控制


	// 对全局进行事件监听，把握键盘方向键的控制
	document.addEventListener("keydown", function (event) {
	var modifiers = event.altKey || event.ctrlKey || event.metaKey ||event.shiftKey;
	//使用逻辑或|| 把alt，ctrl，meta，shift四个键按下的事件赋给了modifiers;

	var mapped    = map[event.which];

	//判断按键是否标准，执行移动的函数
	if (!modifiers) {
		if (mapped !== undefined) {
			event.preventDefault();
			self.emit("move", mapped);
		}
	}

	// 添加R快捷键的行为
	if (!modifiers && event.which === 82) {
		self.restart.call(self, event);
	}



有趣的是这里不仅给光标移动映射了上下左右的移动事件，还对常用的游戏按键`W` `A` `S` `D`,还有Vim中的`H` `J` `K` `L`映射了上下左右的移动事件。



	var map = {
		38: 0, // Up
		39: 1, // Right
		40: 2, // Down
		37: 3, // Left
		75: 0, // Vim up
		76: 1, // Vim right
		74: 2, // Vim down
		72: 3, // Vim left
		87: 0, // W
		68: 1, // D
		83: 2, // S
		65: 3  // A
	}



然后是移动端滑动控制


	var touchStartClientX, touchStartClientY;
  var gameContainer = document.getElementsByClassName("game-container")[0];
	//定义了页面中game-container这一部分

	//添加对gameContainer的监听事件
	gameContainer.addEventListener(this.eventTouchstart, function (event) {
		if ((!window.navigator.msPointerEnabled && event.touches.length > 1) ||event.targetTouches > 1)
	//将多余一个指头的滑动事件忽略




对game-container进行事件监听，意味着只有在game-container里的滑动才有效的，接着获取滑动的起始坐标，获取滑动长度等等。

我们来看重点的判断滑动方向


    if (Math.max(absDx, absDy) > 10) {
    	self.emit("move", absDx > absDy ? (dx > 0 ? 1 : 3) : (dy > 0 ? 2 : 0));
    }
    // (right : left) : (down : up)



使用了两次三目运算的方法，比较absDx和absDy的大小，谁大代表在谁的坐标滑动，也就是判断是上下还是左右，如果absDx大，判断dx的正负，正是向右移动，负是向左移动，
如果是absDy大，判断dy的正负，正是向下移动，负是向上移动。

举个栗子：

![例子](http://7xjufd.dl1.z0.glb.clouddn.com/blog2.2.png)

图中absDx和absDy是dx和dy的绝对值,首先可以判断 absDx < absDy,那么就在上下两个方向做判断，又因为dy是小于0的，所以这个滑动事件就代表着向上滑动。
