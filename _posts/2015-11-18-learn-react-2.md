---
layout: post
title: "React 学习笔记(2)"
categories:
- 博客
---

### 组件的生命周期

React 为每个组件提供了生命周期钩子函数去相应不同的时刻——创建时、存在期及销毁时。

##### 实例化

一个实例初次被创建时所调用的生命周期方法与其他各个后续实例被创建时所调用的方法略有不同，当你首次使用一个组件类时，你会看到下面这些方法依次被调用：

* getDefaultProps

对于组件化来说，这个方法只会被调用一次，对于那些没有被父辈组件指定props属性的新建实例来说，这个方法返回的对象可用于为实例设置默认的props值。

* getInitialState

初始化 this.state 的值，只在组件装载之前调用一次。

* componentWillMount

只会在装载之前调用一次，在 render 之前调用，你可以在这个方法里面调用 setState 改变状态，并且不会导致额外调用一次 render。

* render

这个方法是必须的，组装生成这个组件的 HTML 结构（使用原生 HTML 标签或者子组件），当然也可以返回 null 或者 false来表明不需要渲染任何东西。

* componentDidMount

只会在装载完成之后调用一次，在 render 之后调用，从这里开始可以通过 ReactDOM.findDOMNode(this) 获取到组件的 DOM 节点。

##### 存在期

随着应用状态的改变，以及组件逐渐受到影响，下面的方法会依次调用。

* componentWillReceiveProps

在组件接收到新的 props 的时候调用。在初始化渲染的时候，该方法不会调用。

用此函数可以作为 react 在 prop 传入之后，render() 渲染之前更新 state 的机会。老的 props 可以通过 this.props 获取到。在该函数中调用 this.setState() 将不会引起第二次渲染。

* shouldComponentUpdate

在接收到新的 props 或者 state，将要渲染之前调用。该方法在初始化渲染的时候不会调用，在使用 forceUpdate 方法的时候也不会。

如果确定新的 props 和 state 不会导致组件更新，则此处应该返回 false。
如果 shouldComponentUpdate 返回 false，则 render() 将不会执行，直到下一次 state 改变。（另外，componentWillUpdate 和 componentDidUpdate 也不会被调用。）

默认情况下，shouldComponentUpdate 总会返回 true，在 state 改变的时候避免细微的 bug，但是如果总是小心地把 state 当做不可变的，在 render() 中只从 props 和 state 读取值，此时你可以覆盖 shouldComponentUpdate 方法，实现新老 props 和 state 的比对逻辑。

* componentWillUpdate

在接收到新的 props 或者 state 之前立刻调用。在初始化渲染的时候该方法不会被调用。使用该方法做一些更新之前的准备工作。

* render

* componentDidUpdate

在组件的更新已经同步到 DOM 中之后立刻被调用。该方法不会在初始化渲染的时候调用。使用该方法可以在组件更新之后操作 DOM 元素。

##### 销毁&清理期

当组件使用完成后，下面的方法将会被调用，目的是给这个实例提供清理自身的机会。

* componentWillUnmount

在组件从 DOM 中移除的时候立刻被调用。在该方法中执行任何必要的清理，比如无效的定时器，或者清除在 componentDidMount 中创建的 DOM 元素。

### 数据流

在 React 中，数据的流向是单向的——从父节点传递到子节点，因此组件是简单且易于把握的，他们只需要从父节点获取props渲染即可，如果顶层组件的props有所改变，则重新渲染。

##### props  

props就是properties的缩写，你可以使用它把任意类型的数据传递给组件。可以在挂载组件的时候设置它的props或者通过调用组件实例的setProps方法来设置其props。

避免在组件内部修改this.props或调用this.setProps，请把props当做只读。

使用props来做事件处理器，与子组件通信。

##### state
state与props的区别在于前者只存在于组件的内部。使用state存储简单的视图状态，比如说下拉框是否可见这样的状态。并且使用this.setState来设置状态，而不要使用this.state直接修改状态。

### 事件处理

从用户输入到更新用户界面，处理步骤非常简单：

1. 在React组件上绑定事件处理器。
2. 在事件处理器当中更新组件的内部状态。组件状态的更新会触发重绘。
3. 实现组件的render函数用来渲染this.state的数据。

##### 绑定事件处理器

React 绑定事件处理器的语法和HTML语法非常类似，例如下面的点击事件：

```javascript
<button className="btn btn-save" onClick={this.handleSaveClicked}>save</button>

```
用户点击这个按钮时，组件的handleSaveClicked方法会被调用。

##### 更新组件状态

更新组件状态有两种方案：组件的setState方法和replaceState方法。

setState方法可以局部更新，将更新对象合并到已有的state对象
replaceState方法和setState方法不同，它会替代以前的state对象，全部。

### 组件的复合

基本上，一个组件就是一个javascript函数，它接受属性（props）和状态（state）作为参数，并输出渲染好的HTML。相对于继承，React偏爱复合，通过结合小的简单的组件和数据对象，构造大而复杂的组件。

##### 组件复合的例子

一个渲染选择题的组件要满足以下几个条件：

* 接受一组选项作为输入。
* 把选项渲染给用户。
* 只允许用户选择一个选项。

组件从层级从上往下看是这样的：

MultipleChoice -> RadioInput -> Input(type="radio")

选择题组件有一个单选框，单选框有一个输入框。

##### 组装HTML

我们从下往上组装这个组件。

先建立一个脚手架，其中包含所需渲染的方法和基本标记。

```javascript
var AnswerRadioInput = React.createClass({
	render: function(){
		return(
		<div className="radio">
			<label>
				<input type="radio">
				label text
			</label>
		</div>
		);
	}
});
```

##### 添加动态属性

为input添加动态内容，需要把内容添加到类的PropTypes对象当中。

```javascript
var AnswerRadioInput = React.createClass({
	propTypes: {
		id: React.ProTypes.string,
		name: React.ProTypes.string.isRequired//必须要填的定义方法
	},
	...
)};
```

##### 追踪状态

当我们需要追踪随时间而变化的数据时，特别是此处对于每个实例来说都要求是唯一的id，以及用户可以随时更新checked值。那么我们来定义初始化状态：

```javascript
var AnswerRadioInput = React.createClass({
	propTypes: {
		...
	},
	...
	getInitialState: function(){
		var id = this.props.id? this.props.id : uniqueId('radio-');
		return{
			checked: !!this.props.checked,
			id: id,
			name: id
		};
	},
	...
)};

```

##### 父组件、子组件关系

子组件和其父组件通信的最简单方式就是使用属性（props）。父组件需要通过属性传入一个回调函数，子组件在需要时进行调用。

在我们得到单个组件，可以把一组转变成一个可交互的用户界面。

```javascript
<AnswerMultipleChoiceQuestion choices={arrayOfChoices}.../>
```
### mixin

组件的复合只是React提供的用于定制和特殊化组件的方式之一。React 的mixin提供了另一种途径，帮助我们定义可以在多组件之间共享的方法。mixin是解决代码段重复的最强大的工具之一，保持组件专注于自身的业务逻辑。

##### 写一个mixin

```javascript
var DefaultNameMixin = {
  getDefaultProps: function () {
    return {name: "Skippy"};
  }
};
```
##### 调用mixin

```javascript
var ComponentOne = React.createClass({
  mixins: [DefaultNameMixin],
  render: function () {
    return (
      <div>
        <h4>{this.props.name}</h4>
      </div>
    );
  }
});
```

如何你的mixin当中包含生命周期方法，不要焦急，你仍然可以在你的组件中使用这些方法，而且它们都会被调用。