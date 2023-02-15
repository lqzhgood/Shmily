# Get

根据相应的 Get 项目, 获得

-   `数据文件` \*\*\*.json
    -   尽量导出消息相关的所有数据而非所需数据, 这样会给其他人带来帮助, 也便于丰富更多信息
    -   尽量补充完整信息, 如 自定义表情, 补充 表情包名称 与 描述, 对于统计来说更准确全面
-   `资源文件` /data/xxx
    -   能爬下来的资源(如图片)都本地化, 过个几年这些 URL 都打不开了

## 支持列表

下面列出现有已知的 Get 项目, 更多项目可在 `Github` 搜索 [`Shmily-Get-`](https://github.com/search?q=Shmily-Get-&type=repositories)

-   `QQ` QQ 电脑版

    -   [mht 格式聊天记录](https://github.com/lqzhgood/Shmily-Get-QQ-PC_MHT)
    -   [通过剪贴板导出](https://github.com/lqzhgood/Shmily-Get-QQ-PC_Clipboard)

-   `MobileQQ` QQ 手机版

    -   [Andriod](https://github.com/lqzhgood/Shmily-Get-MobileQQ-Andriod)
    -   [Nokia Symbian S60v3](https://github.com/lqzhgood/Shmily-Get-MobileQQ-S60v3)

-   `Wechat` 微信
    -   [Android](https://github.com/lqzhgood/Shmily-Get-Wechat-Android)
-   `SMS` `CallLog` 短信与通话记录
    -   [Android](https://github.com/lqzhgood/Shmily-Get-Call_SMS-Android)
    -   [GoogleCalendar](https://github.com/lqzhgood/Shmily-Get-Call_SMS-calendar_google_com)
    -   [QQ 同步助手](https://github.com/lqzhgood/Shmily-Get-Call_SMS-ic_qq_com)
    -   [Nokia Symbian S60v3 彩信](https://github.com/lqzhgood/Shmily-Get-Call_SMS-S60v3_MMS)
    -   [Nokia Symbian S60v3 短信](https://github.com/lqzhgood/Shmily-Get-Call_SMS-S60v3_SMS)
-   `Camera` 照片与视频
    -   [照片与视频](https://github.com/lqzhgood/Shmily-Get-Camera)
-   `EMAIL` 电子邮件
    -   [电子邮件](https://github.com/lqzhgood/Shmily-Get-Email)

## 如何启动项目

项目中可能并不会 **明确** 说明如何启动项目, 并且大部分项目并不会打包为开箱即用的 `"exe"`.

如果您非程序员, 下面将简单讲解 **常见** 启动方式

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

### 3. 根据项目说明执行程序

### 4. 获取数据

    - 数据文件 `xxx.json`
    - 资源文件 `/data/xxx/**`

### 5. 展示

[参考 Show 文档](./show.md)
