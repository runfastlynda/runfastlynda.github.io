---
layout: post
title: "如何写一个 Chrome 扩展应用"
categories:
- chrome
---

### 动手之前的有用信息 

##### Chrome 扩展应用由哪几部分组成？

Chrome 扩展应用本质上来说是一个 web 页面，扩展文件以 .crx 为后缀名，解压后的扩展应用都应该包含下面的文件：

* 一个manifest文件
* 一个或多个html文件
* 可选的一个或多个javascript文件
* 可选的任何需要的其他文件，例如图片

##### 扩展应用的界面

很多应用会以 browser action 或 page action 的形式在浏览器界面上展现出来。每个应用最多可以有一个 browser action 或 page action。当应用的图标是否显示出来是取决于单个的页面时，应当选择 page action；当其它情况时可以选择 browser action。
![](http://7xjufd.dl1.z0.glb.clouddn.com/Screen%20Shot%202016-01-07%20at%2011.06.16%20PM.png)
browser action
![](http://7xjufd.dl1.z0.glb.clouddn.com/Screen%20Shot%202016-01-07%20at%2010.29.23%20PM.png)
page action

##### popup 弹出窗口

popup 属于 Browser Actions，当点击图标时出现这个窗口，可以放置任何 HTML 元素，它的宽度是自适应的。

如下图中是 Google 翻译的popup窗口：

![](http://7xjufd.dl1.z0.glb.clouddn.com/Screen%20Shot%202016-01-07%20at%2011.07.09%20PM.png)

##### Background Pages 后台页面

绝大多数应用都包含一个背景页面( background page )，用来执行应用的主要功能。但是这个窗口不会显示，它是扩展程序的后台服务，它会一直保持运行。比如在一些需要数据保存程序中，如果当前用户关闭popup，就需要 Background Pages 来进行相应的操作。

### 自己动手写一个 Chrome 扩展应用

##### 第一步：建立 manifest.json 文件

manifest.json 是元数据文件，这里面包含着扩展应用的名称，描述，版本号等属性。例如：

```json
{
"name": "My Extension",
"version": "2.1",
"description": "This is a test",
"browser_action": {
    "default_title": "test",
    "default_icon": "icon.png",
    "default_popup": "popup.html"
  }
}
```
其中 name 代表应用程序名，version 代表版本号，description 代表功能描述。browser_action 代表扩展图标段显示，它会定义图标地址(需要在文件夹中添加)、标题（也就是鼠标悬停提示）和默认的 popup 页面。我们这里定义的 popup 页面为 popup.html。

##### 第二步：定义 popup.html

接下来开始定义 popup.html 显示，它不需要使用 html、head 和 body 标签，可以直接写上样式、脚本和 html。例如：

```html
<style type="text/css">
*{
  margin:0;padding:0;
}
</style>
<div>test</div>
```

### 调试

第二步做完就是一个简单的 Chrome 扩展应用。此时，在 Chrome 中输入 chrome://settings/extensions 打开插件页，先勾选开发者模式，这样会出现一个载入插件的选项，如下图：

点击载入插件后，在路径中找到保存文件的文件夹然后打开就行了，如果顺利的打开，就说明你的插件没有任何问题，如果错误的话，他会提示你在哪里错了，然后按照他的提示修改就行了。

##### 发布

制作好后，要想发布需要提交给 Google 进行审核，[提交地址](https://chrome.google.com/webstore/developer/update) 注意要压缩成zip格式后提交，不要用.crx格式。上传后，填写相关信息，然后就是等待审核上线。

到此一个简单的 Chrome 扩展应用就完成了，当然它可以做的更多，其他的参数建议大家查看 Google 的官方文档。
