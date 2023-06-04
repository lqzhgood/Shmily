# 开始 Nodejs 项目

## 1. 安装 nodejs

-   查看 `package.json` 中 `engines` 字段获取项目所需 `nodejs` 版本
-   从 `https://nodejs.org/dist/` 下载相应版本的 `nodejs`
    -   如果没有 `engines` 字段，从官网 `https://nodejs.org/` 下载 `LTS` 版本
-   安装过程，选项全部默认

## 2. 安装项目依赖

<!--@include: ./snippets/open_cmd.md-->

-   执行命令安装依赖
    ```shell
    npm i
    ```
::: warning
如果安装以来过程中大量报错，特别是有 `node-gyp` 字样的，可以查看项目是否有 `node_modules` 分支, 如果有可以解压到项目目录 `.\node_modules` 下， 可以解决依赖问题

其他的参考报错提示处理
:::
    

## 3. 启动程序

::: warning
项目启动方式并不唯一, 下面为常用的项目启动方式, 仅供参考
:::

-   按照项目说明启动程序

-   若项目无说明, 从 `package.json` 文件中的 `scripts` 字段获取执行脚本名称, 通过 `npm run {script}` 启动程序

    ```json
    {
        ...
        "scripts": {
            "dev": "vitepress dev docs",
            "build": "vitepress build docs",
            "serve": "vitepress serve docs"
        },
        ...
    }
    ```

    ::: info
    若 `script` 中有多个脚本名称(如上图), 一般来说，`build` 代表生产(正式)，`dev` 代表测试, 执行 `npm run build` 即可
    :::

-   若项目 `package.json` 中没有 `script` 字段, 则大多数情况下, `index.js` 为入口文件
    ```shell
        node index.js
    ```
