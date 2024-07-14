# 就算是萝莉控也能看懂的shell美化
## oh my zsh
## 介绍
**Oh My Zsh** 是一个开源的、社区驱动的框架，用于管理你的 zsh 配置。

[**Oh My Zsh GitHub**](https://github.com/ohmyzsh/ohmyzsh)

[**Oh My Zsh 官网**](https://ohmyz.sh/)
## 安装
### 安装方法
#### 前置条件 
需要安装以下程序
- `zsh` 由于**Oh My Zsh**是`zsh`的框架，所以需要在使用**Oh My Zsh**前安装`zsh`，使用[包管理](/就算是萝莉控也能看懂的Linux软件管理.md)可轻松安装`zsh`
  
- `git` 由于**Oh My Zsh**安装脚本需要克隆 **Oh My Zsh GitHub 仓库**，所以需要安装`git`，使用[包管理](/就算是萝莉控也能看懂的Linux软件管理.md)可轻松安装`git`

#### 正式安装
安装仅需要运行**Oh My Zsh**官方提供的`install.sh`脚本即可，在网络状况良好的情况下即可完成安装

[**Oh My Zsh Basic Installation**](https://github.com/ohmyzsh/ohmyzsh?tab=readme-ov-file#basic-installation) 官方在GitHub中提供的安装教程

安装方法
- curl
  ```shell
  sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
  ```
- wget
  ```shell
  sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
  ```

在国内可能由于网络原因可能无法成功下载，可以使用命令行代理后继续使用上面命令进行下载

或使用官方提供的 `https://install.ohmyz.sh/` 网站下载并运行 `install.sh` 脚本
- curl
    ```shell
    sh -c "$(curl -fsSL https://install.ohmyz.sh/)"
    ```
- wget
  ```shell
  sh -c "$(wget -O- https://install.ohmyz.sh/)"
  ```
当然也可以将 `install.sh` 脚本下载到本地后运行  
1. 使用浏览器直接访问 `https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh` 或 `https://install.ohmyz.sh/` 并将其内容保存到本地为 `install.sh` 文件；也可以使用命令行工具 `wget https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh` 将其保存到本地为 `install.sh` 文件
2. 切换到存放 `install.sh` 的目录执行 `chmod +x install.sh` 为其添加可执行权限
3. `./install.sh`运行安装脚本

成功执行脚本后显示如下

![](/img/shell美化/0.png)

安装途中会弹出一次交互，为图片中方框所选内容，询问是否将默认 Shell 改为 `zsh` ，键入 `y` 即可

### 注意事项
- 任何以前的 `.zshrc` 都将重命名为 `.zshrc.pre-oh-my-zsh`
- 使用 **Oh My Zsh** 后配置文件`.zshrc` `.zprofile`均会互相调用，不论启动还是登录都会执行两个文件内容，详见 [就算是萝莉控也能看懂的Linux环境变量配置](/就算是萝莉控也能看懂的Linux环境变量配置.md#环境变量配置文件)
## 配置
### `ls`命令显示配色
#### 说明
这部分并不属于 **Oh My Zsh** 专属的内容，但也归为 shell美化 部分

1. `ls`命令显示配色通过环境变量 `LS_COLORS` 控制
2. `dircolors` 读取配置文件生成一个设置环境变量 `LS_COLORS` 的命令
3. 在环境变量配置文件中使用 `eval` 命令执行 `dircolors` 生成的命令即可

- `dircolors`
  
    用于设置终端中文件颜色显示规则。

    使用方法：`dircolors [选项] [文件]`

    |选项|作用|
    |:---:|:---:|
    |`-b, --sh, --bourne-shell`|	生成适用于Bourne shell及兼容shell的输出，默认使用项
    |`-c, --csh, --c-shell`|	生成适用于C shell及兼容shell的输出
    |`-p, --print-database`|	打印默认颜色数据库的内容，通常用于生成配置文件

#### 具体配置

1. `ls -a`检查家目录下是否存在 `.dircolors` 文件（通常是不存在），不存在使用 `dircolors -p > ~/.dircolors` 创建该配置文件
2. 修改 `.dircolors` 文件内容
3. 在 `~/.zshrc` 中任意位置添加命令 `eval $(dircolors ~/.dircolors)`

### 主题
#### 主题修改
主题文件存放位置在 `~/.oh-my-zsh/themes`

修改主题只需要修改 `~/.zshrc` 中的 `ZSH_THEME` 的值即可,如下图
![](/img/shell美化/10.png)

#### 推荐主题
- bira
  
  ![](/img/shell美化/11.png)

- agnoster
  
  ![](/img/shell美化/12.png)

- random
  
  **每次启动shell，都会随机更换一次主题**
### 插件
#### 添加插件
插件文件存放位置在 `~/.oh-my-zsh/plugins`

添加插件需要将插件下载到**插件文件存放位置**，并将插件名加入 `~/.zshrc` 中的 `plugins` 的值即可（以空格分隔）,如下图
![](/img/shell美化/20.png)

#### 推荐插件
- sudo
  - **Oh My Zsh** 安装后自带的插件，直接在`.zshrc`中添加即可
  - 双击`esc`键即可为当前命令前加上`sudo`。如果当前命令为空，双击`esc`则显示上条命令并加上`sudo`
- zsh-syntax-highlighting 
  - 非 **Oh My Zsh** 自带插件，[GitHub地址](https://github.com/zsh-users/zsh-syntax-highlighting)，使用以下命令将插件添加到**插件文件存放位置**
    ```shell
    git clone https://github.com/zsh-users/zsh-syntax-highlighting ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
    ```
  - 命令高亮插件
- zsh-autosuggestions
  - 非 **Oh My Zsh** 自带插件，[GitHub地址](https://github.com/zsh-users/zsh-autosuggestions)，使用以下命令将插件添加到**插件文件存放位置**
    ```shell
    git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
    ```
  - 命令提示插件，当你输入命令时会显示出以前输入过开头相同的命令


  <script src="/js/menu.js"></script>