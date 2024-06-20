---
title: jenv管理多版本JDK
category:
  - 工具
tags:
  - jdk
  - jenv
  - maven
  - mac
---
## MacOS使用jenv管理多版本JDK、Maven动态关联JDK配置

本文介绍一下，在MacOS下如何通过jenv管理多版本JDK，以及安装Maven之后如何动态关联生效的JDK。
<!-- more -->

### 一、安装环境

1. 首先，安装Homebrew，在终端中执行下面命令。

   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

   Homebrew是macOS（或 Linux）缺少的包管理器，可很简单的通过命令安装很多软件，比如想安装wget，直接终端执行`brew install wget` 等待完成就可以了。如果还想了解Homebrew还能做哪些事，可以移步官网https://brew.sh

2. 通过homebrew安装jdk管理器jenv

```bash
#安装jenv管理器
brew install jenv
#向.zshrc文件写入环境变量
echo 'export PATH="$HOME/.jenv/bin:$PATH"'>>~/.zshrc
echo 'eval "$(jenv init -)"' >>~/.zshrc
```
安装完成后，可以使用命令`jenv doctor`查看一下是否安装成功。

<img src="https://img.shell101.com/miicoblog/image-20240617225034793.png" style="zoom:50%;" />

如果第一行出现报错，没关系是因为系统没有安装JDK导致的。

3. 安装JDK

   ```
   #查看可安装的java列表
   brew search java
   # 如果最新版就直接java，如果需要指定版本就填写带版本的，比如JDK11
   brew install java11
   ```

   <img src="https://img.shell101.com/miicoblog/image-20240617225340031.png" alt="image-20240617225340031" style="zoom:50%;" />

注意：如果是M系列芯片，不支持这种方式安装JDK8，需要自行去Oracle官网下载安装，然后使用JENV进行管理。

4. 安装Maven（同JDK安装方式）

   ```
   brew search maven
   brew install maven
   
   ```

   ![image-20240617225847218](https://img.shell101.com/miicoblog/image-20240617225847218.png)

安装完成之后通过命令`mvn -v`查看一下是否安装成功。

![image-20240617231907154](https://img.codeagles.com/miicoblog/image-20240617231907154.png)

可以看到现在Maven已经生效了，并且关联的JDK是17的版本。到目前为止，我们已经都安装好了。

### 二、使用JENV管理JDK

安装了JENV如何使用呢？

常用的命令：

```bash
# 列出所有已安装的Java版本列表
jenv versions
# 列出当前Java版本
jenv versions
# 设置Java版本有三种方式，全局/本地/脚本级别，优先级全局最低，脚本级别最高
jenv global xx
jenv local xx
jenv shell xx
```

最后这部分是什么意思呢？

- global：设置全局的Java版本，所有的shell窗口都会使用这个版本
- local：设置当前目录及其子目录的Java版本
- shell：仅当前Shell会话设置Java版本

这就很方便我们多项目不同版本JDK的场景了，比如公司的老项目是JDK8，自己平时常用的是JDK17，而最近要学习JDK21的使用，那么我们就可以这样设置：

工作空间的文件夹通过`jenv local 1.8`命令设置JDK为1.8，然后在通过`jenv global 17` 来设置全局的JDK版本，这样默认除了工作空间外的地方生效都是17的版本，而要学习的JDK版本可以向工作空间一样设置一个本地文件夹的JDK版本即可。

![image-20240617233514410](https://img.codeagles.com/miicoblog/image-20240617233514410.png)

### 三、Maven动态关联JDK版本

可以看下图片，当前在文件夹中生效的JDK版本和maven版本

![image-20240617234723150](https://img.codeagles.com/miicoblog/image-20240617234723150.png)

对文件夹进行JDK17的变更后，Maven也跟着进行关联了，到此就完成了环境配置。

![image-20240617235045418](https://img.codeagles.com/miicoblog/image-20240617235045418.png)

注意：如果切换JDK版本后，Maven关联的JDK没有跟着进行变化，那么采用下面方式：

1. **打开或创建Maven的配置文件**: 如果你还没有创建`~/.mavenrc`文件，可以使用以下命令创建它：

```
touch ~/.mavenrc
```

2. **编辑`~/.mavenrc`文件**: 使用你喜欢的文本编辑器打开`~/.mavenrc`文件，例如使用`vim`:

   ```
   vim ~/.mavenrc
   ```

3. **在`~/.mavenrc`文件中添加以下行**: 使用`jenv`命令来获取当前版本的JDK路径，并设置`JAVA_HOME`环境变量：

   ```
   export JAVA_HOME=$(jenv prefix) || true
   ```

这行命令会尝试获取`jenv`当前选定的JDK路径，并将其设置为`JAVA_HOME`。如果`jenv`没有成功设置JDK路径，`|| true`确保命令不会因错误而中断。

4. **保存并关闭`~/.mavenrc`文件**:

5. **确保`~/.mavenrc`在Maven启动时被执行**: 你可以在命令行中手动执行它：

```
source ~/.mavenrc && mvn -version
```

搞定！






