---
title: SpringBoot拆解之概述
category:
  - Spring
  - SpringBoot
  - 框架
order: 1
---
## 前言

本章我们开启SpringBoot系列的打怪升级任务。对于SpringBoot，我们上来就是一键三问。

- What：SpringBoot是什么？
- Why：我们为什么要学习或者使用它？
- How：我们怎么能用好它？

针对已经有开发经验的同学来说，这并不陌生，我们一起来回顾一下.

<!-- more -->

Spring Boot是由Pivotal团队（现在是VMware的一部分）开发的，它主要用于简化Spring应用程序的创建和部署过程的一个框架。为了让开发者更快速地启动和运行新的Spring项目，通过提供一系列默认配置来减少开发者需要编写的样板代码。

为什么我们要选择使用SpringBoot呢？换句话说，我们可能不得不选择。现在SpringBoot已经是Java技术栈下开发微服务的技术标准，它的简单配置以及三方插件的丰富度和兼容性为开发带来极大的便利，这也导致SpringBoot成为开发者掌握必备的技术框架。

至于我们能怎么用好它，对于在座的各位我相信已经都很熟练的运用了，不过我们的目的是尽可能的剖析这个框架思想，不仅仅停留在使用层面。尤其是面试中，对于这个框架也有很多绕不开的面试题。

## 特性

SpringBoot给我们提供了哪些易用的特性呢？

- 创建独立的Spring应用程序，通过https://start.spring.io即可以开始生成一个可运行的脚手架
- 直接嵌入Tomcat、Jetty或者Undertow运行jar包
- 简化配置，开箱即用
- 自动配置Spring和第三方库，也就是我们所说的AutoConfiguration
- 绝对无需代码生成，也不需要 XML 配置
- 提供生产就绪功能，例如指标、运行状况检查和外部化配置

## 源码结构

说了很多介绍，接下来我们来看SpringBoot的源码结构。

[SpringBoot官方Github地址]: https://github.com/spring-projects/spring-boot/tree/v2.3.4.RELEASE	"SpringBoot官方Github地址"

通过工程结构可以看到：

- buildSrc：官方团队写的一些gradle插件
- spring-boot-project：核心工程目录
- spring-boot-tests：一些测试相关的工程目录

![image-20240620235427258](https://img.shell101.com/miicoblog/image-20240620235427258.png)

我们的主要关注也是在第二个spring-boot-project目录中，我们再来看看这个目录中的内容。

<img src="http://img.codeagles.com/miicoblog/20240616170939.png" style="zoom:50%;" />

看起来内容好像不太多，不过它这里都是有嵌套结构的，我们可以按照setting.gradle定义的编译顺序来大致看看里面都有什么。

![settings.gradle](http://img.codeagles.com/miicoblog/20240616172120.png)

比如`spring-boot-dependencies`这个目录中没有源码，只有gradle的一些依赖，我们熟知的有AspectJ相关的，还有一些Commons Lang3，其他的感兴趣的可以自己打开看看。而比较重要的应该算是spring-boot目录了，打开spring-boot中的gradle看看里面还是有很多东西的，代码也很复杂。

![spring-boot-dependencies](https://img.shell101.com/miicoblog/image-20240620235517438.png)

![spring-boot的gradle配置](http://img.codeagles.com/miicoblog/image-20240616173217426.png)

而往下跟着工程目录往下看，能看到一个 spring-boot-starters目录，这个就是我们初始创建工程时接触较多的地方。

![image-20240620235709186](https://img.shell101.com/miicoblog/image-20240620235709186.png)

看到这我们可能都熟悉了，打开spring-boot-starter发现里面只有一个文件，就是build.gradle,里面定义了springboot初始的一些依赖项目。

![starters的gradle配置](http://img.codeagles.com/miicoblog/image-20240616173909326.png)顺带在打开比如我们熟悉的 spring-boot-starter-actuator或者spring-boot-starter-aop，里面也都类似，先引用了上面的spring-boot-starter，然后在引入一些自己相关需要的依赖包。到这我想对springboot源码的目录结构就有了一定的了解了。

## 结束

后续我们会按照模块对这些进行拆解，本章知道目录结构，每个目录大致做什么的，如何依赖的即可。