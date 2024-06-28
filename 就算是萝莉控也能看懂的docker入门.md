# 就算是萝莉控也能看懂的docker入门

## docker中的基本概念
- **镜像（Image）** ：镜像是用来创建容器的基础，本身是只读的，相当于设计图
- **容器（Container）** ：容器时由镜像创建的具体可用的实例，内容可修改，拥有独立的运行环境，相当于用镜像这个设计图构建出的建筑

## docker的基本命令
### 镜像基本命令
***官方文档镜像部分：[docker-docs-image](https://docs.docker.com/reference/cli/docker/image/)***
1. **拉取镜像**

使用以下命令拉取镜像
```shell
docker pull $image_name
```

2. **查看本地镜像**

使用以下命令查看本地镜像
```shell
docker images
```
通常会输出以下信息
```shell
╭─root@kamiw ~
╰─# docker images
REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
nginx         latest    e0c9858e10ed   7 days ago      188MB
hello-world   latest    d2c94e258dcb   14 months ago   13.3kB
```

其中每个字段含义如下

|字段|含义|
|:---:|:---:|
|REPOSITORY|镜像的仓库名或者来源|
|TAG|镜像的标签。标签通常指定了镜像的特定版本或者变体|
|IMAGE ID|镜像的ID,唯一标识符|
|CREATED|镜像创建的时间|
|SIZE|镜像占用的磁盘空间大小|

3. **删除镜像**

使用以下命令删除本地镜像
```shell
docker rmi $image_name
```
### 容器基本命令
***官方文档容器部分：[docker-docs-container](https://docs.docker.com/reference/cli/docker/container/)***
1. **创建容器**

创建容器基本命令如下，`$OPTIONS`表示*docker run命令的选项*；`$COMMAND`表示*在容器中执行的命令*；`$ARG`表示*容器中执行命令跟的选项*
```shell
docker run $OPTIONS IMAGE $COMMAND $ARG...
```
|选项|作用|案例|
|:---:|:---:|:---:|
|`-d, --detach`|使容器开启后在后台运行|`docker run -d nginx`|
|`--name`|后跟容器名称，为容器命名|`docker run --name nginx nginx`|
|`-p, --publish`|将主机端口映射到容器端口，格式为 `主机端口:容器端口`|`docker run -p 8080:80 nginx`|
|`-v, --volume`|挂载主机目录或卷到容器中。格式为 `主机路径:容器路径`|`docker run -v /home/myhtml:/var/www/html nginx`|
|`-it`|组合选项，`-i` 表示交互式，`-t` 表示分配一个伪终端|`docker run -it ubuntu /bin/bash`|
|`-P`|将主机随机端口映射到容器中|`docker run -P nginx`|


2. **容器简单操作**

*以下命令执行成功后会返回 容器ID `$container_id`*

开启容器
```shell
docker start <$container_id or $container_name>
```
执行结果如下：
```shell
╭─root@kamiw ~
╰─# docker start c13a973494d0
c13a973494d0
```
关闭容器
```shell
docker stop <$container_id or $container_name>
```
删除容器
```shell
docker rm <$container_id or $container_name>
```
重启容器
```shell
docker restart <$container_id or $container_name>
```
查看容器状态
```shell
docker stats <$container_id or $container_name>
```
重命名容器
```shell
docker rename <$container_id or $container_name>
```

3. **查看本地容器**

使用以下命令查看运行中的容器
```shell
docker ps
```
输出结果如下
```shell
╭─root@kamiw ~
╰─# docker ps
CONTAINER ID   IMAGE           COMMAND                  CREATED         STATUS          PORTS                                     NAMES
2f5ab2c0179b   nginx:latest    "/docker-entrypoint.…"   8 seconds ago   Up 7 seconds    0.0.0.0:32768->80/tcp, :::32768->80/tcp   lucid_leakey
c13a973494d0   ubuntu:latest   "/bin/bash"              2 hours ago     Up 29 minutes                                             musing_sutherland
```
其中每个字段含义如下

|字段|含义|
|:---:|:---:|
|CONTAINER ID|容器的ID，唯一标识符|
|IMAGE|容器所用的镜像及其标签|
|COMMAND|启动容器时指定的命令|
|CREATED|容器创建的时间或者相对时间|
|STATUS|容器状态，共有以下七种：created（已创建）；restarting（重启中）；running（运行中）；removing（迁移中）；paused（暂停）；exited（停止）；dead（死亡）|
|PORTS|容器暴露的端口信息|
|NAMES|容器的名称，如果没有设置则是随机分配|

该命令`docker ps`后面可跟选项，常用有以下选项

|选项|作用|
|:---:|:---:|
|`-a `|显示所有的容器，包括未运行的|
|`-q`|仅输出容器ID|
|`-s` |显示容器总的文件占用磁盘大小|

4. **在运行的容器内执行命令**

该命令格式基本同创建容器基本命令如下，`$OPTIONS`表示*docker exec命令的选项*；`$COMMAND`表示*在容器中执行的命令*；`$ARG`表示*容器中执行命令跟的选项*
```shell
docker exec $OPTIONS CONTAINER $COMMAND $ARG...
```
常见用法
```shell
docker exec -it <$container_id or $container_name> /bin/bash #进入该容器终端
```
```shell
docker exec <$container_id or $container_name> ls / #查看根目录内容
```