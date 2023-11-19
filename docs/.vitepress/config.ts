import { defineConfig } from 'vitepress';

const base = '/Shmily/';

export default defineConfig({
    base,
    lastUpdated: true,

    head: [
        ['link', { rel: 'icon', type: 'image/png', href: `${base}favicon.png` }],
        [
            'script',
            {},
            `
                var _hmt = _hmt || [];
                (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?60e54595ff123446b362c8cc5d3c0617";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
                })();
            `,
        ],
        // [
        //     "style",
        //     {},
        //     `
        //         body {
        //             background: radial-gradient(transparent,rgba(0,0,0,.3)),url(./assets/bg.jpg);
        //             background-attachment: fixed;
        //         }
        //     `
        // ]
    ],

    title: 'Shmily',
    lang: 'zh-Hans-CN',
    description: 'Shmily docs',

    themeConfig: {
        logo: '/favicon.png',
        nav: [{ text: 'Demo演示地址', link: 'http://demo.shmily.lqzh.me/' }],
        sidebar: [
            {
                text: '指南',
                items: [
                    { text: '这是啥', link: '/guide/what-is' },
                    { text: '理念', link: '/guide/concept' },
                ],
            },
            {
                text: '使用说明',
                items: [
                    { text: '开始吧', link: '/guide/use/begin' },
                    { text: 'Get', link: '/guide/use/get' },
                    { text: 'Merger', link: '/guide/use/merger' },
                    { text: 'Show', link: '/guide/use/show' },
                ],
            },
            {
                text: '运行时环境的安装',
                collapsed: true,
                items: [
                    { text: 'nodejs', link: '/guide/setup-runtime/nodejs' },
                    { text: 'python', link: '/guide/setup-runtime/python' },
                    { text: 'java', link: '/guide/setup-runtime/java' },
                    { text: 'php', link: '/guide/setup-runtime/php' },
                    { text: 'docker', link: '/guide/setup-runtime/docker' },
                    { text: '常见问题', link: '/guide/setup-runtime/Q&A' },
                ],
            },
            {
                text: '开发-数据格式',
                items: [
                    {
                        text: 'Shmily-Msg',
                        collapsed: true,
                        items: [
                            {
                                text: '标准',
                                link: '/guide/use/msg/schema',
                            },
                            {
                                text: '示例',
                                link: '/guide/use/msg/template/index',
                            },
                            {
                                text: '自定义',
                                link: '/guide/use/msg/custom',
                            },
                            {
                                text: '其他',
                                collapsed: true,
                                items: [
                                    {
                                        text: '表情数据',
                                        link: '/guide/use/msg/other/emotion',
                                    },
                                ],
                            },
                        ],
                    },
                    { text: 'Shmily-Data', link: '/guide/use/data' },
                ],
            },
            {
                text: '其他',
                items: [
                    { text: '感谢', link: '/guide/other/thanks' },
                    {
                        text: '捐赠',
                        link: '/guide/other/donation',
                        collapsed: true,
                        items: [
                            {
                                text: '门票公示',
                                link: '/guide/other/donation_list',
                            },
                        ],
                    },
                ],
            },
        ],
        outlineTitle: '这一页',
        socialLinks: [{ icon: 'github', link: 'https://github.com/lqzhgood/Shmily' }],
        footer: {
            message: 'GPLv3 License.',
            copyright: 'Made by lqzh, Powered by <span style="color:red">♥</span>',
        },
        editLink: {
            pattern: 'https://github.com/lqzhgood/Shmily/edit/main/docs/:path',
            text: 'Edit this page on GitHub',
        },
        lastUpdatedText: 'Updated Date',
        docFooter: {
            prev: '上一页',
            next: '下一页',
        },
    },

    vite: {
        ssr: {
            noExternal: ['vue-select'],
        },
    },
});
