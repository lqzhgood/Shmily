# 数据文件

为了 [Get](./get.md) 和 [Show](./show.md) 的良好沟通, 所以需要标准化数据格式

```json
[{

    ⬇⬇⬇⬇⬇⬇  通用字段 ⬇⬇⬇⬇⬇⬇⬇

    "source": "MobileQQ",    // 数据来源
    "device": "OnePlus 3T",  // 设备名称
    "type": "自定义表情",     // 消息类型
    "direction": "come",     // (以自己为基准的)发送方向  go 代表自己发出,在右边   come 代表对方发出,在左边
    "sender": "1111111111",  // 发送方号码  direction=go 为自己 direction=come 为对方
    "senderName": "fish",    // 发送方名称  direction=go 为对方 direction=come 为自己
    "receiver": "00000000",  // 接受发号码
    "receiverName": "null",  // 接收方名称
    "day": "2017-12-22",     // 发送日期 由 ms 计算得出, 仅为降低运行时计算
    "time": "08:53:33",      // 发送时间 由 ms 计算得出, 仅为降低运行时计算
    "ms": 1513904013000,     // 发送时间戳 精确到 ms, 时间以 ms 字段为准,
    "content": "[甜橙少女新年系列-吃饺子]", // 内容纯文本, 用于 搜索 及 数据分析 , 因此可以和 html 字段不一致
    "html": "[甜橙少女新年系列-吃饺子]",    // 内容HTML富文本. 用于展示. 简单的内容可以直接用 html 在 Show 中表示,
                                          // 如果内容复杂, 建议在 Show 中使用组件读取 $Source.data 数据

    ⬇⬇⬇⬇⬇⬇  补充字段 ⬇⬇⬇⬇⬇⬇⬇
    // 如数据复杂, 可以放在补充数据中
    // 字段名约定使用  $source, 如本例 source='MobileQQ', 此字段名则为 $MobileQQ  (本来想统一成 $Extend, 但是太多项目耦合broken, 没法改了)

    "$MobileQQ": {
        // !!! 必须 !!! 细分类型, 如 Android 和 IOS 可能数据不一致, Show 通过此字段进行区分表达
        "os": "Android",

        // 数据库原始数据导出
        // 保留所有相关的数据,不要进行删减, 给他人留下'其他'可能性
        // 也给完整解密留下空间
        // 不差这么点空间
        "raw": {
            "msgData": {"type": "Buffer"},
            ……
        },

        // 解密后的数据
        "decode": {
            msgData:{} // 数据库相应字段解密

            // 解密过程中有帮助的值或备注
            key: '123123',
            offset: 10,
            ...
        }

        // 前端展示需要的数据
        // 简单的数据可以直接写 html 字段
        // 复杂的如 微信分享卡片 建议在 Show 中写好组件, 然后读取下面数据填充
        data:{
            "webUrl": "/data/qq-android-lqzh/emoticon/5e671f8149d1b094c44aa0f5232f9cfd.gif",
            "packName": "甜橙少女新年系列",
            "desc": "吃饺子",
            "mark": "过年喽，想要的祝福全在这里"
        },

        // 资源文件 根文件夹   /data/ $rootPath /emoticon/5e671f8149d1b094c44aa0f5232f9cfd.gif
        rootPath: `qq-android-lqzh`,
    },

    // 开发过程相关值,
    // 此处赋值可以随意, 在 Show 的预处理中 $Dev 将被删除
    "$Dev": {
        msAccuracy: false // 如 QQ-PC 时间无法精确到 ms ,不能去重时当 ID 使用
        numberIsTrue: true // 我借同学号码发的短信, 虽然不是我的号码, 但我确定此条消息不被过滤
        ...
    }

    ⬇⬇⬇⬇⬇⬇  自动生成字段 ⬇⬇⬇⬇⬇⬇⬇

    // ID 需确保每条消息的唯一性
    // Show 里的评论和修改都依靠ID才能定位消息
    // ID 结构由  $filename_YYYY-MM-DD_HH-mm-ss_$direction_$md5_$num 组成

    // 1. $filename 为当前消息所在的文件名
    // 2. 消息的 $day_$time
    // 3. 消息的 $direction g(o) 或者 c(ome)
    // 4. html字段的 MD5值前 6 位
    // 5. 重复消息的出现次数 (同一个人同一时间发送同样内容刷屏时,1-4并不能保证ID唯一, 所以$num值用来标记前4个拼接相同情况下的第几条 )

    // 使用下划线拼接以上, 组成了当前消息的 ID
    "id": "camera.json_2009-09-25_10-33-02_g_11e351_1",
    // 所有消息合并后, 按时间线排序第几条消息
    "index": 123
}]
```

建议开发 [Get](./get.md) 时按以上数据标准导出.

因为项目持续了近 3 年, 所以我写的很多早期 [Get](./get.md) 并未遵循以上标准, 我会慢慢重构的.
