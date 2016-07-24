---
layout: post
title: "常用排序算法之JavaScript实现"
categories:
- javascript
---

### 冒泡排序

冒泡排序是一种简单的排序算法。它重复地走访过要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端。

##### 算法描述和实现

具体算法描述如下：

* 比较相邻的元素。如果第一个比第二个大，就交换它们两个；
* 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；
* 针对所有的元素重复以上的步骤，除了最后一个；
* 重复步骤1~3，直到排序完成。

##### JavaScript代码实现：

```
Array.prototype.bubble_sort = function() {
  var i, j, temp;
  for (i = 0; i < this.length - 1; i++)
    for (j = 0; j < this.length - 1 - i; j++)
      if (this[j] > this[j + 1]) {
        temp = this[j];
        this[j] = this[j + 1];
        this[j + 1] = temp;
      }
  return this;
};
```
##### 算法分析

最佳情况：T(n) = O(n)
最差情况：T(n) = O(n2)
平均情况：T(n) = O(n2)

### 选择排序

选择排序是一种简单直观的排序算法。它的工作原理：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。

##### 算法描述和实现

n个记录的直接选择排序可经过n-1趟直接选择排序得到有序结果。具体算法描述如下：

* 初始状态：无序区为R[1..n]，有序区为空；
* 第i趟排序(i=1,2,3…n-1)开始时，当前有序区和无序区分别为R[1..i-1]和R(i..n）。该趟排序从当前无序区中选出关键字最小的记录 R[k]，将它与无序区的第1个记录R交换，使R[1..i]和R[i+1..n)分别变为记录个数增加1个的新有序区和记录个数减少1个的新无序区；
* n-1趟结束，数组有序化了。

##### JavaScript代码实现：

```
Array.prototype.selection_sort = function() {
  var i, j, min;
  var temp;
  for (i = 0; i < this.length - 1; i++) {
    min = i;
    for (j = i + 1; j < this.length; j++){
      if (this[min] > this[j]){
                min = j;
            }
        }
    temp = this[min];
    this[min] = this[i];
    this[i] = temp;
  }
  return this;
};
```
##### 算法分析

最佳情况：T(n) = O(n2)
最差情况：T(n) = O(n2)
平均情况：T(n) = O(n2)

### 插入排序

插入排序的算法描述是一种简单直观的排序算法。它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。插入排序在实现上，通常采用in-place排序（即只需用到O(1)的额外空间的排序），因而在从后向前扫描过程中，需要反复把已排序元素逐步向后挪位，为最新元素提供插入空间。

##### 算法描述和实现

一般来说，插入排序都采用in-place在数组上实现。具体算法描述如下：

* 从第一个元素开始，该元素可以认为已经被排序；
* 取出下一个元素，在已经排序的元素序列中从后向前扫描；
* 如果该元素（已排序）大于新元素，将该元素移到下一位置；
* 重复步骤3，直到找到已排序的元素小于或者等于新元素的位置；
* 将新元素插入到该位置后；
* 重复步骤2~5。

##### JavaScript代码实现：

```
Array.prototype.insertion_sort = function() {
  var i, j;
  var temp;
  for (i = 1; i < this.length; i++) {
    temp = this[i];
    for (j = i - 1; j >= 0 && this[j] > temp; j--){
            this[j + 1] = this[j];
        }
    this[j + 1] = temp;
  }
  return this;
};
```
##### 算法分析

最佳情况：输入数组按升序排列。T(n) = O(n)
最坏情况：输入数组按降序排列。T(n) = O(n2)
平均情况：T(n) = O(n2)


### 归并排序

归并排序是建立在归并操作上的一种有效的排序算法。该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。归并排序是一种稳定的排序方法。将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序。若将两个有序表合并成一个有序表，称为2-路归并。

##### 算法描述和实现

具体算法描述如下：

* 把长度为n的输入序列分成两个长度为n/2的子序列；
* 对这两个子序列分别采用归并排序；
* 将两个排序好的子序列合并成一个最终的排序序列。

##### JavaScript代码实现：

```
Array.prototype.merge_sort = function() {
    var merge = function(left, right) {
        var final = [];
        while (left.length && right.length)
            final.push(left[0] <= right[0] ? left.shift() : right.shift());
        return final.concat(left.concat(right));
    };
    var len = this.length;
    if (len < 2) return this;
    var mid = len / 2;
    return merge(this.slice(0, parseInt(mid)).merge_sort(), this.slice(parseInt(mid)).merge_sort());
};
```
##### 算法分析

最佳情况：T(n) = O(n)
最差情况：T(n) = O(nlogn)
平均情况：T(n) = O(nlogn)

### 快速排序

快速排序的基本思想：通过一趟排序将待排记录分隔成独立的两部分，其中一部分记录的关键字均比另一部分的关键字小，则可分别对这两部分记录继续进行排序，以达到整个序列有序。

##### 算法描述和实现

快速排序使用分治法来把一个串（list）分为两个子串（sub-lists）。具体算法描述如下：

* 从数列中挑出一个元素，称为 "基准"（pivot）；
* 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
* 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。

##### JavaScript代码实现：

```
Array.prototype.quick_sort = function() {
  var len = this.length;
  if (len <= 1)
    return this.slice(0);
  var left = [];
  var right = [];
  var mid = [this[0]];
  for (var i = 1; i < len; i++)
    if (this[i] < mid[0])
      left.push(this[i]);
    else
      right.push(this[i]);
  return left.quick_sort().concat(mid.concat(right.quick_sort()));
};
```

##### 算法分析

最佳情况：T(n) = O(nlogn)
最差情况：T(n) = O(n2)
平均情况：T(n) = O(nlogn)
