---
layout: home

hero:
    name: SHMILY
    text: 历史的归档
    tagline: QQ、Wechat、SMS、Email……
    image:
        src: ./favicon.png
        alt: icon
    actions:
        - theme: brand
          text: 开始文档
          link: /guide/what-is
        - theme: alt
          text: Demo演示
          link: http://demo.shmily.lqzh.me/
# features:
#     - icon: 🎯
#       title: 多来源
#       details: 时间线合并查看
#     - icon: 🛠️
#       title: 可编辑与评论
#       details: 给历史做上标记
#     - icon: 📈
#       title: 大数据图表统计
#       details: 换个角度看看
---

<style>
.VPHome {
    background: radial-gradient(transparent,rgba(0,0,0,.3)),url(./assets/bg.jpg);
    background-attachment: fixed;
    background-size: cover;
}
</style>

<style scoped lang="sass">
#features
    margin: 0 auto
    max-width: 1000px
    background: rgba(255,255,255,0.7)
    padding: 0 20px
    box-sizing: content-box
    border-radius: 10px
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    .row
        justify-content: center
        display: flex
        padding: 20px 0
        border-bottom: 1px solid #aaa
        &:nth-child(even)
            flex-direction: row-reverse
            .info
                text-align: right
        &:last-child
            border-bottom: none
        .info
            flex: 1 1 auto
            display: flex
            align-items: center
            .title
                font-weight: bold
                font-size: 18px
            .content
                margin-bottom: 20px
                width: 100%
                p
                    font-size: 16px
                    margin: 10px 0
                .tips
                    font-size: 12px
                    color: #333
                    font-style: italic
                a
                    color: rgb(52, 81, 178)
                    text-decoration: underline
                    padding: 0 5px
                    font-weight: bold
                    font-style: italic
        .cover
            flex: 0 0 auto
            img
                display: inline-block
                width: 100%

@media (max-width: 960px)
    #features
        .row
            flex-direction: column !important
            .info, .cover
                text-align: center !important
                padding: 0 !important
</style>


<div id="features">
    <div class="row">
        <div class="info">
            <div class="content">
                <h2 class="title">类型多 平台全</h2>
                <div>
                    <p>QQ、MobileQQ、微信、通话记录、短信、照片视频、Email等各种类型</p>
                    <P>PC、Android、iOS 等各种平台</P>
                    <p class="tips">* 甚至 Nokia Symbian S60v3 的 MobileQQ 和 短信都可以！</p>
                </div>
            </div>
        </div>
        <div class="cover">
            <img src="./assets/f1.png" style=" max-width: 240px;" />
        </div>
    </div>
    <div class="row">
        <div class="info">
            <div class="content">
                <h2 class="title">以前导出的能合并</h2>
                <div>
                    <p>支持将以前导出的数据和现在合并</p>
                    <p>历史不再断代</p>
                    <p class="tips">* 如2013年导出记录（2000-2013）可以<br />和2020年导出记录（2007-2020）合并<br />在同一时间线查看</p>
                </div>
            </div>
        </div>
        <div class="cover">
            <img src="./assets/f2.png" style="max-width: 500px;" />
        </div>
    </div>
    <div class="row">
        <div class="info">
            <div class="content">
                <h2 class="title">支持搜索和筛选</h2>
                <div>
                    <p>关键词（支持正则）搜索</p>
                    <P>时间、类型、设备、人物、通话时长等筛选</P>
                    <p class="tips">* 搜索支持正则，人物支持分组</p>
                    <p class="tips">* 极致优化，240M数据复杂搜索100ms内出结果</p>
                </div>
            </div>
        </div>
        <div class="cover">
            <img src="./assets/f3.png" style=" max-width: 600px;" />
        </div>
    </div>
    <div class="row">
        <div class="info">
            <div class="content">
                <h2 class="title">还有评论和引用</h2>
                <div>
                    <p>时间的长河有感而发？添加一条评论或打上一个Tag吧</p>
                    <p>引用的消息也会转化为双向链接可快速跳转</p>
                    <p class="tips">* 评论也可以搜索哦</p>
                </div>
            </div>
        </div>
        <div class="cover">
            <img src="./assets/f4.png" style="max-width: 500px;" />
        </div>
    </div>
    <div class="row">
        <div class="info">
            <div class="content">
                <h2 class="title">图表与统计</h2>
                <div>
                    <p>不想看看各种维度的大数据么？</p>
                    <P>纯表情回复的数量与对比都有哦！</P>
                    <p class="tips">* 评论里的 Tag 也有统计，开心的次数不能少</p>
                </div>
            </div>
        </div>
        <div class="cover">
            <img src="./assets/f5.png" style=" max-width: 600px;" />
        </div>
    </div>
    <div class="row">
        <div class="info">
            <div class="content">
                <h2 class="title">开发</h2>
                <div>
                    <p>深入底层<a href="https://github.com/lqzhgood/Shmily-Show/blob/main/docs/Q_A.md" target="_blank">优化</a>，240M数据纯前端静态处理</p>
                    <p>你还想要归档钉钉？导出（Get）、显示（Show）分离，你可以在任意阶段发力</p>
                    <p>标准化、模块化、组件化，开发更容易</p>
                    <p>数据字段全导出，总有你能用上的</p>
                    <p>数据库导出、解密转换、合并清洗全过程解耦，拆开都是小轮子，自己的车装上就能跑</p>
                </div>
            </div>
        </div>
        <div class="cover">
            <img src="./assets/f6.jpg" style="max-width: 300px;" />
        </div>
    </div>
</div>
