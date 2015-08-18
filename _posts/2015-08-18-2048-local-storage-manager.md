---
layout: post
title: "2048源代码解读（3）"
categories:
- 博客
---
[前面一篇](http://runfastlynda.com/2048-input-mannager/)已经介绍了input_mannager.js那一部分的代码，接着想了解游戏中的状态数据是怎么存储和调用的，所以来阅读local_storage_manager.js。

local_storage_manager.js包括两个部分：window.fakeStorage和LocalStorageManager函数。查看到前者在LocalStorageManager函数中有调用，所以决定先阅读LocalStorageManager。

LocalStorageManager函数有如下结构：
![](http://7xjufd.dl1.z0.glb.clouddn.com/blog3.1.png)

在LocalStorageManager函数中先把 bestScoreKey和gameStateKey的键赋为bestScore 与gameState，然后使用三目运算给 storage 赋值。

    function LocalStorageManager() {
    this.bestScoreKey     = "bestScore";
    this.gameStateKey     = "gameState";

    var supported = this.localStorageSupported();
    this.storage = supported ? window.localStorage : window.fakeStorage;
    }

    //对supported进行判断（supported下面有定义），返回true使用window.localStorage，否则使用window.fakeStorage。

这里涉及了supported与window.fakeStorage。下文一一介绍。

通过查找方法在原型链找到了this.localStorageSupported的定义（也就是上文的supported），用途是为了测试浏览器是否支持window.localStorage。

    LocalStorageManager.prototype. localStorageSupported= function () {
        var testKey = "test";
        var storage = window.localStorage;
        try {
          storage.setItem(testKey, "1");
          storage.removeItem(testKey);
          return true;
          } catch (error) {
            return false;
          }

使用try..catch语句测试storage.setItem和storage.removeItem，来确保浏览器支持window.localStorage，执行成功返回true，否则执行catch里面的语句返回false。

fakeStorage就是作者自己写的一个localStorage的替代方法，也定义了setItem方法，getItem方法和removeItem方法。

    window.fakeStorage = {
        _data: {},

        setItem: function (id, val) {
          return this._data[id] = String(val);
        },

        getItem: function (id) {
          return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
        },

        removeItem: function (id) {
          return delete this._data[id];
        },

        clear: function () {
          return this._data = {};
        }
      };


最后使用了 JSON.parse()和JSON.stringify()。

JSON.parse() 方法将JSON 字符串解析成为 JavaScript 中对应的基本数据类型。

JSON.stringify() 方法将任意JavaScript 对应的基本数据类型序列化成 JSON 字符串。



      LocalStorageManager.prototype.getGameState = function () {
        var stateJSON = this.storage.getItem(this.gameStateKey);
        return stateJSON ? JSON.parse(stateJSON) : null;
      };


      LocalStorageManager.prototype.setGameState = function (gameState) {
        this.storage.setItem(this.gameStateKey, JSON.stringify(gameState));
      };


阅读完local_storage_manager.js，了解其不仅保存了分数，还保存了游戏状态。由此local_storage_manager.js会被经常调用，罗列一下调用情况：

game_manager.js中调用过

* LocalStorageManager.getBestScore
* LocalStorageManager.setBestScore
* LocalStorageManager.setGameState
* LocalStorageManager.clearGameState
* LocalStorageManager.setBestScore

grid.js调用

* LocalStorageManager.setBestScore
