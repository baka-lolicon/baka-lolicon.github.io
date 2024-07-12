# 就算是萝莉控也能看懂的shell基础
## Shel介绍及其种类
### Shell的介绍
>Shell（也称为壳层）在电脑科学中指“为用户提供用户界面”的软件，通常指的是命令行界面的解析器。一般来说，这个词是指操作系统中提供存取内核所提供之服务的程序。Shell也用于泛指所有为用户提供操作界面的程序，也就是程序和用户交互的层面。因此与之相对的是内核（英语：Kernel），内核不提供和用户的交互功能。

引用自[壳层 - 维基百科，自由的百科全书](https://zh.wikipedia.org/zh-sg/%E6%AE%BC%E5%B1%A4)

>通常将shell分为两类：命令行与图形界面。命令行壳层提供一个命令行界面（CLI）；而图形壳层提供一个图形用户界面（GUI）。

本部分仅说明 **命令行Shell(CLI)**
### Shell种类
- `sh(Bourne Shell)`
  
  经典的Unix Shell，常用于脚本编写和系统初始化脚本。虽然现在很少作为默认Shell使用，但很多系统仍然保留它用于兼容性
- `bash(Bourne Again Shell)`
  
  GNU项目的Shell，是Bourne Shell的增强版本，提供了更多的功能和改进的脚本编写能力。是大多数Linux发行版的默认Shell
- `zsh(Z Shell)`
  
  综合了许多Shell的功能，特别是Bash和tcsh的功能，提供了强大的命令行编辑、命令补全、历史管理和主题支持。macOS的默认Shell，部分Linux发行版的默认Shell，如Kali
- `ksh(Korn Shell)`
  
  由David Korn开发，兼容Bourne Shell。增强了编程功能，如内建的数学运算和高级脚本控制。是现代部分Unix系统的默认Shell
- `csh(C Shell)`
  
  由Bill Joy开发，以C语言风格的语法为基础。提供了交互式功能和脚本编写功能，但在脚本编写上不如Bourne Shell系列灵活。作为早期的BSD系统的默认Shell，现在使用较少
- `tcsh`
  
  C Shell的增强版本，增加了命令行编辑和命令补全功能。作为现代某些BSD系统的默认Shell，如FreeBSD、NetBSD


## 终端中Shell的基本操作
### 快捷键
- Tab：在支持补全的Shell中，使用该按键可以对 **命令 文件名 路径** 等进行补全

- Shift+Ctrl+C/Shift+Ctrl+V：在许多终端中用于复制和粘贴
- Ctrl+L：清屏，使用`clear`命令也可以达到相同效果
- Ctrl+C：终止当前运行的命令。这是一个由Shell处理的快捷键，用于发送SIGINT信号给前台进程
- Ctrl+D：发送EOF（End of File），通常用于退出Shell，一般使用`exit`也可达到退出Shell效果
- Ctrl+R：出现交互界面用于搜索命令历史
- `↑`(Ctrl+P)：上一条命令
- `↓`(Ctrl+N)：下一条命令
## 常用环境变量

- $PATH：存储可执行文件的搜索路径。添加到该变量中的路径，其下所有可执行程序全局可用

- $HOME：当前用户的主目录
- $USER：当前用户的用户名
- $SHELL：当前用户的登录Shell的路径
- $PWD：当前工作目录
- $LANG：语言和区域设置
- \$\$：当前Shell进程的PID（进程ID）
- $0：当前执行的命令或脚本的名称，在Shell中直接使用`echo`输出得到的是当前使用Shell
- $?：上一个命令的退出状态或返回值。用于检查上一个命令是否成功执行（返回值为0）或者失败（非0返回值）
- $!：后台运行的最后一个进程的PID（进程ID）

## 常用特殊符号
### `|`
管道符，用于将一个命令的输出作为另一个命令的输入。

常与以下命令直接配合使用

|命令|作用|示例|
|:---:|:---:|:---:|
|[`grep`](/就算是萝莉控也能看懂的Linux常用命令.md#grep)|用于在文件或标准输入中搜索匹配的文本模式。|`cat file.txt \| grep "pattern"`
|[`awk`](/就算是萝莉控也能看懂的sed与awk用法.md)|强大的文本和数据处理工具，支持自定义字段分隔符和处理逻辑。|`cat file.txt \| awk '{print $1}'`
|[`sed`](/就算是萝莉控也能看懂的sed与awk用法.md)|流式文本编辑器，用于文本替换和转换。|`cat file.txt \| sed 's/old/new/g'`
|[`sort`](/就算是萝莉控也能看懂的Linux常用命令.md#sort)|对输入进行排序。|`cat file.txt \| sort`
|[`cut`](/就算是萝莉控也能看懂的Linux常用命令.md#cut)|从每一行文本中剪切出指定部分。|`cat file.txt \| cut -d ' ' -f 1`
|`tee`|从标准输入读取数据并将其写入到标准输出和文件。|`cat file.txt \| tee output.txt`
|`wc`|统计文本文件中的行数、字数和字节数。|`cat file.txt \| wc -l`

部分命令无法直接接受管道符的输入，此时可以配合`xargs`命令使用
- `xargs`
  
  从标准输入中读取数据，并将其作为命令的参数传递给指定的命令。
  
  使用方法：`xargs [选项] [命令]`
  
  常用选项


    |选项|作用|示例|
    |:---:|:---:|:---:|
    |`-0, --null`|使用空字符 \0 作为输入项的分隔符，适用于处理包含特殊字符的文件名。|`find . -type f -print0 \| xargs -0 rm`
    |`-n, --max-lines=NUM`|每次传递给命令的参数数量上限。|`ls *.log \| xargs -n 1 grep "error"`
    |`-I, --replace[=REPLACE_STR]`|指定替换字符串，用来替换命令中的参数。|`find . -type f -name "*.bak" \| xargs -I {} mv {} {}.old`
    |`-t, --verbose`|显示执行的命令，便于调试和跟踪。|`ls *.txt \| xargs -t rm`
    |`-P, --max-procs=NUM`|指定同时运行的最大进程数。|`find . -type f \| xargs -P 4 grep "pattern"`

`|`，`xargs`常与以下命令同时使用
- `rm`
  ```shell
  find . -name "*.tmp" | xargs rm
  ```
- `kill`
  ```shell
  ps aux | grep 'process_name' | awk '{print $2}' | xargs kill
  ```

### 重定向数据流
- `>` 重定向输出，将命令的输出写入到文件中
  ```shell
  echo 'hello world' > file.txt #将 "hello world" 字符串重定向到名为 file.txt 的文件中，如果该文件不存在则创建，如果存在则会覆盖原有内容。
  ```
- `>>` 重定向追加，将命令的输出追加到文件末尾
  ```shell
  echo 'hello world' >> file.txt #将字符串 "hello world" 追加到名为 file.txt 的文件末尾
  ```
- `<` 重定向输入，从文件中读取输入
  ```shell
  wc < file.txt #使用wc统计file文件行数、词数等
  ```

### 逻辑符
- `&&` 逻辑与，用于在前一个命令成功时执行下一个命令
   ```shell
  cat .zshrc && cp .zshrc ~ #如果成功cat .zshrc文件中内容，则将.zshrc复制一份到家目录
  ```
- `||` 逻辑或，用于在前一个命令失败时执行下一个命令
  ```shell
  cd test || mkdir test #如果进入test命令失败，则创建test命令
  ```

### 通配符
- `*` 通配符，用于匹配任意数量的字符
  ```shell
  ls *.txt  # *.txt 匹配当前目录下所有以 .txt 结尾的文件名
  ```
- `?` 通配符，用于匹配一个字符
  ```shell
  ls file?.txt  #file?.txt 匹配 file1.txt, file2.txt 等文件名，其中 ? 可以代表任意单个字符
  ```

### 其他
- `&` 在后台运行命令。
  ```shell
  script.sh &  # 将script.sh这个脚本放在后台运行
  ```
- `;` 分隔多个命令，使它们顺序执行
  ```shell
  ls;cd ~  # 执行完 ls 后无论成功与否都执行 cd ~
  ```

  <script src="/js/menu.js"></script>