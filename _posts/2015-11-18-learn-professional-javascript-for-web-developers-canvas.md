---
layout: post
title: "JavaScript高级程序设计学习笔记：使用 Canvas 绘图"
categories:
- 博客
---

### Canvas是什么

HTML5 新定义了一个标签，就叫做 canvas，这个元素在页面中设定一个区域，然后可以通过 JavaScript 动态地在这个区域中绘制图形，也就是说 canvas 元素只是一个容器，真正实现绘图的是 JavaScript 脚本。 

### Canvas基本使用方法

要使用 canvas 元素，必须先指定绘图区域的大小，即给其设置width和height属性。canvas 的开始和结束标签之间可以写入一些信息，当浏览器不支持 canvas 标签的时候，就会显示这些信息。

```HTML
<canvas id="canvas" width="600" height="600">当前浏览器不支持 canvas 标签</canvas> 
```

要在这块画布上绘图，需要取得绘图上下文，则需要调用getContext()方法并传入上下文的名字，例如传入“2d“，用来获取2D上下文对象，等以后浏览器支持WebGL的时候，就可以传入“3D”来获取3D上下文对象。

```javascript
var canvas = document.getElementById('canvas');
//确定浏览器是否支持canvas
if(canvas.getContext){
  var context = canvas.getContext('2d');  
}
```

当我们绘画完以后，可以使用toDataURL()方法，导出在canvas上绘制的图像，这个方法接受一个参数，即图像的MIME类型格式，这个方法默认返回的是PNG格式，通过对这个编码进行处理，不仅可以将图片显示在页面中，还可以将图片保存到本地。


### 2D上下文

##### 填充和描边

填充，就是用指定的样式填充图形。描边，就是只在图形的边缘画线。分别涉及到两个属性：fillStyle 和 strokeStyle。这两个属性的值可以是字符串、渐变对象或者模式对象，决定了绘制2D图像的边框或者内容的颜色。

```javascript
if (draw.getContext){
     var context = draw.getContext("2d"); 
     context.strokeStyle = "red";
     context.fillStyle = "#0000ff";
}
```

##### 绘制矩形

矩形是唯一一种可以直接在2D上下文中绘制的形状，与之相关的有三个方法。这三个方法都接收4个参数：矩形的x坐标、矩形的y坐标、矩形的宽度、矩形的高度。 

fillRect()：在画布上绘制的矩形会填充指定的颜色，填充的颜色通过fillStyle属性指定。

```javascript
var draw = document.getElementById("draw");
if (draw.getContext){
    var context = draw.getContext("2d");
    //绘制红色矩形，从（10，10）坐标开始绘制矩形，宽高都为50px。
    context.fillStyle = "#ff0000";
    context.fillRect(10, 10, 50, 50);
    //绘制半透明的蓝色矩形，从（30，30）坐标开始绘制矩形，宽高都为50px。
    context.fillStyle = "rgba(0, 0, 255, 0.5)";
    context.fillRect(30, 30, 50, 50);
}  
```

strokeRect()：在画布上绘制的矩形会使用指定的颜色边框，边框颜色通过strokeStyle属性指定。 


```javascript
var draw = document.getElementById("draw");
if (draw.getContext){
    var context = draw.getContext("2d");
    //绘制红色描边矩形，从（10，10）坐标开始绘制矩形，宽高都为50px。
    context.strokeStyle = "#ff0000";
    context.strokeRect(10, 10, 50, 50);
    //绘制半透明的蓝色描边矩形，从（30，30）坐标开始绘制矩形，宽高都为50px。
    context.strokeStyle = "rgba(0, 0, 255, 0.5)";
    context.strokeRect(30, 30, 50, 50);
}  
```

clearRect()：用于清除画布上的矩形区域。 


```javascript
var draw = document.getElementById("draw");
if (draw.getContext){
    var context = draw.getContext("2d");
    //绘制红色矩形，从（10，10）坐标开始绘制矩形，宽高都为50px。
    context.fillStyle = "#ff0000";
    context.fillRect(10, 10, 50, 50);
    //绘制半透明的蓝色矩形，从（30，30）坐标开始绘制矩形，宽高都为50px。
    context.fillStyle = "rgba(0, 0, 255, 0.5)";
    context.fillRect(30, 30, 50, 50);
    //在两个矩形重叠的地方清除一个小矩形。
    context.clearRect(40, 40, 10, 10);
}  
```
描边线条的宽度由lineWidth属性控制，该属性值可以是任意整数。另外，通过lineCap属性可以控制线条末端的形状是平头、圆头还是方头（“butt”、“round”或“square”），通过lineJoin属性可以控制线条相交的方式是圆交、斜交还是斜接（“round”、“bevel”或“miter”）。

##### 绘制路径

2D上下文支持很多在画布上绘制路径的方法。通过路径可以创造出复杂的形状和线条。要绘制路径，必须先调用beginPath()方法，表示要开始绘制新的路径。然后，再通过下列方法来实际地绘制路径。

arc(x, y, radius, startAngle, endAngle, counterclockwise)： 
以(x,y)为圆心绘制一条弧线，弧线半径为radius，起始和结束角度（用弧度表示）分别为startAngle和endAngle。最后一个参数表示startAngle和endAngle是否按逆时针方向计算，值为false表示按顺时针方向计算。

arcTo(x1, y1, x2, y2, radius)： 
从上一点开始绘制一条曲线，到(x2,y2)为止，并且以给定的半径radius穿过(x1,y1)。

bezierCurveTo(c1x, c1y, c2x, c2y, x, y)： 
从上一点开始绘制一条曲线，到(x,y)为止，并且以(c1x,c1y)和(c2x,c2y)为控制点。

lineTo(x, y)：从上一点开始绘制一条直线，到(x,y)为止。 

moveTo(x, y)：将绘图游标移动到(x,y)，不画线。 quadraticCurveTo(cx, cy, x, y)：从上一点开始绘制一条二次曲线，到(x,y)为止，并且以(cx,cy)作为控制点。

rect(x, y, width, height)：从点(x,y)开始绘制一个矩形，宽度和高度分别由width和height指定。这个方法绘制的是矩形路径，而不是strokeRect()和fillRect()所绘制的独立的形状。

创建了路径以后，接下来有几种选择：

* closePath()：绘制一条连接到路径起点的线条。 
* fill()：用fillStyle填充路径。 
* stroke()：用strokeStyle对路径描边。 
* clip()：在路径上创建一个剪切区域。

例如：绘制一个时钟

```javascript
var draw = document.getElementById("draw");
if (draw.getContext){
  var context = draw.getContext("2d");
  //开始路径  
  context.beginPath();
  //绘制外圆
  context.arc(100, 100, 99, 0, 2 * Math.PI, false);
  //绘制内圆
  context.moveTo(194, 100);   //如果没有这句话,则图形将从(200,0)开始绘制内圆
  context.arc(100, 100, 94, 0, 2 * Math.PI, false);
  //绘制分针
  context.moveTo(100, 100);
  context.lineTo(100, 15);
  //绘制时针
  context.moveTo(100, 100);
  context.lineTo(35, 100);
  //描边路径--显示所绘制的钟表
  context.stroke(); 
}
```

![](http://7xjufd.dl1.z0.glb.clouddn.com/1.png)


##### 绘制文本

绘制文本主要有两个方法fillText()和strokeText()，这两个方法都可以接收4个参数：要绘制的文本字符串、x坐标、y坐标和可选的最大像素宽度。并且，这两个方法都以下列3个属性为基础。

* font：表示文本样式、大小及字体，用CSS中指定字体的格式来指定。 
* textAlign：表示文本对齐方式。可能的值有”start”，”end”，”left”，”right”和”center“，建议使用“start”和“end”。 
* textBaseline：表示文本的基线。可能的值有”top”，”hanging”，”middle”，”alphabetic”，”ideographic”和”bottom”。

这几个属性都有默认值，没有必要每次使用都对它们进行赋值。

* fillText()：使用fillStyle属性绘制文本。 
* strokeText()：使用strokeStyle属性为文本描边。 

另外，2D上下文提供了一个辅助确定文本大小的方法measureText()，这个方法接收一个参数，即要绘制的文本，返回一个TextMetrics对象，这个对象有一个width属性。

##### 变换

通过上下文的变换，可以把处理后的图像绘制到画布上。2D上下文支持各种基本的绘制变换。创建绘制上下文时，会以默认值初始化变换矩阵，在默认的变换矩阵下，所有处理都按描述直接绘制。为绘制上下文应用变换，会导致使用不同的变换矩阵应用处理，从而产生不同的结果。 
可以通过如下方法来修改变换矩阵。

rotate(angle)：围绕原点旋转图像angle弧度。

scale(scaleX, scaleY)：缩放图像，在x方向乘以scaleX，在y方向乘以scaleY。scaleX和scaleY的默认值都是1.0。   

translate(x, y)：将坐标原点移动到(x,y)。执行这个变换之后，坐标(0,0)会变成之前由(x,y)表示的点。

transform(m1_1, m1_2, m2_1, m2_2, dx, dy)：直接修改变换矩阵，方式是乘以如下矩阵。   

m1_1  m1_2  dx   
m2_1  m2_2  dy   
0     0     1  

setTransform(m1_1, m1_2, m2_1, m2_2, dx, dy):将变换矩阵重置为默认状态，然后再调用transform()。


```javascript
var draw = document.getElementById("draw");
if (draw.getContext) {
  var context = draw.getContext("2d");
  //开始路径  
  context.beginPath();
  //绘制外圆
  context.arc(100, 100, 99, 0, 2 * Math.PI, false);
  //绘制内圆
  context.moveTo(194, 100);   //如果没有这句话,则图形将从(200,0)开始绘制内圆
  context.arc(100, 100, 94, 0, 2 * Math.PI, false);
  //变换原点
  context.translate(100, 100);
  //旋转表针
  context.rotate(1);
  //绘制分针
  context.moveTo(0, 0);
  context.lineTo(0, -85);
  //绘制时针
  context.moveTo(0, 0);
  context.lineTo(-65, 0);
  context.stroke();
}
```

![](http://7xjufd.dl1.z0.glb.clouddn.com/2.png)


##### 绘制图像

2D绘图上下文内置了对图像的支持。采用drawImage()可以方法可以把图像绘制到画布上。调用这个方法时，可以采用三种不同的参数组合。

* 传入一个HTML的img元素，以及绘制该图像的起点的x和y坐标，还有可选的两个参数，为目标宽度和高度。 
* 通过给drawImage()传入9个参数，来实现把图像中的某个区域绘制到上下文中。9个参数分别为：要绘制的图像，源图像的x坐标、源图像的y坐标、源图像的宽度、源图像的高度、目标图像的x坐标、目标图像的y坐标、目标图像的宽度、目标图像的高度。 
* 传入一个canvas元素作为其第一个参数，把另一个画布内容绘制到当前画布。

##### 阴影

2D上下文会根据以下几个属性的值，自动为形状或路径绘制出阴影。

* shadowColor：用CSS颜色格式表示的阴影颜色， 默认为黑色。 
* shadowOffsetX：形状或路径x轴方向的阴影偏移量，默认为0。 
* shadowOffsetY：形状或路径y轴方向的阴影偏移量，默认为0。 
* shadowBlur：模糊的像素数，默认为0，即不模糊。

这些属性都可以通过context对象来修改。在绘制前为它们设置适当的值，就能自动产生阴影。

```javascript
var context = draw.getContext("2d");
//设置阴影
context.shadowOffsetX = 5;
context.shadowOffsetY = 5;
context.shadowBlur = 4;
context.shadowColor = "rgba(0, 0, 0, 0.5)";
//绘制红色矩形
context.fillStyle = "#ff0000";
context.fillRect(10, 10, 50, 50); 
//绘制蓝色矩形
context.fillStyle = "rgba(0, 0, 255, 1)";
context.fillRect(30, 30, 50, 50);
```

##### 渐变

渐变由CanvasGradient实例表示，调用createLinearGradient()方法，此方法接收4个参数：起点的x坐标，起点的y坐标，终点的x坐标，终点的y坐标。调用这个方法后，它就会创建一个指定大小的渐变，并返回CanvasGradient对象实例。创建了渐变对象后，下一步就是使用addColorStop()方法来指定色标。接收两个参数：色标位置和CSS颜色值。色标位置是一个0(开始的颜色)到1(结束的颜色)之间的数字。

景象渐变（或放射渐变）采用createRedialGradient()方法来创建，接收6个参数，对应着两个圆的圆心和半径。分别是：起点圆的圆心(x, y)及半径，终点圆的圆心(x, y)及半径。

##### 模式

模式其实就是重复的图像，可以用来填充或描边图形。createPattern()：创建一个新模式。接收2个参数：一个HTML的img元素和一个表示如何重复图像的字符串。第二个参数的值与CSS的background-repeat属性值相同，包括“repeat”、“repeat-x”、“repeat-y”和“no-repeat”。第一个参数也可以是一个video元素，或者另一个canvas元素。 

##### 使用图像数据

2D上下文的一个明显长处就是，可以通过getImageData()取得原始图像数据。 
getImageData()：这个方法接收4个参数：要取得其数据的画面区域的x坐标和y坐标，该区域的像素宽度和高度。

```javascript
var imageData = context.getImageData(10, 5, 50, 50);
```

返回的是ImageData()的实例，每个ImageData对象都有三个属性：width、height和data。其中data属性是一个数组，保存着图像中每一个像素的数据。在data数组中，每一个像素用4个元素来保存，分别表示红、绿、蓝和透明度值。因此，第一个像素的数据就保存在数据的第0到第3个元素中。





