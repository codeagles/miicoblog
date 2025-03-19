import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "码海拾贝",
  description: "Miico的博客-码海拾贝",

  theme,
  head: [
    [
      "script",
      {
        "data-ad-client": "ca-pub-3132583005274003",
        async: true,
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3132583005274003"
      }
    ]
  ]

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
