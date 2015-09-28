---
layout: post
title: "2048源代码解读（5）"
categories:
- 博客
---
2048源码解读系列最后一篇，我们来解读最重要的 GameManager 部分。

GameManager函数有如下结构：![](http://7xjufd.dl1.z0.glb.clouddn.com/blog5.1.png)


函数输入了size, InputManager, Actuator, StorageManager这四个参数，这都是之前我们解读过的，
参数传入后，size 赋值给当前对象的size，其他三个参数通过new命令调用了构造函数，返回三个实例对象，
初始化tile开始时为2个，绑定inputmanager的move，restart，keepPlaying到当前对象，
最后是重要的setup函数。

##### setup函数

setup函数定义游戏的执行方法，首先从storageManager里获取游戏的状态，如果存在，
把相应的状态信息传入，否则，初始化这些状态信息。然后开始执行游戏：actuate()。

```javascript
GameManager.prototype.setup = function () {
  //取得游戏状态
  var previousState = this.storageManager.getGameState();
  // 如果存在，那么加载之前的游戏。否则初始化游戏的开始状态
  if (previousState) {
    this.grid        = new Grid(previousState.grid.size,
                            previousState.grid.cells); // Reload grid
    this.score       = previousState.score;
    this.over        = previousState.over;
    this.won         = previousState.won;
    this.keepPlaying = previousState.keepPlaying;
    } else {
      this.grid        = new Grid(this.size);
      this.score       = 0;
      this.over        = false;
      this.won         = false;
      this.keepPlaying = false;

      // 添加tile
      this.addStartTiles();
    }
    this.actuate();
  };
```
这里定义了添加初始tile的方法

```javascript
// 设置初始tile开始游戏
GameManager.prototype.addStartTiles = function () {
  for (var i = 0; i < this.startTiles; i++) {
    this.addRandomTile();
  }
};

// 在随机位置添加一个tile，这里给tile添加值用Math.random()的方法，
取得在0~1之间的随机数，如果小于0.9，值为2，否则值为4.
GameManager.prototype.addRandomTile = function () {
  if (this.grid.cellsAvailable()) {
    var value = Math.random() < 0.9 ? 2 : 4;
    var tile = new Tile(this.grid.randomAvailableCell(), value);

    this.grid.insertTile(tile);
  }
};
```

##### move函数

移动行为对应函数，保存当前tile位置，定义了合并行为，如果相邻的两个tile的值存在且相等，
更新成绩位置

```javascript
GameManager.prototype.move = function (direction) {
  // 使用中间变量固定this对象
  var self = this;

  if (this.isGameTerminated()) return;
  // 如果游戏结束，不做任何事情

  var cell, tile;

  var vector     = this.getVector(direction);
  var traversals = this.buildTraversals(vector);
  var moved      = false;

  // 保存当前tile位置并删除合并信息
  this.prepareTiles();

  // 在正确的方向上移动网格和移动的tile
  traversals.x.forEach(function (x) {
    traversals.y.forEach(function (y) {
      cell = { x: x, y: y };
      tile = self.grid.cellContent(cell);

      if (tile) {
        var positions = self.findFarthestPosition(cell, vector);
        var next      = self.grid.cellContent(positions.next);

        // 定义了合并行为，如果相邻的两个tile的值存在且相等，
        先生成新的tile，保存信息，然后删除当前的两个tile
        if (next && next.value === tile.value && !next.mergedFrom) {
          var merged = new Tile(positions.next, tile.value * 2);
          merged.mergedFrom = [tile, next];

          self.grid.insertTile(merged);
          self.grid.removeTile(tile);

          // 更新两个tile位置
          tile.updatePosition(positions.next);

          // 更新成绩
          self.score += merged.value;

          if (merged.value === 2048) self.won = true;
          } else {
            self.moveTile(tile, positions.farthest);
          }

          if (!self.positionsEqual(cell, tile)) {
            moved = true; // tile从原来的cell移动！
          }
        }
    });
  });
```

##### buildTraversals

构建一个以正确的顺序遍历的位置列表，是实行move函数的具体细节

```javascript
GameManager.prototype.buildTraversals = function (vector) {
  var traversals = { x: [], y: [] };

  for (var pos = 0; pos < this.size; pos++) {
    traversals.x.push(pos);
    traversals.y.push(pos);
  }

  // 总是从最远的单元格中选择方向
  if (vector.x === 1) traversals.x = traversals.x.reverse();
  if (vector.y === 1) traversals.y = traversals.y.reverse();

  return traversals;
};
```
##### findFarthestPosition函数

合并动作，合并相同的tile，直到不能合并

```javascript
GameManager.prototype.findFarthestPosition = function (cell, vector) {
  var previous;

  // 朝着矢量方向前进，直到找到一个障碍物
  do {
    previous = cell;
    cell     = { x: previous.x + vector.x, y: previous.y + vector.y };
    } while (this.grid.withinBounds(cell) &&
    this.grid.cellAvailable(cell));

    return {
      farthest: previous,
      next: cell // Used to check if a merge is required  用于检查是否需要合并
    };
  };
```


##### tileMatchesAvailable函数

检查可用的匹配之间的tile

```javascript
GameManager.prototype.tileMatchesAvailable = function () {
  var self = this;

  var tile;

  for (var x = 0; x < this.size; x++) {
    for (var y = 0; y < this.size; y++) {
      tile = this.grid.cellContent({ x: x, y: y });

      if (tile) {
        for (var direction = 0; direction < 4; direction++) {
          var vector = self.getVector(direction);
          var cell   = { x: x + vector.x, y: y + vector.y };

          var other  = self.grid.cellContent(cell);

          if (other && other.value === tile.value) {
            return true; // 返回ture，就可以合并
          }
        }
      }
    }
  }

  return false;// 否则不合并
};
```