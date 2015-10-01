---
layout: post
title:  "给 Jekyll 添加评论插件"
categories:
---


### 准备

我使用的是多说，所以第一步是登陆多说首页，先登陆账号，把你想使用的账号授权给多说便可。

首页大大按钮`我要安装`，点击之后，填写创建站点页面，填好相关信息后你会看到生成的默认代码了。

```html
<!-- 多说评论框 start -->
<div class="ds-thread" data-thread-key="请将此处替换成文章在你的站点中的ID" data-title="请替换成文章的标题" data-url="请替换成文章的网址"></div>
<!-- 多说评论框 end -->
<!-- 多说公共JS代码 start (一个网页只需插入一次) -->
<script type="text/javascript">
var duoshuoQuery = {short_name:"short_name"};
    (function() {
        var ds = document.createElement('script');
        ds.type = 'text/javascript';ds.async = true;
        ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
        ds.charset = 'UTF-8';
        (document.getElementsByTagName('head')[0]
         || document.getElementsByTagName('body')[0]).appendChild(ds);
    })();
</script>
<!-- 多说公共JS代码 end -->
```
看到这段代码先不要动手，我们有两张方法可以配置。

### 配置方法一

#### 复制代码

复制多说提供的代码到`post.html`的文章内容之后，粘贴好代码后，需要把站点的文章标题、网址等参数替换掉默认内容。

#### 配置对应的文件

```html
<div id="comments">
    <div class="ds-thread" {% if page.id %}data-thread-key="{{ page.id }}"{% endif %}  data-title="{% if page.title %}{{ page.title }} - {% endif %}{{ site.title }}"></div>
</div>
```
将多听提供的代码中需要自己添加的部分，配置成上面的代码，工作做完之后，访问页面我们的博客就得到评论功能了。

### 配置方法二

当前的配制方法是将代码与页面分离，将评论看做组成页面的元素之一，而不写死在页面模板中，需要时调用相应内容即可。

#### 修改 `_config.yml`

首先看 `_config.yml` ，需要在 comments 下加入评论插件标识

```
comments :
    provider : duoshuo
    duoshuo :
      short_name : short_name
```

#### 创建评论代码文档

在 `_includes` 文件夹下新建 `duoshuo.html`,这个文档中添加我们配置好的代码，目的是创建评论代码文档。

```html
<div id="comments">
    <div class="ds-thread" {% if page.id %}data-thread-key="{{ page.id }}"{% endif %}  data-title="{% if page.title %}{{ page.title }} - {% endif %}{{ site.title }}"></div>
</div>
<script type="text/javascript">
var duoshuoQuery = {short_name:"short_name"};
    (function() {
        var ds = document.createElement('script');
        ds.type = 'text/javascript';ds.async = true;
        ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
        ds.charset = 'UTF-8';
        (document.getElementsByTagName('head')[0]
         || document.getElementsByTagName('body')[0]).appendChild(ds);
    })();
</script>

```
#### 将评论加入 post.html

最后是修改 post.html 文章页（或其它需要出现评论的页面），在文档恰当地方加入下面这句代码来显示评论。

```
{% include duoshuo.html %}
```

### 修改评论样式

多听可以修改评论框的样式，实现起来很方便，我们可以直接在自己的多听的后台管理中设置。

打开`后台管理`—>`设置`—>`基本设置`选择你喜欢的样式，简单的选择还是满足不了你的话，看`自定义CSS`这一项：

例如：我们想让最下面的那行`某某某正在使用多听`消失。就在自定义CSS中添加下面的代码：

```CSS
#ds-reset .ds-powered-by {
  display: none;
}
```
当然这段代码你可以填写到自己的CSS文件中。
