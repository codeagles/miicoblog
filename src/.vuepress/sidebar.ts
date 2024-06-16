import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/component/dynamicthreadpool/": "structure",
  "/framework/spring/": "structure",
  "/": [
    "",
    {
      text: "指南",
      icon: "compass",
      prefix: "guide/",
      link: "guide/",
    },
    "portfolio",
    {
      text: "框架",
      icon: "fire",
      prefix: "framework/",
      children: "structure",
    },
    {
      text: "组件开发",
      icon: "fire",
      prefix: "component/",
      children: [
        {
          text: "动态线程池",
          icon: "fire",
          prefix: "component/",
          link: "dynamicthreadpool/",
          children: "structure",
        }
      ],
    },
    {
      text: "案例",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    {
      text: "推荐书籍",
      icon: "book",
      prefix: "book/",
      link: "book/",
      children: "structure",
    },
  ],
});
