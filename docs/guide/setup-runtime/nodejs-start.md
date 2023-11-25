# 启动 nodejs 程序

::: warning
启动方式并不唯一, 下面为常用的项目启动方式, 仅供参考
:::

> 优先级从高到低

-   按照项目说明启动程序 (一般为 `npm run xxx`)

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

    若 `script` 中有多个脚本名称(如上图), 一般来说，`build` 代表生产(正式)，`dev` 代表测试

    执行 `npm run build` 即可
    ```

-   若项目 `package.json` 中没有 `script` 字段, 则大多数情况下, `index.js` 为入口文件, 执行:
    ```shell
        node index.js
    ```
