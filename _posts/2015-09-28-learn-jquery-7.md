---
layout: post
title:  "jQuery基础教程-学习笔记（7）"
date:   2015-09-28 18:28:16
categories:
---
### 开发插件

+ 立即调用的函数表达式

```javascript
(function(){
  //在这里添加代码
})(jQuery);
```
这个包装函数只接收一个参数，我们通过这个参数传入了jquery对象。这个参数的名字是$,因此在这个函数内部，使用$别名就不会有冲突了。

+ 定义多个全局函数，利用.extend()函数。

```javascript
(function(){
  $.extend({
    sum:function(){
      //这里添加方法
    },
    average:function(){
      // 方法
    }
  });
})(jQuery);
```
但这样有可能污染命名空间。

+ 最好的定义方法是把插件的全局函数封装到一个对象中。

```javascript
(function(){
  $.mathUtils = {
    sum:function(){

    },
    average:function(){
      // 方法
    }
  }
})(jQuery);
```
调用他们的方法是这样的

```javascript
$.mathUtils.sum(sum);
$.mathUtils.average(average);
```
+ jQuery.fn对象是jQuery.prototype的别名。

+ .hasClass()只会检查匹配的第一个元素，想要匹配多个元素使用.each()方法，会执行隐性迭代。


### 第八章习题
1.创建 .slideFadeIn() 和 .slideFadeOut() 的插件方法，把不透明度动画方法 .fadeIn() 和 .fadeOut() 以及高度动画方法 .slideDown() 和 .slideUp() 结合起来。

```javascript
(function ($) {
    $.fn.slideFadeIn = function () {
        return this.each(function () {
            // 用 fadeIn() 效果不明显
            $(this).slideDown('slow').fadeTo('slow', 1.0);
        });
    };
    $.fn.slideFadeOut = function () {
        return this.each(function () {
            // 用 fadeOut() 效果不明显
            $(this).fadeTo('slow', 0.5).slideUp('slow');
        });
    };
})(jQuery);
```
2.扩展 .shadow() 方法的可定制能力，让插件用户可以指定元素副本的 z 轴索引。为提示条控件添加一个 .isOpen() 子方法，在提示条正在显示的时候返回 true，而在其他时候返回 false。

```javascript
(function ($) {
    $.fn.shadow = function (opts) {
        var options = $.extend($.fn.shadow.defaults, opts);
        return this.each(function () {
            var $originalElement = $(this);
            for (var i = 0; i < options.copies; i++) {
                var offset = options.copyOffset(i);
                $originalElement
                    .clone()
                    .css({
                        position: 'absolute',
                        left: $originalElement.offset().left + offset.x,
                        top: $originalElement.offset().top + offset.y,
                        margin: 0,
                        opacity: options.opacity
                    })
                    .appendTo('body');
            }
        });
    }
})(jQuery);

$.fn.shadow.defaults = {
    copies: 5,
    opacity: 0.1,
    copyOffset: function (index) {
        return {
            x: index,
            y: index
        };
    },
};

(function ($) {
    $.widget('ljq.tooltip', {
        options: {
            offsetX: 10,
            offsetY: 10,
            content: function () {
                return $(this).data('tooltip-text');
            }
        },
        _create: function () {
            this.isTooltipOpen = false;
            this._tooltipDiv = $('<div></div>')
                .addClass('ljq-tooltip-text ' + 'ui-widget ui-state-highlight ui-corner-all')
                .hide().appendTo('body');
            this.element
                .addClass('ljq-tooltip-trigger')
                .on('mouseenter.ljq-tooltip', $.proxy(this._open, this))
                .on('mouseleave.ljq-tooltip', $.proxy(this._close, this));
        },
        destroy: function () {
            this._tooltipDiv.remove();
            // this.element 不就是 $(this) 吗？
            this.element
                .removeClass('ljq-tooltip-trigger')
                .off('.ljq-tooltip');
            $.Widget.prototype.destroy.apply(this, arguments);

        },
        isOpen: function () {
            return this.isTooltipOpen;
        },
        _open: function () {
            if (!this.options.disabled) {
                var elementOffset = this.element.offset();
                this._tooltipDiv.css({
                    position: 'absolute',
                    left: elementOffset.left + this.options.offsetX,
                    top: elementOffset.top + this.element.height() + this.options.offsetY
                }).text(this.options.content.call(this.element[0]));
                this._tooltipDiv.show();
                this.isTooltipOpen = true;
                this._trigger('open');
            }
        },
        open: function () {
            this._open();

        },
        _close: function () {
            this._tooltipDiv.hide();
            this._trigger('close');
            this.isTooltipOpen = false;
        },
        close: function () {
            this._close();
        }

    });
})(jQuery);

```
3.添加代码监听 tooltipOpen 事件，并在控制台中记录一条消息

```javascript
$('a').bind('tooltipopen', function() {
    console.log('tooltipopen event triggered');
});
```
4.（挑战）自定义提示条部件的 content 选项，通过 AJAX 取得链接的 href 属性指向的页面的内容，将取得的内容作为提示条的文本。

```javascript
    $('a').tooltip({
        content: function () {
            var url = $(this).attr('href');
            var result = null;
            $.ajax({
                url: url,
                type: 'get',
                dataType: 'html',
                async: false,
                success: function (data) {
                    result = data;
                }
            });
            return result;
        }
    });
```
5.（挑战）为提示条部件提供一个新的 effect 选项，如果指定该选项，则用该名字指定的 jQuery UI 效果显示或隐藏提示条。

```javascript
if (this.options.effect) {
    this._tooltipDiv.effect(this.options.effect, {distance: 10, duration: 80});
}
```
