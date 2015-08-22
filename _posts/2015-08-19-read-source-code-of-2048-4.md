---
layout: post
title: "2048源代码解读（4）"
categories:
- 博客
---
已经阅读完[local_storage_manager.js](http://runfastlynda.com/2048-local-storage-manager/)和[keyboard_input_manager.js](http://runfastlynda.com/2048-input-mannager/)，这次阅读 html_actuator.js。

HTMLActuator函数有如下结构：![](http://7xjufd.dl1.z0.glb.clouddn.com/blog4.1.png)


在函数的最开始获取了tile-container，score-container，best-container，game-message的dom节点。

在HTMLActuator的原型链上定义了actuate方法，值得注意的是这个函数的第一句运用中间变量，固定this的确切指向，确定执行的作用域。防止函数内部的多层this导致this的指向是不确定的。

紧接着window.requestAnimationFrame()这个方法是用来在页面重绘之前，通知浏览器调用接受的函数。

    HTMLActuator.prototype.actuate = function (grid, metadata) {
      var self = this;
      window.requestAnimationFrame(function () {
        self.clearContainer(self.tileContainer);

        //遍历cells，如果存在cell，就添加tile
        grid.cells.forEach(function (column) {
          column.forEach(function (cell) {
            if (cell) {
              self.addTile(cell);
            }
          });
        });

        //更新分数
        self.updateScore(metadata.score);
        self.updateBestScore(metadata.bestScore);

        //判断游戏的输赢
        if (metadata.terminated) {
          if (metadata.over) {
            self.message(false); // You lose
          } else if (metadata.won) {
            self.message(true); // You win!
          }
        }
      });
    };

clearContainer方法，addTile方法，updateScore方法，updateBestScore方法，message方法我们在原型链上都可以找到。

比较重要的是在HTMLActuator原型链上定义的addTile方法。

    HTMLActuator.prototype.addTile = function (tile) {
      var self = this;

      var wrapper   = document.createElement("div");
      var inner     = document.createElement("div");
      var position  = tile.previousPosition || { x: tile.x, y: tile.y };
      var positionClass = this.positionClass(position);
      var classes = ["tile", "tile-" + tile.value, positionClass];

      if (tile.value > 2048) classes.push("tile-super");

      this.applyClasses(wrapper, classes);

      inner.classList.add("tile-inner");
      inner.textContent = tile.value;


      if (tile.previousPosition) {
        //确保tile在先前的位置上呈现
        window.requestAnimationFrame(function () {
          classes[2] = self.positionClass({ x: tile.x, y: tile.y });
          self.applyClasses(wrapper, classes);
          //更新位置
        });
      } else if (tile.mergedFrom) {
        classes.push("tile-merged");
        this.applyClasses(wrapper, classes);
        //通过移动，有合并情况，合并后的tile
        tile.mergedFrom.forEach(function (merged) {
          self.addTile(merged);
        });
      } else {
        // 什么都没有的添加一个新的tile
        classes.push("tile-new");
        this.applyClasses(wrapper, classes);
      }

      // 把inner盒子添加wrapper盒子中
      wrapper.appendChild(inner);

      // 把wrapper放到tileContainer这个盒子里
      this.tileContainer.appendChild(wrapper);
    };


这里还定义了更新分数的方法，先把新的成绩更新，然后又给加分这一行为添加了动画

    HTMLActuator.prototype.updateScore = function (score) {
      this.clearContainer(this.scoreContainer);

      var difference = score - this.score;
      this.score = score;

      this.scoreContainer.textContent = this.score;

      //定义了分数更新的动画
      if (difference > 0) {
        var addition = document.createElement("div");
        addition.classList.add("score-addition");
        addition.textContent = "+" + difference;

        this.scoreContainer.appendChild(addition);
      }
    };


其他方法：

* 继续游戏
HTMLActuator.prototype.continueGame
* 清除盒子
HTMLActuator.prototype.clearContainer
* 应用css样式
HTMLActuator.prototype.applyClasses
* 获取位置
HTMLActuator.prototype.normalizePosition
* 利用位置确定css样式
HTMLActuator.prototype.positionClass
* 更新最好的成绩
HTMLActuator.prototype.updateBestScore
* 游戏结束时弹出的信息
HTMLActuator.prototype.message
* 继续游戏时弹出信息清除掉
HTMLActuator.prototype.clearMessage
