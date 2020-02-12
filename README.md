# Shmily

### Online View
[https://lqzhgood.github.io/Shmily](https://lqzhgood.github.io/Shmily)

### 这个吧 好像是个悲伤的故事

<p style="text-indent:2em;">很久前就看到了这个 Web 。但是吧，现在移动互联网为主都是用手机，她基本不用电脑。我就存在浏览器书签里面。说等一下次用电脑再给她看。 </p>
<p style="text-indent:2em;">但是呢，她家又没电脑，一台笔记本也常年收起来不用，即便是我有时候带电脑去也都忘了这个事。 </p>
<p style="text-indent:2em;">就这么一天两天的过了，就好像反正会有那么一天似的。 </p>
<p style="text-indent:2em;">直到某一天以后</p>
<p style="text-indent:2em;">我整理到这些东西时，发现原来视为珍爱的东西突然就没有意义了…… </p>
<p style="text-indent:2em;">看到这些及其他好玩有意思的东西条件反射的想发给她 突然就愣住 </p>
<p style="text-indent:2em;">再发给她已经不合适了 </p>
<p style="text-indent:2em;">我才知道我是真的失去了，心里像被挖空了一块。 </p>
<p style="text-indent:2em;">哎 不知道该说什么... </p>

```javascript
while('What should I say?'){
    'Think About...'
}
```

<br/>
<p style="text-indent:2em;">仓鼠症的我又不忍心删~ </p>
<p style="text-indent:2em;">就存在这个仓库吧……</p>
<br/>

##### by the way
```
Zhuzhou.city 系列 左上角 Drawer 背景图用的 Page-4
那可能是做 Zhuzhou.bike 的时候找到这个网站的吧
顺便觉得那图不错 就用来做背景了。
从 https://bike.zhuzhou.city/dev 来看至少是 2017/08 左右存的了……
今天都 2020/02/12 了~
```
> Bike Drawer Background Image

![Bike Drawer Background Image](https://lqzhgood.github.io/Shmily/other/bikebg.jpg)

<br/>

> 生活难免有风风雨雨

![Page-4](https://lqzhgood.github.io/Shmily/love/img/iali51.jpg)






<br/><br/><br/>

### 情人节表白程序
原作者已不可考 保留了注释里写的
> 这是一个自动生成表白页面的程序，模版由 jianghongfei.com.cn 原创，麦葱(maicong.me)做二次开发，仅限娱乐，不得用于商业用途

### Fix
修复了一个Bug 我猜是因为测试遗留下来的
> ./love/js/love.js
```javascript
   // 这个 player 没有定义 下面3行我直接注释掉了
   // 应该是作者想测试 Flowtime 的事件 Api 吧，滚动到第二页暂停音乐。
   if (e.progress == 2) {
       player.pause();
   }
```

修复 Chrome 高版本音频不播放的 Bug
> ./love/js/love.js
```javascript
// 音频作者只在 Html audio 元素中设置了 autoplay
// 但是高版本 Chrome 已经不允许自动播放视频及音频了
// 所以 【播放】 加入到 Flowtime 翻页事件中，
// 低版本自动播放， 高版本第一次按 【↓】 时触发音频播放

var firstBgm = true;
function onNavigation(e) {
    if (firstBgm) {
        var bgmMusic = document.getElementById("bgmMusic");
        if (bgmMusic.paused) {
            bgmMusic.play();
        }
        firstBgm = false;
    }
}

// start 方法要先于 event。
// 不然 start 也会触发 event 导致 onNavigation 不是用户手动触发的 播放失败。

Flowtime.start();
Flowtime.addEventListener("flowtimenavigation", onNavigation, false);
```
