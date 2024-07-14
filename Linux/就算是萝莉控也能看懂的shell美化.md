# 就算是萝莉控也能看懂的shell美化
# oh my zsh
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

![](/img/shell美化/1.png)

安装途中会弹出一次交互，为图片中方框所选内容，询问是否将默认 Shell 改为 `zsh` ，键入 `y` 即可

### 注意事项
- 任何以前的 `.zshrc` 都将重命名为 `.zshrc.pre-oh-my-zsh`
- 使用 **Oh My Zsh** 后配置文件`.zshrc` `.zprofile`均会互相调用，不论启动还是登录都会执行两个文件内容，详见 [就算是萝莉控也能看懂的Linux环境变量配置](/就算是萝莉控也能看懂的Linux环境变量配置.md#环境变量配置文件)
## 配置
### `ls`命令显示配色
这部分并不属于 **Oh My Zsh** 专属的内容，但属于
### 主题
### 插件
