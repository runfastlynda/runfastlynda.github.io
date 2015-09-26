---
layout: post
title: "用CSS设计响应式导航菜单"
categories:
- 博客
---

我们这次的目标是做一个响应式导航菜单，不使用javascript，只使用CSS就可以做到。就像这样：

##### 初试效果
![pc](http://7xjufd.dl1.z0.glb.clouddn.com/blog6.1.png)


##### 响应式效果
![pc](http://7xjufd.dl1.z0.glb.clouddn.com/blog6.3.png)


### HTML代码


      <nav>
      <label for="menu-toggle">☰</label>
      <input type="checkbox" id="menu-toggle"/>
      <ul id='nav' class='nav nav-pills pull-right'>
        <li role="presentation" class="active"><a href="#">Home</a></li>
        <li role="presentation"><a href="#">About</a></li>
        <li role="presentation"><a href="#">Contact</a></li>
      </ul>
      </nav>

我们要利用label元素的"for"属性，对应一个checkbox的id


      <label for="User">Click me</label>
      <input type="text" id="User" name="Name" />


上面的代码表示：当我们点击 `Clickme` 就等于input复选框被选中。

### CSS代码


      label {
      	display: none;
      }
      #menu-toggle {
      	display: none; /* hide the checkbox */
      }

      @media all and (max-width: 700px) and (min-width: 0px) {

      	label {
      		display: block;
      		float: right;
      		border-radius: 10%;
      		height:40px;
      		width:40px;
      		line-height:40px;
      		text-align:center;
      		color:white;
      		font-size:110%;
      		background-color: #327AB7;
      		cursor:pointer;
      	}
      	nav ul {
      		display: none;
      		width: 100%;
      	}
      	nav ul li {
      		display: block;
      		margin: 0 auto;
      		text-align: center;
      		width: 100%;
      		border: 0px;
      	}
      	#menu-toggle:checked + .nav {
      		display: block;
      	}
      	.header label:active .nav {
      		display: none;
      	}

      }


#### 实现弹出导航栏

![pc](http://7xjufd.dl1.z0.glb.clouddn.com/blog6.2.png)

我们在这里使用兄弟选择器（sibling combinator）来组合前后两个选择器input和ul（也就是#menu-toggle:checked + .nav），
选择器中的元素有相同的父元素，并且第二个必须紧随着第一个出现。

而input和ul中的css样式会应用在紧随着“勾选的input元素”后面（同级）的“ul元素”上。也就是说，
input框如果被用户勾选了，其后面的ul元素会有相应的样式变化，显示出来。


#### 实现收回导航栏
使用label:active选择器，当再一次按下lable时就会有相应的样式变化。就像这样：

![pc](http://7xjufd.dl1.z0.glb.clouddn.com/blog6.3.png)
