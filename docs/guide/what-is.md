# 这是啥

> 一个悲伤的故事

我想归档 QQ 微信 短信等记录为冷数据, 搜了一圈发现并没有符合以下条件的方案

-   QQ 微信 等记录能融合, 并用时间线查看
-   支持搜索过滤查询
-   可以给消息评论
-   有图表分析

然后开始自己造轮子, 以为很简单的项目, 陆陆续续搞了近 3 年, 主要是各种解密难度超乎想象~

> 吐槽, 什么让摩尔定律停下脚步? 什么让手机电量锁死一天?
>
> 手机忙得最多的就是加解密吧... 表情包都要加密 2 次呢

总之我把 _归档_ 这事 "导出" 和 "显示" 分离了, 导出叫 [Get](./use/get.md), 显示叫 [Show](./use/show.md), 中间用 `<JSON>`[Msg](./use/msg/schema.md) 粘合

少啰嗦，先看[Demo](http://demo.shmily.lqzh.me/)

<div align="center">
    <a target="_blank" href="http://demo.shmily.lqzh.me/"><img src="https://github.com/lqzhgood/Shmily-Show-Demo/raw/page/screenshots/query.png"></a>
    <div>&nbsp;</div>
    <a target="_blank" href="http://demo.shmily.lqzh.me/#/statistic"><img src="https://github.com/lqzhgood/Shmily-Show-Demo/raw/page/screenshots/statistic.png"></a>
</div>

<hr/>

最后

不支持用户数据导出的公司都是耍流氓~

::: tip Adun Toridas
今天，我们将夺回我们的家园，夺回我们的遗产！
:::
