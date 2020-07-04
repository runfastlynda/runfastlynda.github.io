---
date: 2016-08-13
title: "dependencies 与 devDependencies 的区别"
categories:
- npm
---

在package.json文件中，有两个参数，分别是：dependencies和devDependencies，当我们使用npm install之后，他们就会自动下载到node_modules文件夹下面。但是他们是怎么来的呢，他们之间又有什么区别呢？ 

在我们要用npm下载某个模块的时候，可以使用

```
–save
–save-dev
```
这两种命令， `--save` 会把对应的模块名添加到dependencies键值数组里，而使用 `--save-dev` 会把对应的模块名添加到devDependencies键值数组里。例如：在我[emoji-menu](https://github.com/lazybios/emoji-menu)项目的package中写的：

```
{
  "name": "emoji-menu",
  "version": "0.0.1",
  "dependencies": {
    "clipboard": "^1.5.10",
    "electron-prebuilt": "^1.2.0",
    "menubar": "^4.1.1",
    "nedb": "^1.8.0"
  },
  "devDependencies": {
    "cz-conventional-changelog": "^1.1.6",
    "electron-packager": "^7.0.3"
  }
}
```

那这二者的区别到底是什么？devDependencies 下列出的模块，是我们开发时用的，比如 gulp，它们不会被部署到生产环境。dependencies 下的模块，则是我们生产环境中需要的依赖。