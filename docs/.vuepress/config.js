import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
    base: "/",
    // 请不要忘记设置默认语言
    lang: 'zh-CN',
    theme: plumeTheme({
        // more...
        search: {
            // more options
        },
        avatar: {
            url: '/blogger.png',
            name: 'Miico',
            description: "",
            circle: true, // 是否为圆形头像
        },
        navbar: [
            { text: '首页', link: '/', icon: 'material-symbols:home-outline' },
            { text: '博客', link: '/blog/', icon: 'material-symbols:article-outline' },
            { text: '技术手册', link: '/component/', icon: 'material-symbols:article-outline' },
            { text: 'Github', link: 'https://github.com/codeagles', icon: 'material-symbols:notifications' },
            { text: '关于我', link: '/about/', icon: 'material-symbols:face' },
        ],
        notes: {
            dir: '/notes/', // 声明所有笔记的目录
            link: '/', // 声明所有笔记默认的链接前缀， 默认为 '/'
            notes: [
                {
                    dir: 'component', // 声明笔记的目录，相对于 `notes.dir`
                    link: '/component/', // 声明笔记的链接前缀
                    sidebar: [ // 配置侧边栏
                        {
                            text: '动态线程池',
                            icon: 'mdi:language-typescript', // 侧边栏图标
                            items: ['1','2','3'] // 简化写法，主题会自动补全为 `foo.md`
                        }
                    ]
                },
                {
                    dir: 'about', // 声明笔记的目录，相对于 `notes.dir`
                    link: '/about/', // 声明笔记的链接前缀
                    sidebar: [ // 配置侧边栏
                        {
                            text: '关于我',
                            icon: 'mdi:language-typescript', // 侧边栏图标
                            items: [''] // 简化写法，主题会自动补全为 `foo.md`
                        }
                    ]
                },

            ],
        }
    }),
    bundler: viteBundler(),

})