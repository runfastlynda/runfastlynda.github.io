---
layout: post
title: "2048源代码解读（1）"
categories:
- 博客
---


源于参加百度ife训练营，我需要设计一个2048的小游戏，就像这样的：

![2048游戏截图](http://7xjufd.dl1.z0.glb.clouddn.com/blog1.1.png)

有趣的是2048的作者将源码开放，最终在github里得到了项目的源代码，此时萌发了阅读源码的想法，说做就做，下面就是我的笔记了！

###分析2048代码结构

使用 `“git clone https://github.com/gabrielecirulli/2048.git”` 下载到源码。

接着在terminal中使用 `“tree .”`命令

![tree结构](http://7xjufd.dl1.z0.glb.clouddn.com/blog1.2.png)

继续用`“cloc .”`命令统计代码行数

![cloc代码分析](http://7xjufd.dl1.z0.glb.clouddn.com/blog1.3.png)

代码包含了基本的html，负责样式的css和scss，和js文件。

### JS文件

2048中看代码量也知道这里js文件的重要性，阅读源码还是从这里下手。

+ application.js

这里是一个总控制javascript文件，通过调用GameManager构造函数，来定义一个实例对象，并且输入四个参数。


	new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
	

读上面的代码其实也说明白了这个游戏重要的javascript有哪些，也就是GameManager和输入的参数了。这里的GameManager在game_manager.js这个文件中有定义，输入的参数size=4, 而KeyboardInputManager, HTMLActuator,LocalStorageManager这三个参数分别在KeyboardInputManager.js，html_actuator.js，local_storage_manager.js的javascript文件中有定义，后续我们一一介绍。

+ game_manager.js

主要是游戏的管理，包括开始玩的方法，添加tile（页面上动态实现的数字盒子）的方法，移动的方法，游戏结束的判断等等。

+ local_storage_manager.js

页面中有计分这样的功能，而这个文件主管数据存储，包括当前位置的数据和tile值的数据，分数保存。

+ html_actuator.js

主管绘图和dom操作。

+ grid.js和tile.js

生成grid，随机选取位置。

+ KeyboardInputManager.js

键盘输入控制，移动端滑动手势控制，各个按钮控制

+ bind_polyfill.js，animframe_polyfill.js，classlist_polyfill.js

带有polyfill后缀的文件通过查询，发现都是为了解决某些浏览器的兼容问题的补丁或者变通方法。现在我们主要关注游戏的业务逻辑以及javascript的一些基础问题，毕竟小白嘛~^_^~
