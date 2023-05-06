# 自定义

-   Q: 如果我想新增 `Msg` 类型，如 `钉钉` 怎么办?
-   A: 按以下步骤即可

    1. 导出 `Msg` [标准](./schema.md) 格式的 JSON

        ```js
        {
            // 通用字段都是必填 参考 [标准]
            "source": "DingTalk",
            ....

            $DingTalk: {
                "os":    "Android",
                "raw": { } // "数据的原始样貌"
                "res": {} // 和 raw  key一一对应, value 为解密后的数据   如未加密则  raw =res
                "data": {} // 前端组件显示所需要的数据
                "rootPath" ///  /data/ $rootPath /img/123.png 资源文件夹名称
            }

            $Dev: {} // 开发中需要用到的数据，Show 生成数据时会被删除
        }
        ```

    2. 在 [Shmily-Show](https://github.com/lqzhgood/Shmily-Show/) 项目 [memoryweb/src/components/Msg/source](https://github.com/lqzhgood/Shmily-Show/tree/main/memoryweb/src/components/Msg/source) 下新增前端组件
        - 如果您对前端不熟悉，可以在 issue 中提出并提供样本 Msg 我来代劳~

<hr />

-   Q: 我有一个和 `短信` 一样的简单数据，html 就够了，不需要用到复杂组件
-   A: 那么 `Msg` 只需要提供 html 即可，
    ```js
        {
            // 通用字段都是必填 参考 [标准]
            "source": "SMS",
            "content": "你好，钉钉", // 用于搜索
            "html": "<b>你好，钉钉</b>" // 用于显示
            ...
        }
    ```
    [Shmily-Show](https://github.com/lqzhgood/Shmily-Show/) 应该不用改动，或改动极小
