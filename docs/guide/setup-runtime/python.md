# 开始 Python 项目

::: tip 视频教程 
[https://www.bilibili.com/video/BV1t94y1E7VT/](https://www.bilibili.com/video/BV1dc411q7bh/)
:::

## 1. 安装 python

-   进入[官网](https://www.python.org/downloads/)下载
-   勾选 `Add python.exe to PATH`

    ![python add path](./assets/python-setup.png)

-   全默认 下一步 完成

## 2. 安装项目依赖

<!--@include: ./snippets/open_cmd.md-->

    - 执行命令安装依赖
    ``` shell
    pip install -r requirements.txt
    ```

## 3.启动程序

::: warning
项目启动方式并不唯一, 下面为常用的项目启动方式, 仅供参考
:::

-   按照项目说明启动程序

-   若无说明, 一般 `main.py` 为入口文件
    ```shell
        python main.py
    ```
