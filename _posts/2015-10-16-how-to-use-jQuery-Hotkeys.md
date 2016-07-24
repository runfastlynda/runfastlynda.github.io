---
layout: post
title:  "jQuery插件:jQuery Hotkeys"
date:   2015-10-15 18:28:16
categories:
- jquery
---

[jQuery Hotkeys](https://github.com/tzuryby/jquery.hotkeys)是一个jQuery插件，这个jQuery插件能够帮助你快速创建键盘触发事件。并且它支持任意组合键。

### 使用方法：

首先在页面中引入jquery.js和jquery.hotkeys.js。

jquery可以使用公共库引入，获取jquery.hotkeys.js可以克隆jQuery Hotkeys这个项目，顺便也可以看看作者给的demo页面。

```
git clone https://github.com/tzuryby/jquery.hotkeys.git
```

然后使用如下格式的语句：

```javascript
$(expression).bind(types.keys, handler);
$(expression).unbind(types.keys, handler);
```
bind添加事件，unbind移除事件。

这里Types包括如下属性 keydown，keyup，keypress。

示范：

```javascript
$(document).bind('keydown.a', function(){
	alert(‘Hello’);
});
```

### 注意：

+ 如果你想给组合键添加绑定事件(如Ctrl + Alt + Z )，你应该用字母的顺序来给他们进行排列，例如定义它们为：alt_ctrl_z。

+ 所有具有特殊意义的正则表达式的按键(`\` `+` `*` `?` `^` `$` `[]` `( )` `{ }` `/` `’` `＃` )和`.`按键是无法绑定事件的。

例如：
```javascript
// won't work
$('#foo').unbind('keyup.$');
$('#foo').unbind('keyup.+');
```
