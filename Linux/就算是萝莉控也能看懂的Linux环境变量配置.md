# 就算是萝莉控也能看懂的Linux环境变量配置
## 环境变量配置文件
环境变量配置文件是配置用户和系统环境变量的复数个特定文件。  
每个文件**加载时间**、**作用范围**等都有所区别。  
部分配置文件会根据使用**shell**的不同而不同。
### 系统级
#### `/etc/profile`、`/etc/profile.d/*.sh`
- 加载时间： 用户登录时加载。
- 作用范围： 对所有用户的登录Shell会话生效。
- 说明：仅在用户登录时加载一次，例如图形桌面的登录、tty登录

#### `/etc/bash.bashrc`
- 加载时间： 每次新开一个非登录Shell会话时加载。
- 作用范围： 对所有用户的非登录Shell会话生效。
- 说明：在每一次启动bash时加载，例如图形桌面打开虚拟终端、终端中使用`bash`命令

### 用户级
#### `~/.profile`、`~/.bash_profile`
- 加载时间： 用户登录时加载。
- 作用范围： 只对当前用户的登录Shell会话生效。
- 说明：仅在用户登录时加载一次，例如图形桌面的登录、tty登录

#### `~/.bashrc`
- 加载时间： 每次新开一个非登录Shell会话时加载。
- 作用范围： 对当前用户的非登录Shell会话生效。
- 说明：在每一次启动bash时加载，例如使用`bash`

### 配置说明
- 使用不同的shell环境变量的配置文件也不相同，例如使用zsh时使用的是`zprofile`、`zshrc`
- 通常`/etc/profile`加载完成后会遍历`/etc/profile.d/`目录下的所有shell文件进行加载
- 通常情况下在`profile`文件内会使用以下语句显式调用`bashrc`文件，以便登录时让两种配置文件都加载
  ```shell
  if [ -f ~/.bashrc ]; then
      . ~/.bashrc
  fi
  ```
- 同理也可以在`.bashrc`中使用类似的语句显示调用`.profile`文件
  ```shell
  if [ -f ~/.profile ]; then
      . ~/.profile
  fi
  ```

## 常用命令
### `source`、`.`
- 作用： 用于在当前Shell中执行指定的脚本文件，并确保其中的命令可以直接影响当前Shell的环境，通常用于加载配置文件或加载shell脚本使当前shell可直接调用脚本中函数。可用`.`来代替`source`
- 示例： 
  ```shell
  . ~/.bashrc #加载 ~/.bashrc 文件
  ``` 
  ```shell
  source ~/.profile #加载 ~/.profile 文件
  ```

### `alias`
- 作用： 创建命令别名，简化长命令的输入,便于在命令行中快速调用
- 示例： 
  ```shell 
  alias ll='ls -l' #使用 ll 来代替 ls -l 命令
  ```

### `export`
- 作用： 用于创建环境变量或将变量设置为环境变量，使其在当前Shell及其子进程中可见,多用于修改已有环境变量
- 示例： 
  ```shell
  export PATH="/usr/local/bin:$PATH" #将 /usr/local/bin 加入到 PATH 环境变量中
  ``` 

### `unset`
- 作用： 用于删除变量或函数。它可以用来移除Shell中已定义的变量或函数，使其不再存在于当前Shell环境中
- 示例：
  ```shell
  unset http_proxy #删除http_proxy变量（取消该shell的代理）
  ```

  <script src="/js/menu.js"></script>