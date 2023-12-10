# Android 复制文件到电脑


## 说明

Android 手机的文件夹大致如下

```
- data // 保护区, 需要 root 权限
    - data
       - com.tencent.mm 
       - ...
- sdcard // 非保护区, 用户可以直接访问
    - Android
      - data
        - com.tencent.mm
        - ...
    - tencent
        - MicroMsg
        - ...
    - ...
```

在不考虑权限的情况下, 可以在手机与电脑在同一个局域网的情况下, 电脑通过 `FTP` 服务访问手机上的文件


## 保护区文件
大部分应用会将自己的 __数据__ 存放在手机的 `保护区`, 只有手机的最高管理员 `root` 可以访问
 
所以获取 `保护区` 文件的方式有两种

-   [获取 root 权限访问 `保护区` 的文件](./Android-copy-root.md)
-   [通过有权限的软件 (如系统备份) 获取 `保护区` 的文件](./Android-copy-backup.md)
