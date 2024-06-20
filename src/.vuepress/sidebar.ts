import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/opensource/": "structure",
  "/book/": "structure",
  "/": [
    {
      text: "Java",
      icon: "java",
      prefix: "java/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "常用框架",
      icon: "kuangjiaguanli1",
      prefix: "framework/",
      collapsible: true,
      children: [
        {
          text: "Spring&SpringBoot",
          prefix: "springboot/",
          icon: "spring_boot",
          collapsible: true,
          children: [
            {
              text: "SpringBoot系列",
              icon: "spring_boot",
              collapsible: true,
              children: "structure",
            }
          ]
        },
      ],
    },
    {
      text: "数据结构&算法",
      icon: "shujuku",
      prefix: "database/",
      collapsible: true,
      children: [
        {
          text: "MySQL",
          prefix: "mysql/",
          icon: "mysql",
          children: [

          ]
        },
      ],
    },
    {
      text: "数据库",
      icon: "shujuku",
      prefix: "database/",
      collapsible: true,
      children: [
        {
          text: "MySQL",
          prefix: "mysql/",
          icon: "mysql",
          children: [

          ]
        },
      ],
    },
    {
      text: "组件开发",
      icon: "zujian",
      prefix: "component/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "开发工具",
      icon: "gongju-",
      prefix: "tools/",
      collapsible:true,
      children: [
        {
          text: "环境搭建",
          icon: "mac",
          collapsible:true,
          children:"structure",
        }
      ],
    },
  ],
});
