# Get

从 [支持列表](./get.md#支持列表) 中选择所需项目, 按照相应的文档操作

## 支持列表

下面列出现有已知的 Get 项目, 更多项目可在 `Github` 搜索 [`Shmily-Get-`](https://github.com/search?q=Shmily-Get-&type=repositories)

-   `QQ` QQ 电脑版

    -   [mht 格式聊天记录](https://github.com/lqzhgood/Shmily-Get-QQ-PC_MHT)
    -   [通过剪贴板导出](https://github.com/lqzhgood/Shmily-Get-QQ-PC_Clipboard)

-   `MobileQQ` QQ 手机版

    -   [Andriod](https://github.com/lqzhgood/Shmily-Get-MobileQQ-Andriod)
    -   [Nokia Symbian S60v3](https://github.com/lqzhgood/Shmily-Get-MobileQQ-S60v3)

-   `Wechat` 微信

    -   [Android](https://github.com/lqzhgood/Shmily-Get-Wechat)

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

## 产物结构

最终可以在输出目录（一般是 `dist`）获得 `数据文件` 和 `资源文件`

```
// 示例

- dist
    - MobileQQ-lqzh-20230101.json  <--- 数据文件

    - data                         <---  资源文件
      - MobilqQQ-lqzh-20230101
        - images
        - videos
           ...

    - _temp                        <--- 输出过程中的一些信息，如下载错误的列表等
      - DOWN_ERROR.json
      - XXXX.json
```

-   `数据文件`

    [Shmily-Msg](./msg/schema.md) 格式的 JSON 文件，内容是从数据(库)导出的消息内容。

    <details>
        <summary> 给开发者的一些建议</summary>

        -   尽量导出消息相关的所有数据而非所需数据, 这样会给其他人带来帮助, 也便于丰富更多信息
        -   尽量补充完整信息, 如 自定义表情, 补充 表情包名称 与 描述, 对于统计来说更准确全面

    </details>

-   `资源文件`

    消息相关的静态资源文件,如图片、表情、视频等

    <details>
        <summary> 给开发者的一些建议</summary>

        -   对于外链的资源，建议能爬下来的资源(如图片)都本地化, 过个几年这些 URL 都打不开了

    </details>
