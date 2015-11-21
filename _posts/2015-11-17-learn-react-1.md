---
layout: post
title: "React 学习笔记(1)"
categories:
- 博客
---

### 使用JSX

JSX 即 JavaScript XML 一种在 React 组件内部构建标签的类 XML 语法。 React 不使用 JSX 也可以工作，但使用 JSX 可以提高组件的可读性。

* 允许使用熟悉的语法来定义HTML元素树
* 提供更加语义化且容易懂的标签
* 程序结构更容易被直观化
* 抽象了react Element的创建过程
* 可以随时掌控HTML标签以及生成这些标签的代码
* 是原生的javascript

不使用JSX创建一个标题的函数调用

```javascript
React.DOM.h1({className: ‘question’},’Question’)
```

使用JSX创建一个标题的函数调用

```javascript
<h1 className=“question”>Question</h1>
```

好处从上面的列子已经可以直接看出了。

JSX 就是为了把 HTML 模板直接嵌入到 JS 代码里面，这样就做到了模板和组件关联，但是 JS 不支持这种包含 HTML 的语法，所以需要通过工具将 JSX 编译输出成 JS 代码才能使用。

### 复合组件

目标：

```html
<div className=“divider”>
	<h2>question</h2><hr />
</div>
```

##### 定义一个自定义组件

将这个HTML片段表示为React Component，先包装，再使用 render 方法中返回这些标签。

```javascript
var Divider = React.createClass({
	render: function(){
		renturn (
			<div className=“divider”>
				<h2>question</h2><hr />
			</div>
		);	
	}
});
```

但这是一个一次性的组件，我们需要使用动态值。

##### 使用动态值

JSX将两个花括号之间的内容{…}渲染为动态值。花括号指明了一个JavaScript 上下文环境，花括号之中放的任何东西会被进行求值，得到的结果被渲染为标签中的若干节点。

```javascript
var text = ‘question’;
<h2>{text}</h2>
```

##### 子元素

React将开始标签与结束标签之间的所有子节点保存在一个名为this.props.children的特殊组件属性中，在上面的例子中，this.props.children == [“question”]。

因此，我们使用下面的代码可以渲染出相同的结果。

```javascript
var Divider = React.createClass({
	render: function(){
		renturn (
			<div className=“divider”>
				<h2>{this.props.children}</h2><hr />
			</div>
		);	
	}
});
```


### JSX与HTML有何不同

##### 条件判断

* 使用三目运算符

```javascript
render: function(){
	renturn (<div className={
		this.status.isComplete ? ‘is-complete’ : ‘ ’
	}>…</div>
	);	
}
```
虽然可以运行，但三目运算有点笨重又麻烦，所以最好使用下面的方法。

* 使用变量

```javascript
getComplete: function( ){
	return this.status.isComplete ? ‘is-complete’ : ‘ ’;
},
render: function( ){
	var isComplete = this.getComplete( );
	return <div className={isComplete}>…</div>
}
```

* 使用函数

```javascript
getComplete: function( ){
	return this.status.isComplete ? ‘is-complete’ : ‘ ’;
},
render: function( ){
	return <div className={this.getComplete}>…</div>
}
```

* 使用&&运算符

```javascript
render: function( ){
	return <div className={his.status.isComplete ? ‘is-complete’ : ‘ ’}>…</div>
}
```

##### 非DOM属性

下面的特殊属性只在 JSX 中存在：

* key

给组件一个独一无二的键，并确保它在一个渲染周期中保持一致，提高渲染性能。

* ref

ref 允许父组件在render方法之外保持对子组件的一个引用。

```javascript
render: function( ){
	return <div>
		<input ref=“myInput” …/>
	</div>;
}
```
然后，你就可以在组件中的任何地方使用this.refs.myInput.getDOMNode( )获取这个应用了。但并不是真的DOM，而是 React 在需要时用来创建DOM的一个描述对象。

* dangerouslySetInnerHTML

设置原始的HTML，当需要将HTML内容设置为字符串，我们需要把字符串设置到一个主键为html_的对象里，像这样：

```javascript
render: function( ){
	var htmlString = {
		__html: “<span>an html string</span>”
}
return <div dangerouslySetInnerHTML={htmlString} ></div>;}
```

##### 事件

React 自动绑定了组件所以方法的作用域，因此你永远都不需要手动绑定。

```javascript
handleClick：function(event){…},
render: function( ){
	return <div onClick={this.handleClick} >…</div>;
}
```

##### 注释

* 作为子节点，只需要括在花括号中，并且可以跨越多行。

```javascript
{/*a comment about this*/}
```

* 作为内联属性

```javascript
/*多行注释使用这个*/
//单行注释使用这个
```

##### 样式

React 把所有的内联样式都规范化为驼峰形式，与javascript中DOM 的style 属性一致。

要添加一个自定义的样式属性，只需要把驼峰形式的属性名及期望的 CSS 值拼装为对象即可。

```javascript
var styles = {
borderColor: ‘#999’,
}
React.renderComponent(<div style={styles}>…</div>, node);
```




