import{_ as n,c as s,o as a,R as e}from"./chunks/framework.xvtSDt2M.js";const h=JSON.parse('{"title":"Cannot find module ‘xxxxxx’","description":"","frontmatter":{"title":"Cannot find module ‘xxxxxx’","author":"@appinn.com F124nk1e"},"headers":[],"relativePath":"guide/setup-runtime/Q&A-detail/cannot-find-module.md","filePath":"guide/setup-runtime/Q&A-detail/cannot-find-module.md","lastUpdated":1702180139000}'),l={name:"guide/setup-runtime/Q&A-detail/cannot-find-module.md"},d=e(`<div class="danger custom-block"><p class="custom-block-title">DANGER</p><p>Cannot find module ‘xxxxxx’</p></div><details><summary>报错详情</summary><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>Error: Cannot find module &#39;fs-extra&#39;</span></span>
<span class="line"><span>Require stack:</span></span>
<span class="line"><span>- D:\\transfer_redmi\\AndroidQQ_MIUI\\Shmily-Get-MobileQQ-Andriod\\decode\\utils\\db.js</span></span>
<span class="line"><span>- D:\\transfer_redmi\\AndroidQQ_MIUI\\Shmily-Get-MobileQQ-Andriod\\tools\\exportTable.js</span></span>
<span class="line"><span>    at Module._resolveFilename (node:internal/modules/cjs/loader:1047:15)</span></span>
<span class="line"><span>    at Module._load (node:internal/modules/cjs/loader:893:27)</span></span>
<span class="line"><span>    at Module.require (node:internal/modules/cjs/loader:1113:19)</span></span>
<span class="line"><span>    at require (node:internal/modules/cjs/helpers:103:18)</span></span>
<span class="line"><span>    at Object.&lt;anonymous&gt; (D:\\transfer_redmi\\AndroidQQ_MIUI\\Shmily-Get-MobileQQ-Andriod\\decode\\utils\\db.js:8:12)</span></span>
<span class="line"><span>    at Module._compile (node:internal/modules/cjs/loader:1226:14)</span></span>
<span class="line"><span>    at Module._extensions..js (node:internal/modules/cjs/loader:1280:10)</span></span>
<span class="line"><span>    at Module.load (node:internal/modules/cjs/loader:1089:32)</span></span>
<span class="line"><span>    at Module._load (node:internal/modules/cjs/loader:930:12)</span></span>
<span class="line"><span>    at Module.require (node:internal/modules/cjs/loader:1113:19) {</span></span>
<span class="line"><span>  code: &#39;MODULE_NOT_FOUND&#39;,</span></span>
<span class="line"><span>  requireStack: [</span></span>
<span class="line"><span>    &#39;D:\\\\transfer_redmi\\\\AndroidQQ_MIUI\\\\Shmily-Get-MobileQQ-Andriod\\\\decode\\\\utils\\\\db.js&#39;,</span></span>
<span class="line"><span>    &#39;D:\\\\transfer_redmi\\\\AndroidQQ_MIUI\\\\Shmily-Get-MobileQQ-Andriod\\\\tools\\\\exportTable.js&#39;</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Node.js v18.14.0</span></span></code></pre></div></details><h5 id="解决办法" tabindex="-1">解决办法 <a class="header-anchor" href="#解决办法" aria-label="Permalink to &quot;解决办法&quot;">​</a></h5><p><code>nodejs</code> 没有安装依赖, 参考 <a href="./nodejs.html">nodejs</a> <code>2.安装依赖</code></p>`,4),o=[d];function p(t,i,r,c,u,m){return a(),s("div",null,o)}const x=n(l,[["render",p]]);export{h as __pageData,x as default};
