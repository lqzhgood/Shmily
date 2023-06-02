# 表情

如果您要对表情进行统计，根据[数据模式](../custom.md)不同，需要遵循以下规则

## 约定

| key      | value       | 举例                                                                   | 备注                                    |
| -------- | ----------- | ---------------------------------------------------------------------- | --------------------------------------- |
| packName | 表情包 名称 | 阿狸过新年                                                             | 如果不知道或不想写，需要硬编码为 "其他" |
| desc     | 表情 名称   | 饺子                                                                   | 如果不知道或不想写，需要硬编码为 "未知" |
| mark     | 表情包 描述 | 温暖可爱的阿狸新年新装扮，让我们一起把春节、情人节和元宵节都变得萌萌哒 | **可选**, MobileQQ 官方提供这个值       |

文件名使用 MD5 小写，这样可以减少文件空间，而且如果消息类型是图片，也可以通过 md5 修正类型为表情

```
./data/qq-android-lqzh-20230101/emoticon/阿狸过新年/4793ef7525e16fd692ec1620ac19c4fd.gif
```

## 简单模式 (从 HTML 字段统计)

```js
{
    ...
    html: "我是简单的一个表情，<img title='[阿狸过新年-饺子]' alt='[阿狸过新年-饺子]' src='./data/qq-android/emoticon/阿狸过新年/4793ef7525e16fd692ec1620ac19c4fd.gif' />"
    content: "我是简单的一个表情，[阿狸过新年-饺子]"
}

```

[Show](https://github.com/lqzhgood/Shmily-Show) 会使用 [countEmotionByHtml](https://github.com/lqzhgood/Shmily-Show/blob/main/memoryweb/scripts/msgHandle/statistics/contrast/emotion/lib/utils.js) 函数进行统计

## 组件模式 (从特定字段进行统计)

```js
// 仅为示例
{
    ...
     "$source": {
        "data": {
            "webUrl": "./emoticon/阿狸过新年/4793ef7525e16fd692ec1620ac19c4fd.gif",
            "packName": "阿狸过新年",
            "desc": "饺子",
            "mark": "温暖可爱的阿狸新年新装扮，让我们一起把春节、情人节和元宵节都变得萌萌哒！"
            ...
        },
        "rootPath": 'qq-android-lqzh-20230101'
        ...
     }
}

```

可以参考 [wechat](https://github.com/lqzhgood/Shmily-Show/blob/main/memoryweb/scripts/msgHandle/statistics/contrast/emotion/lib/wechat.js) 的函数进行统计

## 新类型

如果是新的 `Get` 类型，需要在 [这里](https://github.com/lqzhgood/Shmily-Show/blob/main/memoryweb/scripts/msgHandle/statistics/contrast/emotion/lib/index.js) 补充统计函数

## 表情数据的一些说明

### 正向导出

Wechat、MobileQQ 可以直接从数据库中获取表情的 `packName`、`desc` 等值，这样的就很简单，直接导出即可。

### 反向匹配

如 PC-QQ 无法导出表情类型的消息，更无法获取 `packName`、`desc`，所以所有表情都被视为图片类型被导出

这种情况可以自己收集表情包，根据表情的 MD5 去匹配导出的图片，从而修正图片类型并补充 `packName`、`desc`。

这是个苦力活，可以参考 [Shmily-Get-QQ-PC-MHT](https://github.com/lqzhgood/Shmily-Get-QQ-PC_MHT/tree/main/merger/data/qq-pc/face) 的表情文件集合，和 [Show-Modify-msg](https://github.com/lqzhgood/Shmily-Show/blob/main/docs/modify-msg.md) 辅助的实现。
