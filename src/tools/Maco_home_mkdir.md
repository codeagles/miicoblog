---
title: 1. mac在home目录下创建文件夹
category:
  - 工具
tags:
  - home
  - mac
head:
   - - meta
     - name: keywords
       content: mac home 文件夹
---
MacOS如何在home目录下创建文件夹？
<!-- more -->

**1. 修改auto_master文件**
编辑/etc/auto_master文件，并注释掉 /home 开头那一行

```bash
    sudo vim /etc/auto_master   
```
注释后，如下：
```bash
#
# Automounter master map
#
+auto_master		# Use directory service
#/net			-hosts		-nobrowse,hidefromfinder,nosuid
#/home			auto_home	-nobrowse,hidefromfinder
/Network/Servers	-fstab
/-			-static

```

**2. 自动挂载使配置生效**

```bash
cd / (一定要回根目录)
sudo automount -vc (要在根目录执行)
sudo mkdir /home/test 
```
即可创建成功

**3. 创建软连接** 

home等目录是MacOS的系统目录，升级或者修复系统等都会抹除该目录的内容，所以必须要使用的话，可以创建软连接来存储数据
```bash
sudo ln -s /home/test/ /Users/xxx/test/ 
(xxx是电脑用户名字，路径也可以自己定义)
```
执行完成后，会在/Users/xxx/project/下看到test软连接指向/home/test/。后续只需要在/Users/xxx/project/test中操作即可

**4. 为当前用户提权(慎重)**

操作/home/work/test/目录依然要使用sudo提权，IDEA创建文件夹权限都是当前用户，
所以给当前用户赋权,建议不要给home文件夹最高权限，而是给自己创建的文件夹赋权，本案例中就是给test文件夹赋权。
```
sudo chown -R $(whoami) /home/test && sudo chmod -R u+w /home/test
```