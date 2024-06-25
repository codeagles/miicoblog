---
title: SpringFramework5.0特性@Indexed注解
category:
  - Spring
  - 框架
head:
  - - meta
    - name: description
      content: SpringFramework5.0特性 @Indexed注解
---
## 新注解@Indexed

在Spring-Framework5.0时增加了一个新功能：支持候选组件索引（作为类路径扫描的替代方法）。[官方说明](https://docs.spring.io/spring-framework/docs/5.2.6.RELEASE/spring-framework-reference/core.html#beans-scanning-index)

![image-20240625222650503](https://img.shell101.com/miicoblog/image-20240625222650503.png)官方解释是：虽然类路径扫描速度非常快，但可以通过在编译时创建候选的静态列表来提高大型应用程序的启动性能。在此模式下，作为组件扫描目标的所有模块都必须使用此机制。

那么这东西有什么用呢？怎么用呢？

### 使用场景

**@ComponentScan包中的bean过多，程序启动时间过长**

我们一般会在启动类上配置`@ComponentScan`来扫描要注册的package，而package里的类越多，Spring在扫描解析的耗时就会越长，这也是官方说的意思，“虽然类路径扫描速度非常快”，依然还是会有大量的bean需要在启动时候进行扫描装载。

#### 使用方式

若要使用候选组件索引，需要在引入一个依赖：

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context-indexer</artifactId>
        <version>5.2.6.RELEASE</version>
        <optional>true</optional>
    </dependency>
</dependencies>
```

该过程将生成一个包含在 jar 文件中 `META-INF/spring.components` 的文件。这个文件中就会包含生成的索引信息。

我们新建一个空的springboot项目，没有导入这个依赖时，进行一下编译：

![image-20240625230625058](https://img.shell101.com/miicoblog/image-20240625230625058.png)

可以看到生成的target目录中，就是简单的工程编译后的文件，接下来我们在pom中导入这个依赖再次进行编译。

![image-20240625230815090](https://img.shell101.com/miicoblog/image-20240625230815090.png)

可以看到该过程将生成一个包含在 jar 文件中 `META-INF/spring.components` 的文件，这个就是索引信息的文件。

### 注解@Index的使用方式

**引入`spring-context-indexer`依赖后，自动生成候选组件索引**。我们来做一个测试，在工程中分别创建我们开发时常用的类，

- CacheService：用@Component修饰
- ToolConfig：用@Configuration修饰
- TestController：用@RestController修饰
- StudentDao：用@Repository修饰
- ThirdProxy：普通类不加任何注解修饰
- TestService：用@Service修饰
- SpringApplication：启动类默认@SpringBootApplication修饰

![image-20240626000300680](https://img.shell101.com/miicoblog/image-20240626000300680.png)

工程结构如图示，然后我们编译一下项目，看生成`META-INF/spring.components`里都有什么内容。

![image-20240626000442096](https://img.shell101.com/miicoblog/image-20240626000442096.png)

可以看到生成的索引中包含了6个类，只有没有任何注解修饰的普通类ThirdProxy类没有生成索引，而且不是说引入了新的注解@Indexed吗？项目中也没有用，怎么就生成了索引了呢？而且value都是`org.springframework.stereotype.Component`

好，我们接下来看每个注解里面都有什么。其实熟悉Spring注解机制的已经知道了，其实以上的注解都是Spring的@Component注解的派生注解。

比如@RestController：

<img src="https://img.shell101.com/miicoblog/image-20240626000656663.png" alt="image-20240626000656663" style="zoom:50%;" />

可以看到是@Controller注解修饰的，那么我们再看@Controller注解：

<img src="https://img.shell101.com/miicoblog/image-20240626000803089.png" alt="image-20240626000803089" style="zoom:50%;" />

我们就可以看到@Controller注解是被@Component注解修饰的。如法查看，我们会发现@Configuration、@Controller(@RestController)、@Repository、@Service都是由@Component注解修饰的。我们再看一下@Component有什么东西。

![image-20240626001231881](https://img.shell101.com/miicoblog/image-20240626001231881.png)

发现在SpringFramework5.x中，@Component是被@Indexed修饰的，这就解释了为什么我们引入了`spring-context-indexer`后，工程中被那5种注解修饰的类，会自动被添加到索引文件`META-INF/spring.components`中了。

到此，我们就已经会用这个注解了。