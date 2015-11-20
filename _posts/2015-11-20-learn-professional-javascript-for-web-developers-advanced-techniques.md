---
layout: post
title: "JavaScript高级程序设计学习笔记：高级技巧"
categories:
- 博客
---

### 高级函数

##### 安全的类型检测

javascript内置的类型检测机制并非完全可靠，例如：typeof有时返回值不合理，比如RegExp对象返回object，instanceof在页面有多个frame时用不了，来自不同frame的对象instanceof返回false。

解决方法：可以用下面的代码来做类型检查。

```javascript
Object.prototype.toString.call(value) === ‘[object Array/Function...]
```
这一技巧也可以用来区分某个值是原生JSON对象还是自定义JSON对象，例如：

```
[object JSON]//原生JSON对象
[object Object]//自定义JSON对象
```
##### 作用域安全的构造函数

当我们直接调用构造函数而不使用new操作符时，由于this对象的晚绑定，它将映射在全局对象window上，导致对象属性错误增加到全局对象window上。 

```javascript
function Person(name,age,job){ 
this.name = name; 
this.age = age; 
this.job = job; 
} 
var person = Person("Jay",29,"singer"); //属性增加到window对象上。 
alert(window.name); //Jay
```
为了避免污染全局作用域，可以用如下构造函数：

```javascript
//作用域安全的构造函数
function Student(name){
  if(this instanceof Student){
    this.name = name;
  }
  else{
    return new Student(name);
  }
}
```
上述作用域安全的构造函数，如果使用构造函数窃取模式的继承且不使用原型链，那么这个继承很可能被破坏。如果构造函数窃取结合使用原型链或者寄生式组合则可以解决这个问题。 

```javascript
function Polygon(side){ 
  if(this instanceof Polygon){ 
    this.sides = sides; 
    this.getArea = function{return 0;}; 
  }else{ 
    return new Polygon(sides); 
  } 
} 
function Rectangle(width,height){ 
  Polygon.call(this,2); 
  this.width = width; 
  this.height = height; 
  this.getArea = function(){ 
    return this.width * this.height; 
  }; 
}
Rectangle.prototype = new Polygon();//这才是重要的一句 
var rect = new Rectangle(5,10); 
alert(rect.sides); //2 
```
##### 惰性载入函数 

惰性载入表示函数执行的分支仅会发生一次，有两种实现惰性载入的方式。

第一种：既第一次调用的时候。在第一次调用的过程中，该函数会被覆盖为另一个按合适方式执行的函数，这样任何对原函数的调用都不用再经过执行的分支了。要执行的适当代码只有当实际调用函数时才进行。尽管第一次调用该函数会因额外的第二个函数调用而稍微慢点，但后续的调用都会很快，因避免了多重条件。 

```javascript
function detect(){
  if(...){
    creatXHR = function(){
      //
    }
  }
  else if(...){
    creatXHR = function(){
      //
    }
  }
  else...
}
```

第二种：可以用匿名函数立即执行并返回匿名函数来实现惰性载入，例如：

```javascript
var creatXHR = (function(){
  if(...){
    return function(){
      //
    }
  }
  else if(...){
    return function(){
      //
    }
  }
  else...
})();
```
第二种方式在第一次调用时不会损失性能，因为把时耗放到了第一次载入代码时。

##### 函数绑定（指定执行环境）

函数绑定要创建一个函数，可以在特定环境中以指定参数调用另一个函数。一个简单的bind()函数接受一个函数和一个环境，并返回一个在给定环境中调用给定函数的函数，并且将所有参数原封不动传递过去。 

```javascript
function bind(fun, context){
  return function(){
    return fun.apply(context, arguments);
  }
}
```
被绑定函数与普通函数相比有更多的开销——它们需要更多内存，同时也因为多重函数调用而稍微慢一点——所以最好只在必要时使用。

##### 函数柯里化 

用于创建已经设置好了一个或多个参数的函数。函数柯里化的基本方法和函数绑定是一样的：使用一个闭包返回一个函数。两者的区别在于，当函数被调用时，返回函数还需要设置一些传入的参数。

创建柯里化函数的通用方式：

```javascript
function curry(fun){
  var args = Array.prototype.slice.call(arguments, 1);//去掉第一个参数fun，得到给定的参数值
  return function(){
    var innerArgs = Array.prototype.slice.call(arguments);//把内部arguments对象转换为数组（为了用concat方法）
    var finalArgs = args.concat(innerArgs);//拼接参数列表
    return fun.apply(null, finalArgs);//把拼接的参数列表传给fun
  }
}
```
或者增强bind方法实现柯里化：

```javascript
function bind(fun, context){
  var args = Array.prototype.slice.call(arguments, 2);//去掉前2个参数
  return function(){
    var innerArgs = Array.prototype.slice.call(arguments);//同curry
    var finalArgs = args.concat(innerArgs);//同curry
    return fun.apply(context, finalArgs);//指定执行环境和参数
  }
}
```
### 防篡改对象

##### 不可扩展对象

不可扩展对象就是不能添加新属性，这里使用Object.preventExtensions()方法。

```javascript
var obj = {a : 1, b : 2};
alert(Object.isExtensible(obj));//true
Object.preventExtensions(obj);//把obj设置为不可扩展
alert(Object.isExtensible(obj));//false
obj.c = 3;
alert(obj.c);//undefined
```
设置不可扩展操作无法撤销（改不回来），设置之后无法添加新属性，但可以修改/删除原有属性

##### 密封对象

密封对象就是只能修改现有属性，无法删除或添加，这里使用Object.seal()方法。

```javascript
var obj = {a : 1, b : 2};
Object.seal(obj);//设置密封对象
alert(Object.isSealed(obj));//true
obj.c = 3;
alert(obj.c);//undefined
delete obj.a;//严格模式下报错
alert(obj.a);//1
```
##### 冻结对象

冻结对象就是属性只读，访问器属性可写，这种我们使用Object.freeze()方法。

```javascript
var obj = {a : 1, b : 2};
Object.freeze(obj);//设置密封对象
alert(Object.isFrozen(obj));//true
obj.a = 3;
alert(obj.a);//1
```

### 高级定时器 

JavaScript是单线程程序，定时器队列的工作方式是，当特定时间过去后将代码插入。注意，给队列添加代码并不意味着对它立刻执行，只能表示它会尽快执行。设定一个150ms后执行的定时器不代表到了150ms代码就立刻执行，它表示代码会在150ms后被加入到队列中。如果在这个时间上，队列中没有其他东西，这段代码就会被执行，表明看上去好像代码就在精确指定时间上执行。

##### 重复的定时器 

使用setInterval()创建定时器确保了定时器代码规则地插入队列中。使用setInterval()时，仅当没有定时器的任何其他代码实例时，才将定时器代码添加到队列中。这种重复定时器的规则有2点问题：某些间隔会被跳过；多个定时器的代码执行之间的间隔可能会比预期的小。这也是使用 setInterval的弊端。为此，使用setTimeout才能更好的避免这个问题，在代码本身中执行完毕了，再通过setTimeout来重新设定定时器，把代码加入到执行队列。

```javascript
setTimeout(function(){ 
  //处理 
  if(condition){ 
  setTimeout(arguments.callee, interval); 
  } 
},interval); 
```
每次函数执行时都会创建一个新定时器，第二个setTimeout()调用使用了arguments.callee来获取当前执行的函数的引用，并为其设置拎一个定时器。这样的好处是，在前一个定时器代码执行完之前，不会向队列插入新的定时器代码，确保不会有任何缺失的间隔，避免连续的运行。

#####  Yielding Processes

JavaScript有一个限制是长时间运行脚本的制约：如代码运行超过特定的时间或特定的语句数量就不会让它继续执行。当某个函数要花200ms以上的事件完成，最好分割为一系列可以使用定时器的小任务。

数组分块技术：为要处理的项目创建一个队列，然后使用定时器取出下一个要处理的项目进行处理，接着再设置另一个定时器。

```javascript
function chunk(array, process, context){ 
  setTimeout(function(){ 
  var item = array.shift(); 
  process.call(context,item); 
    if(array.length>0){ 
    setTimeout(arguments.callee, 100); 
    } 
  } 
} 
```

##### 函数节流

DOM操作比起非DOM交互需要更多内存和CPU时间。连续尝试进行过多的DOM相关操作可能会导致浏览器挂起，有时甚至崩溃。函数节流思想：某些代码不可以在没有间断的情况连续重复执行。

```javascript
var processor = { 
  timeoutId : null, 
  //实际进行处理的方法 
  performProcessing : function(){ 
  //实际执行的方法 
  }, 
  //初始处理调用的方法 
  process : function(){ 
    clearTimeout(this.timeoutId); 
    var that = this; 
    this.timeoutId = setTimeout(function(){ 
      that.performProcessing(); 
    },100); 
  } 
}; 
//尝试开始执行 
Processor.process(); 
```

简化模式 

```javascript
function throttle(method,context){ 
  clearTimeout(mehtod.tId); 
  mehtod.tId = setTimeout(function(){ 
    method.call(context); 
  },100); 
} 
```

### 自定义事件

事件是一种叫做观察者的设计模式，这是一种创建松散耦合代码的技术。对象可以发布事件，用来表示该对象生命周期中某个有趣的时刻到了。其他对象可以观察该对象，等待有趣的时刻到来并通过运行代码来响应。 

观察者模式由两类对象组成：主体和观察者。主体负责发布事件，同时观察者通过订阅这些事件来观察主体。主体并不知道观察者的任何事情，它可以独立自存在并正常运作即使观察者不在。 

事件是与DOM交互的最常见的方式，但他们也可以用于非DOM代码中——通过实现自定义事件：创建一个管理事件的对象，让其他对象监听那些事件。实现此功能的基本模式可以如下定义：

```javascript
function EventTarget(){
  this.handlers = {};    
}
EventTarget.prototype = {
  constructor: EventTarget,
  addHandler: function(type, handler){
    if (typeof this.handlers[type] == "undefined"){
      this.handlers[type] = [];
    }
    this.handlers[type].push(handler);
  },
  fire: function(event){
    if (!event.target){
      event.target = this;
    }
    if (this.handlers[event.type] instanceof Array){
      var handlers = this.handlers[event.type];
      for (var i=0, len=handlers.length; i < len; i++){
        handlers[i](event);
      }
    }
  },
  removeHandler: function(type, handler){
    if (this.handlers[type] instanceof Array){
      var handlers = this.handlers[type];
      for (var i=0, len=handlers.length; i < len; i++){
        if (handlers[i] === handler){
          break;
        }
      }
      handlers.splice(i, 1);
    }
  }
};
```
那么上面定义的EventTarget类型的自定义事件的用法如下：

```javascript
function handleMessage(event){
  alert("Message received: " + event.message);
}
//创建新对象
var target = new EventTarget();
//添加事件处理器
target.addHandler("message", handleMessage);
//触发事件
target.fire({ type: "message", message: "Hello world!"});
//删除事件处理器
target.removeHandler("message", handleMessage);
//再次触发事件，应该没有事件处理器
target.fire({ type: "message", message: "Hello world!"});
```
addHandler() 注册给定类型事件的事件处理程序，接收两个参数：事件类型和事件处理程序；fire() 触发一个事件，接收一个参数，一个至少包含type属性的对象；removeHandler() 注销某个事件类型的事件处理程序，接收两个参数：事件类型和事件处理程序。
