# 开始吧

## 概述

对于用户来说, 希望一个软件足够简单,打开一个窗口,点击一个按钮, 就可以得到最终的 `结果` . 这称为黑盒, 所有的事情都被这个按钮挡住的了,不利于 debug 与 程序的解耦.

若有些人只希望导出 MobileQQ 的数据做一个自己的 Ai 机器人 ,并不需要`Show(展示数据)`. 如果按照以上的设计,他还需要从上述按钮获取的展示 `结果` 逆向为数据.

所以 Shmily 的使用是在 `程序解耦` 与 `使用便利` 之间取舍. 我希望 Shmily 对于不懂编程的人能简单使用, 同时也能足够解耦拆分足够细, 不让开发者 [重造轮子](https://baike.baidu.com/item/%E9%87%8D%E9%80%A0%E8%BD%AE%E5%AD%90/16837040), 中间的纽带就是文档了.

因为我自身是 Shimly 的开发者,很容易一叶障目, 所以我也很希望你们从各种角度对文档提出各方面的问题来完善文档. 欢迎 [提出建议](https://github.com/lqzhgood/Shmily/issues/new)

基于以上 Shmily 的使用会被拆分为很多个步骤, 而且没有 GUI 界面, 这会让人看起来感觉很复杂, 但我保证, <b>每个步骤基本都是拷贝文件, 执行一行命令 完了~</b> 别担心~

## 大致步骤

`Get(获取数据)` ---> `Merger(合并数据)` ---> `Show(展示数据)`

::: tip
大多数情况下 `Merger(合并数据)` 可以跳过
:::

## 开始项目

大部分项目并不会打包为开箱即用的 `"exe"`, 如果您非程序员, 请按以下步骤操作

### 1. 下载项目

Github 为例, 点击下图中 `Download ZIP` 即可下载当前项目源码
![down repo](./assets/down_repo.png)

### 2. 安装项目运行时环境

根据不同的项目语言安装不同的运行时环境, `Github` 会自动标注主要语言
![what-languages](./assets/what-languages.png)

也可以按照下面列出的特性, 安装对应语言的运行时

-   [nodejs](../setup-runtime/nodejs) (项目中有 `package.json` 文件)

-   [python](../setup-runtime/python) (大量 `.py` 后缀文件)

-   [java](../setup-runtime/java) (大量 `.java` 后缀文件)

### 3. Get-获取数据

[参考 Get 文档](./get.md)

### 4. Merger-合并数据 (可选)

[参考 Merger 文档](./merger.md)

### 5. Show-展示数据

[参考 Show 文档](./show.md)
