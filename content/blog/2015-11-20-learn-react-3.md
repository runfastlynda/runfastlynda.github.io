---
date: 2015-11-20
title: "React 学习笔记(3)"
categories:
- react
---

### DOM操作

在某些情况下，为了实现某些需求就不得不去操作底层DOM，最常见的场景包括：需要与一个没有使用React的第三方类库进行整合，或者执行一个React没有原生支持的操作。为了使得这些操作变得容易，React提供了一个可用于处理受其自身控制的DOM节点的方法。

##### 访问受控的DOM节点

通过为子组件添加一个ref属性，来实现访问负责控制这些DOM的组件。

```javascript
var DooleArea = React.createClass({
	render: function(){
		return <canvas ref="mainCanvas" />;
	}
})
```

这样，你就可以通过this.refs.mainCanvas访问到canvas组件。你必须保证赋予每个子组件的ref值在所有子组件中是唯一的。一旦你访问到上面的组件，可以通过它的getDOMNode()方法访问到底层的DOM节点。但不许在render方法中这样做，你需要直到组件被挂载你才能去调用getDOMNode()方法——此时，componentDidMount事件处理器将会被触发。但componentDidMount事件处理器内部不是getDOMNode()方法唯一的执行环境。事件处理器也可以在组件挂载后触发，所以也可以在事件处理器中调用getDOMNode。注意：请在常规技术无法完成时考虑上面的方法。

##### 整合非React类库

有很多好用的JavaScript类库并没有使用React构建。一些类库不需要访问DOM（比如日期和时间操作库），但如果需要使用它们，保持它们的状态和React的状态之间的同步是成功整合的关键。

整合它们需要添加componentDidMount事件处理器，它可以通过ref=“autocompleteTarget”的autocompleteTarget指向子组件的底层DOM节点来连接这两个接口。

### 表单

##### 无约束的组件

在HTML中，表单组件与React组件的行为不一致，给定HTML的input一个值，这个input的值仍然是可以改变的，这正是无约束组件名称的由来，因为表单组件的值是不受React组件控制的。一个无约束组件没有太多用处，此时需要给input添加一个ref属性，以访问DOM节点的值。

ref是一个不属于DOM属性的特殊属性，用来标记DOM节点，可以通过this的上下文访问这个节点，this.refs。

无约束组件可以用在基本的无须任何验证或者输入控制的表单中。

##### 约束组件

约束组件的模式与React其他类型组件的模式一致。表单组件的状态交由React组件控制，状态值被存储在React组件的state中。如果想更好的控制表单组件，推荐使用约束组件。

在约束组件中输入框的值是由父组件设置的。好处是可以在用户输入数据时更新state。

```javascript
var MyForm = React.creatClass({
	getInitialState: function(){
		return {
			hello,world
		};
	},
	submitHandler: function(event){
		event.preventDefault();
		alert(this.state.helloTo);
	},
	handleChange: function(event){
		this.setState({
			helloTo: event.target.value
		});
	},
	render: function(){
		return(
			<form onSubmit={this.submitHandler}>
				<input type="text" value={this.state.helloTo}
					onChange={this.handleChange}/>
			</form>
		);
	}
});
```

##### 表单事件

React支持所有HTML事件。这些事件遵循驼峰命名的约定，且会被转成合成事件。所有合成事件都提供了event.target来访问触发事件的DOM节点。

在javascript中class和for是保留字，所以在React中，与class变成了className类似，for变成htmlFor。

##### 文本框和Select

React对textarea和select的接口做了一些修改，提升了一致性。textarea被改的更像input了，允许我们设置value和defaultValue。

```javascript
//非约束的
<textarea defaultValue="Hello World" />
//约束的
<textarea value={this.state.helloTo} onChange={this.handleChange} />
```
select现在接受value和defaultValue来设置已选项，我们可以更容易的对它的值进行操作。

```javascript
//非约束的
<select defaultValue="B">
	<option value="A">1</option>
	<option value="B">2</option>
	<option value="C">3</option>
</select>
//约束的
<select value={this.state.helloTo} onChange={this.handleChange}>
	<option value="A">1</option>
	<option value="B">2</option>
	<option value="C">3</option>
</select>
```
当使用可多选的select时，select组件的值在选项被选择时不会更新，只有选项的selected属性会发生变化。你可以使用ref或者syntheticEvent.target来访问选项，检查他们是否被选中。

下面的例子中，handleChange循环检查DOM，并过滤出哪些选项被选中了。

```javascript
var MyForm = React.creatClass({
	getInitialState: function(){
		return {
			option: ["B"]
		};
	},
	handleChange: function(event){
		var checked = [];
		var sel = event.target;
		for (var i = 0; i < sel.length; i++){
			var option = sel.options[i];
			if (option.selected){
				checked.push(option.value);
			}
		}
		this.setState({
			option: checked
		});
	},
	submitHandler: function(event){
		event.preventDefault();
		alert(this.state.options);
	},
	render:function(){
		return(
			<form onSubmit={this.submitHandler}>
				<select multiple="true" value={this.state.options}
				onChange={this.handleChange}>
					<option value="A">1</option>
					<option value="B">2</option>
					<option value="C">3</option>
				</select>
				<br />
				<button type="submit">speak</button>
			</form>
		);
	}
});
```
##### 单选框和复选框

单选框和复选框使用的则是另外一种完全不同的控制方式。

在HTML中，类型为checkbox或radio的input与类型为text的input的行为完全不一样。通常，单选框和复选框的值是不变的，只有checked状态会变化。所以要控制单选框和复选框，就要控制他们的checked属性。

```javascript
//非约束的
var MyForm = React.createClass({
	submitHandler: function(event){
		event.preventDefault();
		alert(this.refs.checked.getDOMNode().checked);
	},
	render: function(){
		return (
			<form onSubmit={this.submitHandler}>
				<input ref="checked" type="checkbox" value="A" defaultChecked="true" />
				<br />
				<button type="submit">speak</button>
			</form>
		);
	}
});

//约束的
var MyForm = React.createClass({
	getInitialState: function(){
		return {
			checked: true
		};
	},
	handleChange: function(event){
		this.setState({
			checked: event.target.checked
		});
	},
	submitHandler: function(event){
		event.preventDefault();
		alert(this.state.checked);
	},
	render: function(){
		return (
			<form onSubmit={this.submitHandler}>
				<input type="checkbox" value="A" checked={this.state.checked} onChange={this.handleChange} />
				<br/>
				<button type="submit">speak</button>
			</form>
		);
	}
});
```

##### 表单元素的name属性

在React中，name属性对于表单元素来说并没有那么重要。因为约束表单组件已经把值存储到了state中，并且表单的提交事件也会被拦截。在获取表单值的时候，name属性并不是必需的。对于非约束的表单组件来说，也可以使用refs来直接访问表单元素。虽然如此，name仍然是表单组件中非常重要的一部分。

* name属性可以让第三方表单序列化类库在React中正常工作。
* 对于任然使用传统提交方式的表单来说，name属性是必需的。
* 在用户的浏览器中，name被用在自动填写常用信息中，比如用户地址等。
* 对于非约束的单选框组件来讲，name是有必要得，它可作为这些组件分组的依据。确保在同一时刻，同一表单中拥有同样name的单选框只有一个可以被选中。如果不使用name属性，这一行为可以使用约束的单选框实现。

##### Focus

因为React的表单并不总是在浏览器加载时被渲染的，所以表单的输入域的自动聚焦操作起来有点不一样。React实现了autoFocus属性，因此在组件第一次挂载时，如果没有其他的表单域聚焦时，React就会把焦点放在这个组件对应的表单域中。

```javascript
<input type="text" name="given_name" autoFocus="true" />
```
还有一种方法就是调用DOCNode的focus()方法，手动设置表单域聚焦。





