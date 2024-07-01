# 就算是萝莉控也能看懂的Linux文件类型和目录结构
## 文件类型
在Linux中文件类型共有7中
- \- 普通文件
  - 普通文件是最常见的文件类型，包括文本文件、二进制可执行文件、图像文件等。
  - 在 ls -l 输出中，普通文件的标识符是 `-`。
  - 例如`/etc/passwd`
    ```shell
    -rw-r--r-- 1 root root 1.2K Nov 18  2023 /etc/passwd
    ```
- d 目录文件 directory
  - 目录文件，用于存储其他文件和目录的列表。
  - 在 ls -l 输出中，普通文件的标识符是 `d`。
  - 例如`/usr`
    ```shell
    drwxr-xr-x  10 root root 4.0K Jun 21 02:23 usr
    ```
- l 符号链接文件 link
  - 符号链接文件，链接到其他文件或文件夹，相当于Windows中的快捷方式
  - 在 ls -l 输出中，普通文件的标识符是 `l`。
  - 例如`/bin`
    ```shell
    lrwxrwxrwx   1 root root    7 Apr  8 02:02 bin -> usr/bin
    ```
- b 块设备 block
  - 用于访问计算机的硬件设备或虚拟设备。块设备适合随机访问设备
  - 在 ls -l 输出中，普通文件的标识符是 `b`。
  - 例如`/dev/sda`
    ```shell
    brw-rw---- 1 root disk   8,   0 Jul  1 16:13 sda
    ```
- c 字符设备 character
  - 用于访问计算机的硬件设备或虚拟设备。字符设备适合顺序访问设备
  - 在 ls -l 输出中，普通文件的标识符是 `c`。
  - 例如`/dev/null`
    ```shell
    crw-rw-rw- 1 root root   1,   3 Jul  1 16:13 null
    ```
- p 管道文件 pipe
  - 管道文件用于进程间通信,使用mififo命令创建，一端输入另一端输出
  - 在 ls -l 输出中，普通文件的标识符是 `p`。
  - 例如我创建`/tmp/hello`文件
    ```shell
    prw-r--r-- 1 root root  0 Jul  1 16:57 hello
    ```
    使用终端1向该管道文件输入内容
    ```shell
    ╭─root@kamiw /tmp
    ╰─# echo "hello world" >> /tmp/hello

    ```
    此时终端1进入了等待状态  
    使用终端2输出该管道文件输入内容
    ```shell
    ╭─root@kamiw /mnt/d
    ╰─# cat < /tmp/hello
    hello world
    ```
    可以看到终端1结束了等待
    ```shell
    ╭─root@kamiw /tmp
    ╰─# echo "hello world" >> /tmp/hello
    ╭─root@kamiw /tmp
    ╰─#
    ```
- s 套接字文件 socket
  - 套接字文件用于进程间的通信。
  - 在 ls -l 输出中，普通文件的标识符是 `s`。
  - 例如`/run/docker.sock`
    ```shell
    srw-rw----  1 root  docker    0 Jul  1 16:13 docker.sock
    ```
在这7种中最为常见的为前三种***普通文件***、***目录文件***、***链接符号文件***
## 目录结构
### /
在一个块*物理硬盘*或硬盘的一个*逻辑分区*中安装Linux后，Linux的最上层目录是`/`，被称作`根目录`，其相当于Windows中`C:\`，即`C盘根目录`。

同时由于Linux中`一切皆为文件`,所有硬件设备、系统资源、进程等都被抽象成文件，并创建文件夹于根目录中便于用户管理。

根目录中通常有以下文件夹：
```shell
╭─root@kamiw /
╰─# ls -l
total 948M
lrwxrwxrwx   1 root root    7 Apr  8 02:02 bin -> usr/bin
drwxr-xr-x   2 root root 4.0K Dec  7  2021 boot
drwxr-xr-x  16 root root 3.5K Jul  1 00:44 dev
drwxr-xr-x  52 root root 4.0K Jul  1 00:44 etc
drwxr-xr-x   3 root root 4.0K May 17  2023 home
lrwxrwxrwx   1 root root    7 Apr  8 02:02 lib -> usr/lib
lrwxrwxrwx   1 root root    7 Apr  8 02:02 lib64 -> usr/lib
drwxr-xr-x  10 root root 4.0K Feb 29 19:47 mnt
drwxr-xr-x   3 root root 4.0K Jun 10 00:57 opt
dr-xr-xr-x 280 root root    0 Jul  1 00:44 proc
drwxr-x---  12 root root 4.0K Jul  1 00:55 root
drwxr-xr-x  21 root root  560 Jul  1 00:44 run
lrwxrwxrwx   1 root root    7 Apr  8 02:02 sbin -> usr/bin
drwxr-xr-x   4 root root 4.0K Oct  1  2022 srv
dr-xr-xr-x  11 root root    0 Jul  1 00:45 sys
drwxrwxrwt   8 root root  160 Jul  1 00:44 tmp
drwxr-xr-x  10 root root 4.0K Jun 21 02:23 usr
drwxr-xr-x  13 root root 4.0K Jun 22 01:37 var
```
每个文件夹的作用大致如下：

|文件夹|作用|
|:---:|:---:|
|/bin	|存放最基本和最常用的系统命令，通常包含基本的用户级命令。
|/boot	|存放启动Linux时所需的文件，如内核镜像和引导加载程序。
|/dev	|存放设备文件，Linux中一切皆文件，包括硬件设备。
|/etc	|存放系统全局的配置文件。
|/home	|存放用户的主目录。
|/lib	|存放系统运行时需要的共享库文件（/lib64、/lib32、/libx32等同）。
|/mnt	|约定俗成的临时挂载目录，用于挂载其他文件系统。
|/opt	|约定俗成由用户或管理员自行安装的应用程序
|/proc	|虚拟文件系统，存放系统和进程相关的信息。
|/root	|超级用户（root）的家目录。
|/run	|存放系统服务和进程的特定运行时的信息，如PID文件和socket文件。
|/sbin	|存放系统管理命令，通常只有系统管理员可以执行。
|/srv	|作为存放服务数据的默认路径，如ftp根目录等
|/sys	|虚拟文件系统，存放系统硬件设备相关的信息。
|/tmp	|存放临时文件的目录。
|/usr	|存放用户安装的应用程序和文件。
|/var	|存放经常变化的文件，如日志文件。

### /usr
usr文件夹下通常有以下文件夹
```shell
╭─root@kamiw /usr
╰─# ll
total 92K
drwxr-xr-x   3 root root  36K Jun  4 00:01 bin
drwxr-xr-x  41 root root 4.0K Dec 25  2023 include
drwxr-xr-x  80 root root 4.0K Jan 11 03:46 lib
drwxr-xr-x   2 root root 4.0K Apr 23  2020 lib32
drwxr-xr-x   2 root root 4.0K Sep 14  2020 lib64
drwxr-xr-x   2 root root 4.0K Dec 25  2023 libexec
drwxr-xr-x   2 root root 4.0K Apr 23  2020 libx32
drwxr-xr-x  11 root root 4.0K Sep 14  2020 local
drwxr-xr-x   2 root root  12K Jun 12 14:05 sbin
drwxr-xr-x 142 root root 4.0K Jan 11 03:46 share
drwxr-xr-x   8 root root 4.0K Dec 13  2023 src
```
根目录中的`bin`、`sbin`、`lib`等依赖库都由usr中的`/usr/bin`、`/usr/sbin`等链接过去。
- include包含C++头文件
- local用于存放用户自己编译安装的软件
- share存放全局可用的文档、资源等
- src用于存放系统软件包的源码
### /var
var下通常有这些目录
```shel
╭─root@baka-lolicon /var
╰─# ll
total 40K
drwxr-xr-x  9 root root   4.0K Dec 25  2023 cache
drwxr-xr-x 37 root root   4.0K Jan 11 03:46 lib
drwxrwsr-x  2 root staff  4.0K Apr 15  2020 local
lrwxrwxrwx  1 root root      9 Sep 14  2020 lock -> /run/lock
drwxrwxr-x 12 root syslog 4.0K Jul  1 00:00 log
drwxrwsr-x  2 root mail   4.0K Apr 23  2020 mail
drwxr-xr-x  2 root root   4.0K Apr 23  2020 opt
lrwxrwxrwx  1 root root      4 Sep 14  2020 run -> /run
drwxr-xr-x  4 root root   4.0K Sep 14  2020 spool
drwxrwxrwt  6 root root   4.0K Jul  1 00:00 tmp
```
通常日志文件在`/var/log`下
### /home
家目录，用户的主目录，通常情况下无可见内容，其中内容均由用户自行添加移动，在具有桌面的Linux发行版中，系统会自动为用户创建 *桌面、图片、下载、视频等* 文件夹。而root作为特殊用户，`/root`作为root的家目录。

家目录的隐藏内容，使用`ls -a`可显示当前目录下的所有内容，以`.`开头的文件或文件夹就是隐藏文件。通常这些文件或文件夹是单独为**该家目录拥有者**的配置文件，这些文件配置仅对此用户生效。
### /proc
进入该目录后可以见到很多以数字命名的文件夹，这些数字就是进程的PID号
```shell
╭─root@kamiw /proc
╰─# ls -d */
1/     1166/  120/  132/   308/  40/    bus/     net/      thread-self/
1036/  1168/  122/  145/   323/  69/    driver/  self/     tty/
1037/  1171/  125/  1891/  327/  9/     fs/      sys/
1038/  119/   131/  2/     343/  acpi/  irq/     sysvipc/
```
进入某个文件夹后可见到这个进程的具体信息，其中含有有效信息且常用的有以下目录或文件

```shell
-r--r--r--  1 root root 0 Jul  1 17:25 cmdline
lrwxrwxrwx  1 root root 0 Jul  1 17:25 cwd -> /proc/1168
-r--------  1 root root 0 Jul  1 17:25 environ
lrwxrwxrwx  1 root root 0 Jul  1 16:53 exe -> /usr/bin/zsh
dr-x------  2 root root 0 Jul  1 16:53 fd
```
- `cmdline`文件，文件中内容为该进程运行时使用的命令
    ```shell
    ╭─root@kamiw /proc/1171
    ╰─# cat cmdline
    -zsh#
    ```
- `cwd`链接文件，链接到该进程的当前工作目录
- `environ`文件，进程的环境变量列表
    ```shell
    ╭─root@baka-lolicon /proc/866701
    ╰─# cat environ
    LANG=en_US.UTF-8PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin_WSREP_START_POSITION=NOTIFY_SOCKET=/run/systemd/notifyHOME=/nonexistentLOGNAME=mysqlUSER=mysqlINVOCATION_ID=a420f54c32684d0f99cbe27da0487d24JOURNAL_STREAM=9:21737569#
    ```
- `exe`链接文件，链接到该进程的可执行文件
- `fd`目录文件，目录下每个文件描述符代表进程中打开的一个文件、管道、套接字或其他 I/O 资源。每个符号链接指向一个实际的打开文件或资源。
    ```shell
    ╭─root@kamiw /proc/1171/fd
    ╰─# ll
    total 0
    lrwx------ 1 root root 64 Jul  1 16:53 0 -> /dev/pts/2
    lrwx------ 1 root root 64 Jul  1 18:04 1 -> /dev/pts/2
    lrwx------ 1 root root 64 Jul  1 18:04 10 -> /dev/pts/2
    lrwx------ 1 root root 64 Jul  1 18:04 2 -> /dev/pts/2
    lrwx------ 1 root root 64 Jul  1 18:04 4 -> /dev/ptmx
    ```
