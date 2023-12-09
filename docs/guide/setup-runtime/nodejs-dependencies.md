# 安装 nodejs 项目依赖

下面提供 `从项目下载` 和 `从本地安装` 两种方式, 二选一即可

### 从项目下载 (建议)

::: tip 🎞️ 视频教程
https://www.bilibili.com/video/BV1Ri4y1e7vp/
:::

<details>

![从项目下载依赖](./assets/node-dependencies.png)

可以查看项目是否有 `node_modules` 分支, 如果有, 可以直接下载其中的压缩包并解压到项目目录

```
// 解压后项目文件夹结构

-\
  - node_modules
    - .bin
    - ...
  - package.json
  - README.md
  - ...

```

</details>

### 从本地安装

<details>

<!--@include: ./snippets/open_cmd.md-->

-   执行命令安装依赖
    `npm i`

    ![npm i](./assets/npm%20i.png)

    ::: warning
    如果安装以来过程中大量报错，特别是有 `node-gyp` 字样的，建议使用 [从项目下载] 的方式解决

    其他的参考报错提示处理
    :::

</details>
