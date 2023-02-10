# 资源文件

### 路径说明

资源文件路径为 `/data/$rootPath/$type/$file`, 例如 `/data/Wechat-20200101/img/123.jpg`

其中 $rootPath 可以在 [Get](./get.md) 项目的 `config.js` 配置.

### 修改补充

如资源错误或补充, 可以通过 Web `ModifyServer` 手动修改, 上传的文件会放置到 `manual` 下, 如 `/data/Wechat-20200101/img/manual/123.jpg`

### 评论资源

评论资源会通过 Web `ModifyServer` 上传到 `/data/comment/$msgId/123.jpg`
