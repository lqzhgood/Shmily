import{_ as n,c as s,a0 as e,o as p}from"./chunks/framework.BQKxUb7q.js";const u=JSON.parse('{"title":"Android 复制文件到电脑","description":"","frontmatter":{},"headers":[],"relativePath":"guide/setup-runtime/Android-copy.md","filePath":"guide/setup-runtime/Android-copy.md","lastUpdated":1755534142000}'),o={name:"guide/setup-runtime/Android-copy.md"};function t(i,a,d,l,c,r){return p(),s("div",null,a[0]||(a[0]=[e(`<h1 id="android-复制文件到电脑" tabindex="-1">Android 复制文件到电脑 <a class="header-anchor" href="#android-复制文件到电脑" aria-label="Permalink to &quot;Android 复制文件到电脑&quot;">​</a></h1><h2 id="说明" tabindex="-1">说明 <a class="header-anchor" href="#说明" aria-label="Permalink to &quot;说明&quot;">​</a></h2><p>Android 手机的文件夹大致如下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>- data // 保护区, 需要 root 权限</span></span>
<span class="line"><span>    - data</span></span>
<span class="line"><span>       - com.tencent.mm </span></span>
<span class="line"><span>       - ...</span></span>
<span class="line"><span>- sdcard // 非保护区, 用户可以直接访问</span></span>
<span class="line"><span>    - Android</span></span>
<span class="line"><span>      - data</span></span>
<span class="line"><span>        - com.tencent.mm</span></span>
<span class="line"><span>        - ...</span></span>
<span class="line"><span>    - tencent</span></span>
<span class="line"><span>        - MicroMsg</span></span>
<span class="line"><span>        - ...</span></span>
<span class="line"><span>    - ...</span></span></code></pre></div><p>在不考虑权限的情况下, 可以在手机与电脑在同一个局域网的情况下, 电脑通过 <code>FTP</code> 服务访问手机上的文件</p><div class="tip custom-block"><p class="custom-block-title">🎞️ 视频教程</p><p>// Android 通过 ftp 复制文件到电脑</p><p><a href="https://www.bilibili.com/video/BV1o94y1P7zo/" target="_blank" rel="noreferrer">https://www.bilibili.com/video/BV1o94y1P7zo/</a></p></div><h2 id="保护区文件" tabindex="-1">保护区文件 <a class="header-anchor" href="#保护区文件" aria-label="Permalink to &quot;保护区文件&quot;">​</a></h2><p>大部分应用会将自己的 <strong>数据</strong> 存放在手机的 <code>保护区</code>, 只有手机的最高管理员 <code>root</code> 可以访问</p><p>所以获取 <code>保护区</code> 文件的方式有两种</p><ul><li><a href="./Android-copy-root.html">获取 root 权限访问 <code>保护区</code> 的文件</a></li><li><a href="./Android-copy-backup.html">通过有权限的软件 (如系统备份) 获取 <code>保护区</code> 的文件</a></li></ul>`,10)]))}const m=n(o,[["render",t]]);export{u as __pageData,m as default};
