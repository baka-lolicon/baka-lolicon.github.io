# 就算是萝莉控也能看懂的Linux权限管理
## 文件权限
### 基本文件权限
#### 基本文件权限介绍
当使用`ls -l`命令时，在文件类型后跟的就是该文件的权限，示例如下

```shell
╭─root@kamiw ~
╰─# ls -l
total 16
drwxr-xr-- 2 root root 4096 May 19  2023 logs
-rwxr-xr-- 1 root root 1047 Jun 27 02:04 script.sh
drwxr-xr-- 2 root root 4096 May 19  2023 saves
```

在上面的例子中再以`logs`为例，其中`d`表示其[文件类型](/就算是萝莉控也能看懂的Linux文件类型和目录结构.md#文件类型)，`rwxr-xr-x`就是表示的该文件的权限。

`rwx r-x r--` 每三个为一组，分别对应**u**、**g**、**o**的权限，[如何查看文件所有者与所属组](/就算是萝莉控也能看懂的Linux常用命令.md#ls)   


- **u(user)** 文件所有者对该文件的权限; 为示例中 `rwx` 部分
- **g(group)** 文件所有组成员对该文件的权限; 为示例中 `r-x` 部分
- **o(other)** 其他人对该文件的权限; 为示例中 `r--` 部分

`r w x`则分别对应具有 **r(read)**、**w(write)**、**x(execute)** 权限

- **r(read)** 具有读取该文件操作权限
- **w(write)** 具有写入该文件操作权限
- **x(execute)** 具有执行该文件操作权限, 在十进制中为`1`

`rwx` 可由3位二进制来表示，其中使用`1`带代表具有该位置的权限，`0`表示不具有该位置权限  
如 `rwx` 由二进制表示为 `111` 转换为十进制则为 `7`

将每一位二进制进行单独转换为十进制可得
- **r(read)** 在十进制中为`4`
- **w(write)** 在十进制中为`2`
- **x(execute)** 在十进制中为`1`

由此对 **u**、**g**、**o** 的权限表示通常可由3位十进制进行表示  
如 `rwx r-x r--` 由二进制表示为 `111 101 100` 转换为十进制则为 `754`

#### 基本文件权限命令
- `chmod` 用于改变文件权限
  
  使用方法
  ```shell
  chmod [选项] 权限操作 文件或目录
  ```
  常用选项
  - `-R`，用于递归修改目录及目录以下文件权限

  常见案例
  ```shell
  chmod 755 script.sh #将script.sh权限改为755
  chmod +x script.sh #为script.sh所有人都添加执行权限
  chmod u=rwx script.sh #将script.sh对其所有者权限改为rwx
  chmod -R 755 data/ #将data目录及其下所有文件权限修改为755
  ```

- `chown` 用于修改文件所有者及所有组
  
  使用方法
  ```shell
  chown [选项] 新所有者:新所属组 文件或目录 
  ```
  常用选项
  - `-R`，用于递归修改目录及目录以下文件权限

  常见案例
  ```shell
  chown root:root script.sh #将script.sh所有者改为root,所属组改为root组
  chown root script.sh #将script.sh所有者改为root
  chown :root script.sh #将script.sh所属组改为root组
  chown -R root data/ #将data目录及其下所有文件所有者改为root
  ```

- `chgrp` 仅用于修改文件所属组
  
  使用方法
  ```shell
  chgrp [选项] 新所属组 文件或目录 
  ```
  常用选项
  - `-R`，用于递归修改目录及目录以下文件权限

  常见案例
  ```shell
  chgrp root script.sh #将script.sh所属组改为root组
  chgrp -R root data/ #将data目录及其下所有文件所属组改为root
  ```

### 访问控制列表（ACL）
ACL用于允许指定**特定**用户或用户组对文件的访问权限

- `getfacl` 用于查看文件的ACL信息
  
  使用方法
  ```shell
  getfacl 文件
  ```
  常用选项
  - `-R`，用于递归显示目录及其子目录的ACL信息。

  使用案例
  ```shell
  ╭─root@kamiw ~
  ╰─# getfacl logs
  # file: logs
  # owner: root
  # group: root
  user::rwx
  group::r-x
  other::r-- 
  ```
- `setfacl` 用于设置文件的ACL信息
  
  使用方法
  ```shell
  setfacl 选项 ACL规则 文件或目录名
  ```

  常用选项

  |选项|作用|案例|说明|
  |:---:|:---:|:---:|:---:|
  |`-m`|修改ACL规则|`setfacl -m u:user1:rw script.sh`|给予user1用户对script.sh的rw权限|
  |`-x`|移除ACL规则|`setfacl -x g:group1 script.sh`|取消group1组对script.sh的所有由ACL添加的权限
  |`-R`|递归地应用ACL规则到目录及其子目录|`setfacl -Rm u:user1:rw data/`|给予user1用户对data目录及其下文件的rw权限|


### 特殊权限
#### SetUID（SUID）
通常设置于可执行文件，设置后执行该文件的用户将临时获得文件所有者的权限（即执行该文件时使用文件所有者权限进行执行）

设置方法
```shell
chmod u+s command
```
设置成功时
```shell
-rwsr-xr-x 1 root root    0 Jul  6 17:07 command
```
设置`s`权限但无`x`权限时
```shell
-rwSr--r-- 1 root root    0 Jul  6 17:07 command #显示S表示没有x权限
```
实际案例如`ping`、`passwd`等命令

***出于安全s权限通常仅对二进制文件生效***
#### SetGID（SGID）
可设置于文件或目录，在执行时会继承该文件或目录的所属组权限。

设置方法同SUID
```shell
chmod g+s command
```
设置成功时
```shell
-rwxr-sr-x 1 root root    0 Jul  6 17:07 command
```
设置`s`权限但无`x`权限时
```shell
-rw-r-Sr-- 1 root root    0 Jul  6 17:07 command #显示S表示没有x权限
```
实际案例如`write`等命令

***出于安全s权限通常仅对二进制文件生效***
#### Sticky Bit
通常设置于目录，设置后只有文件所有者、目录所有者或root用户可以删除该目录中的文件，即使其他用户有写权限也无法删除其他用户的文件。

设置方法
```shell
chmod +t dir
```
设置成功
```shell
drwxr-xr-t 2 root root 4.0K Jul  6 17:29 dir
```
设置在普通文件时
```shell
-rw-r--r-T 1 root root    0 Jul  6 17:30 t #显示T表示非目录文件
```

## 用户及组权限
### 用户与组介绍
**user**是操作系统中的账户实体，具有唯一的用户名和用户标识符（UID）。

**group**是用户的集合，用于管理和控制对系统资源的访问权限，每个组有一个唯一的组名和组标识符（GID）。

用户必须要属于一个主要组，而后可根据需要进入多个附属组，同一个组可作为多个用户的主要组

### 特权提升
Linux 系统中 root 用户拥有系统中的最高权限，可以执行任何操作

对于普通用户需要执行特权行为时，通常通过`sudo`授予特权或使用`su`切换到root用户

- `sudo` 允许被授权的用户提供自己的密码后以另一个用户的身份执行命令，通常是作为超级用户（root），同时提供日志记录和安全机制。  
  使用方法
  ```shell
  sudo 命令 #在输入自己的密码之后,以超级用户权限执行命令
  ```
  常见使用方法

  |选项|作用|案例|
  |:---:|:---:|:---:|
  |`-i`|交互式shell启动|`sudo -i`|
  |`-u`|以其他用户身份执行命令|`sudo -u user1 ls`|

  sudo 允许指定的用户以提升的权限执行特定命令，需通过配置文件（/etc/sudoers）进行配置
  
- `su` 允许用户通过提供目标用户的密码成为另一个用户（包括 root）。  
  使用方法
  ```shell
  su 用户名 #在输入目标用户密码后切换用户,不输入用户名则默认为root
  ```
  常见使用方法

  |选项|作用|案例|
  |:---:|:---:|:---:|
  |`-`|切换到用户后同时进入到其家目录|`su - root`|
  |`-c`|使用该用户身份执行命令|`su root -c ls`|

  无需配置，每个人都可以使用该命令
  
### 用户及组操作

- `passwd` 用于修改用户的密码
  
  一般情况下每个用户仅能修改自己的密码，root可以修改所有人的密码

  使用方法
  ```shell
  passwd [用户名]
  ```
  使用案例
  ```shell
  passwd #更改当前用户密码
  passwd user1 #更改user1的密码
  ```

- `useradd` 用于创建新用户账号
  
  使用方法
  ```shell
  useradd [选项] 用户名
  ```
  常用选项

  |选项|作用|示例|说明|
  |:---:|:---:|:---:|:---:|
  |`-m`|创建用户的主目录|`useradd -m user1`|创建用户名为 `user1` 的用户，并为其创建家目录
  |`-d`|指定用户的主目录|`useradd -d /home/user1 -m user1`|创建用户名为 `user1` 的用户，指定主目录为 `/home/user1`
  |`-g`|指定用户的初始主组|`useradd -g root user1`|创建用户名为 `user1` 的用户，将其初始主组设置为 `root`
  |`-s`|指定用户的登录Shell|`useradd -s /bin/zsh user1`|创建用户名为 `user1` 的用户，并设置登录Shell为 `/bin/zsh`
  |`-u`|指定用户的UID|`useradd -u 1500 baka`|创建用户名为 baka 的用户，并设置其UID为 1500


- `usermod` 用于修改用户账号的属性
  
  使用方法
  ```shell
  usermod [选项] 用户名
  ```
  常用选项

  |选项|作用|示例|示例说明|
  |:---:|:---:|:---:|:---:|
  |`-d`|修改用户的主目录|`usermod -d /home/user1 user1`|修改 `user1` 用户的主目录为 `/home/user1`|
  |`-g`|修改用户的主要组|`usermod -g group1 user1`|修改 `user1` 用户的主要组为 `group1`
  |`-s`|修改用户的登录Shell|`usermod -s /bin/bash user1`	|修改 `user1` 用户的登录Shell为 `/bin/bash`
  |`-u`|	更改用户的UID	| `usermod -u 1500 user1`|更改 `user1` 用户的UID为 `1500`
  |`-G`|设置用户的附加组|`usermod -G group2,group3 user1`|	将 `user1` 用户添加到附加组 `group2` 和 `group3`（覆盖原有附加组）
  |`-a`| 追加用户到附加组，与`-G`一同使用|`usermod -a -G group4 user1`|将 `user1` 用户追加到附加组 `group4`
  

- `userdel` 用于删除用户账号及其相关文件
  
  使用方法
  ```shell
  userdel [选项] 用户名
  ```

  常用选项
    - `-r, --remove`：删除用户的主目录及其内容。
    - `-f, --force`：强制删除用户，即使用户当前登录或拥有未终止的进程。

  使用案例
  ```shell
  userdel username # 删除用户名为 username 的用户账号
  userdel -r username # 删除用户名为 username 的用户账号，并删除其主目录及其内容
  userdel -f username # 强制删除用户名为 username 的用户账号，即使用户当前登录或有未终止的进程
  ```

- `groupadd` 用于创建新的用户组
  
  使用方法
  ```shell
  groupadd [选项] 组名
  ```

  常用选项
    - `-r, --system`：创建一个系统组。
    - `-g, --gid GID`：指定组的GID。

  使用案例
  ```shell
  groupadd mygo # 创建一个名为 mygo 的用户组
  groupadd -r systemgroup # 创建一个名为 systemgroup 的系统用户组
  groupadd -g 1001 mygo # 创建一个名为 mygo 的用户组，并指定其GID为 1001
  ```

- `groupdel` 用于删除用户组。

  使用方法
  ```shell
  groupdel [选项] 组名
  ```

  常用选项
    - `-f, --force`：强制删除用户组，即使该组仍有成员。

  使用案例
  ```shell
  groupdel mygo # 删除名为 mygo 的用户组
  groupdel -f mygo # 强制删除名为 mygo 的用户组，即使该组仍有成员
  ```


<script src="/js/menu.js"></script>