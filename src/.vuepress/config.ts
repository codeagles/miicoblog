import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "码海拾贝",
  description: "Miico的博客-码海拾贝",

  theme,



  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
