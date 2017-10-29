# Shanbay-plug-web-reading-assistant
## Chrome扩展：
### 作用
> 针对[卫报网站](https://www.theguardian.com)的文章单页，进行广告过滤、长页面分页以及双击取词翻译功能。



### 具体功能实现

#### 广告过滤：
分析卫报网站文章页面布局，将广告标签一一移除；针对自动加载的谷歌广告，使用定时器（setInterval方法）每隔两秒进行检查删除；

### 长页面分页：
+ 根据全文高度除以浏览器可见高度，向上取整数，为页数；
+ 分页跳转，利用标题和文章的元素的top值的设定改变，从而实现；

### 双击取词翻译
+ 取词：利用document.getSelection().toString()方法得到所选单词；
+ 双击事件绑定，单击框外元素取消事件绑定；
+ 翻译：使用ajax向扇贝网提供的API进行请求，返回JSON并转换分析；
+ 创造弹出框：DOM以及CSS样式设定；
+ 框出框定位：根据，单词坐标加上弹出框尺寸是否超出浏览器可视区域，设置弹出框位置；


参考文章：
+ [360扩展开发文档](http://open.chrome.360.cn/extension_dev/management.html)
+ [window.screen.height和window.screen.availHeight和document.body.clientHeight和document.documentElement.clientHeight](http://www.cnblogs.com/lwwen/p/7272698.html)
+ [JS clientHeight,scrollHeight,offsetHeight,scrollTop,offsetTop概念](http://www.cnblogs.com/zourong/p/4049012.html)
+ [stackoverflow上一个关于window.getSelection的回答](https://stackoverflow.com/search?q=window.getSelection)
+ [MDN关于Window.getSelection的解释](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getSelection)



