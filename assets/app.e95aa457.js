import{s as o,a4 as i,a5 as p,a6 as u,a7 as c,a8 as l,a9 as f,aa as d,ab as m,ac as h,ad as A,ae as g,d as P,u as v,j as y,y as C,af as w,ag as _,ah as b,ai as E}from"./chunks/framework.19f3d494.js";import{t as R}from"./chunks/theme.a5d90da3.js";function r(e){if(e.extends){const a=r(e.extends);return{...a,...e,async enhanceApp(t){a.enhanceApp&&await a.enhanceApp(t),e.enhanceApp&&await e.enhanceApp(t)}}}return e}const s=r(R),D=P({name:"VitePressApp",setup(){const{site:e}=v();return y(()=>{C(()=>{document.documentElement.lang=e.value.lang,document.documentElement.dir=e.value.dir})}),w(),_(),b(),s.setup&&s.setup(),()=>E(s.Layout)}});async function j(){const e=S(),a=O();a.provide(p,e);const t=u(e.route);return a.provide(c,t),a.component("Content",l),a.component("ClientOnly",f),Object.defineProperties(a.config.globalProperties,{$frontmatter:{get(){return t.frontmatter.value}},$params:{get(){return t.page.value.params}}}),s.enhanceApp&&await s.enhanceApp({app:a,router:e,siteData:d}),{app:a,router:e,data:t}}function O(){return m(D)}function S(){let e=o,a;return h(t=>{let n=A(t);return n?(e&&(a=n),(e||a===n)&&(n=n.replace(/\.js$/,".lean.js")),o&&(e=!1),g(()=>import(n),[])):null},s.NotFound)}o&&j().then(({app:e,router:a,data:t})=>{a.go().then(()=>{i(a.route,t.site),e.mount("#app")})});export{j as createApp};