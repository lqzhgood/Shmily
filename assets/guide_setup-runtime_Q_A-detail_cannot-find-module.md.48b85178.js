import{_ as e,c as s,o as n,Q as a}from"./chunks/framework.93a61f05.js";const y=JSON.parse('{"title":"Cannot find module ‘xxxxxx’","description":"","frontmatter":{"title":"Cannot find module ‘xxxxxx’","author":"@appinn.com F124nk1e"},"headers":[],"relativePath":"guide/setup-runtime/Q&A-detail/cannot-find-module.md","filePath":"guide/setup-runtime/Q&A-detail/cannot-find-module.md","lastUpdated":1700302259000}'),l={name:"guide/setup-runtime/Q&A-detail/cannot-find-module.md"},o=a(`<div class="danger custom-block"><p class="custom-block-title">DANGER</p><p>Cannot find module ‘xxxxxx’</p></div><details><summary>报错详情</summary><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Error: Cannot find module &#39;fs-extra&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">Require stack:</span></span>
<span class="line"><span style="color:#e1e4e8;">- D:\\transfer_redmi\\AndroidQQ_MIUI\\Shmily-Get-MobileQQ-Andriod\\decode\\utils\\db.js</span></span>
<span class="line"><span style="color:#e1e4e8;">- D:\\transfer_redmi\\AndroidQQ_MIUI\\Shmily-Get-MobileQQ-Andriod\\tools\\exportTable.js</span></span>
<span class="line"><span style="color:#e1e4e8;">    at Module._resolveFilename (node:internal/modules/cjs/loader:1047:15)</span></span>
<span class="line"><span style="color:#e1e4e8;">    at Module._load (node:internal/modules/cjs/loader:893:27)</span></span>
<span class="line"><span style="color:#e1e4e8;">    at Module.require (node:internal/modules/cjs/loader:1113:19)</span></span>
<span class="line"><span style="color:#e1e4e8;">    at require (node:internal/modules/cjs/helpers:103:18)</span></span>
<span class="line"><span style="color:#e1e4e8;">    at Object.&lt;anonymous&gt; (D:\\transfer_redmi\\AndroidQQ_MIUI\\Shmily-Get-MobileQQ-Andriod\\decode\\utils\\db.js:8:12)</span></span>
<span class="line"><span style="color:#e1e4e8;">    at Module._compile (node:internal/modules/cjs/loader:1226:14)</span></span>
<span class="line"><span style="color:#e1e4e8;">    at Module._extensions..js (node:internal/modules/cjs/loader:1280:10)</span></span>
<span class="line"><span style="color:#e1e4e8;">    at Module.load (node:internal/modules/cjs/loader:1089:32)</span></span>
<span class="line"><span style="color:#e1e4e8;">    at Module._load (node:internal/modules/cjs/loader:930:12)</span></span>
<span class="line"><span style="color:#e1e4e8;">    at Module.require (node:internal/modules/cjs/loader:1113:19) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  code: &#39;MODULE_NOT_FOUND&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  requireStack: [</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;D:\\\\transfer_redmi\\\\AndroidQQ_MIUI\\\\Shmily-Get-MobileQQ-Andriod\\\\decode\\\\utils\\\\db.js&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;D:\\\\transfer_redmi\\\\AndroidQQ_MIUI\\\\Shmily-Get-MobileQQ-Andriod\\\\tools\\\\exportTable.js&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">  ]</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Node.js v18.14.0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Error: Cannot find module &#39;fs-extra&#39;</span></span>
<span class="line"><span style="color:#24292e;">Require stack:</span></span>
<span class="line"><span style="color:#24292e;">- D:\\transfer_redmi\\AndroidQQ_MIUI\\Shmily-Get-MobileQQ-Andriod\\decode\\utils\\db.js</span></span>
<span class="line"><span style="color:#24292e;">- D:\\transfer_redmi\\AndroidQQ_MIUI\\Shmily-Get-MobileQQ-Andriod\\tools\\exportTable.js</span></span>
<span class="line"><span style="color:#24292e;">    at Module._resolveFilename (node:internal/modules/cjs/loader:1047:15)</span></span>
<span class="line"><span style="color:#24292e;">    at Module._load (node:internal/modules/cjs/loader:893:27)</span></span>
<span class="line"><span style="color:#24292e;">    at Module.require (node:internal/modules/cjs/loader:1113:19)</span></span>
<span class="line"><span style="color:#24292e;">    at require (node:internal/modules/cjs/helpers:103:18)</span></span>
<span class="line"><span style="color:#24292e;">    at Object.&lt;anonymous&gt; (D:\\transfer_redmi\\AndroidQQ_MIUI\\Shmily-Get-MobileQQ-Andriod\\decode\\utils\\db.js:8:12)</span></span>
<span class="line"><span style="color:#24292e;">    at Module._compile (node:internal/modules/cjs/loader:1226:14)</span></span>
<span class="line"><span style="color:#24292e;">    at Module._extensions..js (node:internal/modules/cjs/loader:1280:10)</span></span>
<span class="line"><span style="color:#24292e;">    at Module.load (node:internal/modules/cjs/loader:1089:32)</span></span>
<span class="line"><span style="color:#24292e;">    at Module._load (node:internal/modules/cjs/loader:930:12)</span></span>
<span class="line"><span style="color:#24292e;">    at Module.require (node:internal/modules/cjs/loader:1113:19) {</span></span>
<span class="line"><span style="color:#24292e;">  code: &#39;MODULE_NOT_FOUND&#39;,</span></span>
<span class="line"><span style="color:#24292e;">  requireStack: [</span></span>
<span class="line"><span style="color:#24292e;">    &#39;D:\\\\transfer_redmi\\\\AndroidQQ_MIUI\\\\Shmily-Get-MobileQQ-Andriod\\\\decode\\\\utils\\\\db.js&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    &#39;D:\\\\transfer_redmi\\\\AndroidQQ_MIUI\\\\Shmily-Get-MobileQQ-Andriod\\\\tools\\\\exportTable.js&#39;</span></span>
<span class="line"><span style="color:#24292e;">  ]</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Node.js v18.14.0</span></span></code></pre></div></details><h5 id="解决办法" tabindex="-1">解决办法 <a class="header-anchor" href="#解决办法" aria-label="Permalink to &quot;解决办法&quot;">​</a></h5><p><code>nodejs</code> 没有安装依赖, 参考 <a href="./../nodejs.html">setup-nodejs</a></p>`,4),p=[o];function d(t,r,i,c,u,m){return n(),s("div",null,p)}const Q=e(l,[["render",d]]);export{y as __pageData,Q as default};
