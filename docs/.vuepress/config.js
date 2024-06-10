import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
    // 请不要忘记设置默认语言
    lang: 'zh-CN',
    theme: plumeTheme({
        // more...
        search: {
            // more options
        },
        navbar: [
            { text: '首页', link: '/', icon: 'material-symbols:home-outline' },
            { text: '博客', link: '/blog/', icon: 'material-symbols:article-outline' },
            { text: 'Github', link: 'https://github.com/codeagles', icon: 'material-symbols:notifications' },
            { text: '关于我', link: '/about', icon: 'material-symbols:face' },
        ]
    }),
    bundler: viteBundler(),

})