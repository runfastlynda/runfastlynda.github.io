---
layout: post
title: "开发一个前端项目的正确预备式"
categories:
- 博客
---
开发一个前端项目，我们需要做些准备，为了快速开始，我们一般会选择一个html标准模板。
### html5标准模板

```html
      <!doctype html>

      <html lang="en">
        <head>
          <meta charset="utf-8">

          <!--要求 IE 遵守现代浏览器的渲染标准-->
          <meta http-equiv="x-ua-compatible" content="ie=edge">

          <title>My Site</title>

          <!--在移动端不允许缩放页面，锁死页面在移动设备显示宽度-->
          <meta name="viewport" content="width=device-width,initial-scale=1">

          <!--引入了 normalize.css, 在默认的HTML元素样式上提供了跨浏览器的高度一致性-->
          <link rel="stylesheet" href="css/normalize.css">

          <!--页面的层叠样式表-->
          <link rel="stylesheet" href="css/main.css">
        </head>
        <body>
          ...
        </body>
      </html>
```
上面提供的html5标准模板包含了3个内容：设置 doctype，设置页面编码，引入css包括具有初始化css。

###### 页面编码

页面编码是在网页中指定其特定的字符编码格式的库，在当前我们定义的标准模板的页面编码为utf-8。

###### 引入css
标准模板最先引入的 Normalize.css 是一种CSS reset的替代方案。
经过@necolas和@jon_neal花了几百个小时来努力研究不同浏览器的默认样式的差异，这个项目终于变成了现在这样。

引入normalize.css有下面这几个目的：

+ 保护有用的浏览器默认样式而不是完全去掉它们
+ 一般化的样式：为大部分HTML元素提供
+ 修复浏览器自身的bug并保证各浏览器的一致性
+ 优化CSS可用性：用一些小技巧
+ 解释代码：用注释和详细的文档来

Normalize.css支持包括手机浏览器在内的超多浏览器，同时对HTML5元素、排版、列表、嵌入的内容、表单和表格都进行了一般化。


### 前端自动化流程 gulp 流程

html标准模板准备好后，我们还需要一个特别好的前端自动化流程工具：gulp。
使用gulp，可以一次性使得页面能够自动刷新，scss自动编译成css等等。
用自动化构建工具把工作中重复的部分集合在一起，使用gulp可以增强工作流程！

###### 安装

+ 全局安装 gulp：

```
      $ npm install --global gulp
```
+ 创建项目文件

```
      mkdir project
```
+ 初始化项目并创建package.json文件

```
      npm init
```
+ 将gulp安装到当前项目下，并作为依赖写入package.json

```
      npm install gulp --save-dev
```

###### 使用

+ 在项目根目录下创建一个名为 gulpfile.js 的文件：

```javascript
var gulp = require('gulp');
//使用require到node_modules中寻找gulp后，赋值给gulp变量

gulp.task('default', function() {
  // 为gulp定义任务，具体内容写到匿名函数中
});
```
>例如：页面自动刷新

>首先我们需要安装Browser Sync:

>```
      $ npm install browser-sync --save-dev
```

>然后配置gulpfile.js文件:

>```
var gulp = require('gulp');
var browserSync = require('browser-sync');
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
  })
}   
gulp.task('watch', ['browserSync'], function (){
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});
```

+ 运行 gulp：


```
      $ gulp task-name
```

自此，我们做的准备差不多完成了，现在就开始开发一个前端项目了！
