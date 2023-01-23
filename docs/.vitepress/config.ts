import { defineConfig } from 'vitepress';

export default defineConfig({
    base: '/',
    lastUpdated: true,

    title: 'Shmily',
    lang: 'zh-Hans-CN',
    description: 'Shmily docs',

    themeConfig: {
        logo: '/favicon.png',
        nav: [{ text: 'Demo', link: 'http://demo.shmily.lqzh.me/' }],
        sidebar: [
            {
                text: '介绍',
                items: [
                    { text: '这是啥', link: '/waht-is' },
                    { text: '理念', link: '/concept' },
                ],
            },
            {
                text: 'Get',
                items: [
                    {
                        text: 'Call_SMS',
                        items: [
                            { text: 'Android', link: 'https://github.com/lqzhgood/Shmily-Get-Call_SMS-Android' },
                            {
                                text: 'GoogleCalendar',
                                link: 'https://github.com/lqzhgood/Shmily-Get-Call_SMS-calendar_google_com',
                            },
                            { text: 'Item C', link: '/item-3' },
                        ],
                    },
                    { text: 'Camera', link: '/item-2' },
                    { text: 'EMAIL', link: '/item-3' },
                    // {
                    //     text: 'QQ',
                    //     items: [
                    //         { text: 'Mo', link: '/item-1' },
                    //         { text: 'Item B', link: '/item-2' },
                    //         { text: 'Item C', link: '/item-3' },
                    //     ],
                    // },
                    // {
                    //     text: 'Wechat',
                    //     items: [
                    //         { text: 'Mo', link: '/item-1' },
                    //         { text: 'Item B', link: '/item-2' },
                    //         { text: 'Item C', link: '/item-3' },
                    //     ],
                    // },
                ],
            },
            {
                text: 'Merger',
                items: [
                    { text: '这是啥', link: '/waht-is' },
                    { text: '理念', link: '/concept' },
                ],
            },
            {
                text: 'Show',
                items: [
                    { text: 'Web', link: '/introduction' },
                    { text: 'Server-Modify', link: '/getting-started' },
                ],
            },
            {
                text: 'Utils',
                items: [
                    { text: 'Web', link: '/introduction' },
                    { text: 'Server-Modify', link: '/getting-started' },
                ],
            },
        ],
        outlineTitle: 'In hac pagina',
        socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
        footer: {
            message: 'GPLv3 License.',
            copyright: 'Made by lqzh, Powered by <span style="color:red">♥</span>',
        },
        editLink: {
            pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
            text: 'Edit this page on GitHub',
        },
        lastUpdatedText: 'Updated Date',
        docFooter: {
            prev: '上一页',
            next: '下一页',
        },
    },
});
