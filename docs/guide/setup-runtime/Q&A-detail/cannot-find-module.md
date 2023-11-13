---
title: Cannot find module ‘xxxxxx’
author: '@appinn.com F124nk1e'
---

::: danger
Cannot find module ‘xxxxxx’
:::

<details> <summary>报错详情</summary>

```
Error: Cannot find module 'fs-extra'
Require stack:
- D:\transfer_redmi\AndroidQQ_MIUI\Shmily-Get-MobileQQ-Andriod\decode\utils\db.js
- D:\transfer_redmi\AndroidQQ_MIUI\Shmily-Get-MobileQQ-Andriod\tools\exportTable.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1047:15)
    at Module._load (node:internal/modules/cjs/loader:893:27)
    at Module.require (node:internal/modules/cjs/loader:1113:19)
    at require (node:internal/modules/cjs/helpers:103:18)
    at Object.<anonymous> (D:\transfer_redmi\AndroidQQ_MIUI\Shmily-Get-MobileQQ-Andriod\decode\utils\db.js:8:12)
    at Module._compile (node:internal/modules/cjs/loader:1226:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1280:10)
    at Module.load (node:internal/modules/cjs/loader:1089:32)
    at Module._load (node:internal/modules/cjs/loader:930:12)
    at Module.require (node:internal/modules/cjs/loader:1113:19) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [
    'D:\\transfer_redmi\\AndroidQQ_MIUI\\Shmily-Get-MobileQQ-Andriod\\decode\\utils\\db.js',
    'D:\\transfer_redmi\\AndroidQQ_MIUI\\Shmily-Get-MobileQQ-Andriod\\tools\\exportTable.js'
  ]
}

Node.js v18.14.0
```

</details>

##### 解决办法

`nodejs` 没有安装依赖, 参考 [setup-nodejs](../nodejs.md)
