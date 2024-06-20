import { navbar } from "vuepress-theme-hope";

export default navbar([
  {
    text: "路书总览",
    icon: "zhinan",
    link: "/guide/",
  },
  { text: "技术书籍", icon: "book", link: "/books/" },
  {
    text: "开源项目",
    icon: "jihe",
    link: "/opensource/"
  },
  {
    text: "关于站点",
    icon: "guanyu",
    children: [
      {
        text: "关于作者",
        icon: "guanyu",
        link: "/portfolio.md",
      },
      {
        text: "动态更新",
        icon: "lishi",
        link: "/timeline/",
      },
    ]
  }
]);
