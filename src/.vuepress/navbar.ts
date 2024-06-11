import { navbar } from "vuepress-theme-hope";

export default navbar([
    "",
  {
    text: "指南",
    icon: "compass",
    link: "/guide/",
  },
  "/portfolio",
  {
    text: "框架",
    icon: "fire",
    prefix: "/framework/",
    children: [
      {
        text: "Spring",
        icon: "leaf",
        prefix:"spring/",
        children: [
          {
            text: "Spring系列",
            icon: "leaf",
            link: "README.md",
          },
        ],
      },
    ]
  },
  {
    text: "组件开发",
    icon: "puzzle-piece",
    children: [
      {
        text: "动态线程池",
        icon: "circle-nodes",
        link: "/component/dynamicthreadpool/dynamic_threadpool_01.md",
      },
    ]
  },
]);
