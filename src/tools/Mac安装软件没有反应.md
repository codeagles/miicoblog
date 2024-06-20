---
title: Mac安装软件显示「文件已损坏」或者安装完打开没有反应
category:
  - 工具
tags:
  - mac
---
### macOS系统安装完软件后显示「文件已损坏」或者安装完打开没有反应
因为 软件 没有签名，所以会被 macOS 的安全检查所拦下。
安装后打开遇到「文件已损坏」的情况，请按如下方式操作：
<!-- more -->
1. 信任开发者，会要求输入密码:
```bash
sudo spctl --master-disable
```
2. 然后放行 软件 :
```bash
xattr -cr /Applications/xx.app
```
然后就能正常打开。
> 注意：/Applications/xxxx.app 换成你的App路径（推荐直接将.app文件拖入终端中自动生成路径，以防空格等转义字符手动复制或输入出现错误）


如果上述操作依然不可以，则直接使用下面命令。
输入以下命令，回车；
```bash
sudo xattr -d com.apple.quarantine /Applications/xxxx.app
```
> 注意：/Applications/xxxx.app 换成你的App路径（推荐直接将.app文件拖入终端中自动生成路径，以防空格等转义字符手动复制或输入出现错误）






