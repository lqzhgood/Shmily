# 安装 nodejs

::: tip 🎞️ 视频教程
https://www.bilibili.com/video/BV1t94y1E7VT/
:::

-   查看项目中 `package.json` 中 `engines` 字段获取项目所需 `nodejs` 版本
    -   如果没有 `engines` 字段，从官网 `https://nodejs.org/` 下载 `LTS` 版本
-   从 `https://nodejs.org/dist/` 下载相应版本的 `nodejs`

    -   Windows 平台
        -   (推荐) `node-v99.99.9-x64.msi` 标准安装程序
        -   (不推荐) `node-v99.9.9-win-x64.7z / .zip` 绿色版, 需要自己配置 `Path` 环境变量
        -   (不推荐) `./win-x64/node.exe` 绿色单文件, 不含 `npm`

-   安装过程，选项全部默认
