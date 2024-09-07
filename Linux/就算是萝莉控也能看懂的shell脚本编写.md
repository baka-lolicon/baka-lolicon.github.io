# 就算是萝莉控也能看懂的shell脚本编写
## 运行配置
shell脚本运行通常分为以下三个步骤：

**启动新shell实例** -> **执行脚本中的内容** -> **关闭shell实例**

由此我们可以知道在shell脚本中设置的**环境变量**等并不会影响到当前的环境

在**启动新shell实例**阶段，如果没有特殊声明会使用默认的`/bin/sh`作为脚本运行shell。  
通常编写脚本时会在第一行写上 `#!/bin/bash` 这类格式来指明该脚本使用什么shell环境运行，也可以在运行时使用 `zsh ./script.sh` 这种方法来指定使用什么shell作为运行环境。

使用`shell`的`helloworld`示例：
```shell
#!/bin/bash
echo "Hello World"
```
P.S. `#`也作为shell中的注释符使用

## 变量设置
### 定义变量
shell中定义变量与其他语言类似，只需要 `变量名=变量值` 即可，例如：
```bash
home_dir="/home/username"
```
在shell中变量通常有以下类型：

- **字符串**：值使用双引号或单引号引起来，如`user="baka"`
- **整数**：值仅含有整数，如`date=2024`
- **数组**：通常情况下使用较少，如`array=（1,2,3,4,5）`
- **环境变量**：详见 [常用环境变量](/就算是萝莉控也能看懂的shell基础.md#常用环境变量)

在需要取消变量时，可以使用[unset](/就算是萝莉控也能看懂的Linux环境变量配置.md#unset)取消变量

### 使用变量

使用变量时只需要在定义过的变量前加一个`$`即可，必要时可以使用`${}`来注明变量边界，如
```shell
╭─root@kamiw ~
╰─# home_dir="/home"
╭─root@kamiw ~
╰─# echo $home_dir
/home
╭─root@kamiw ~
╰─# echo ${home_dir}
/home
```

在变量拼接时需要注意单引号和双引号的区别，单引号中`${name}`并不会被作为变量，如
```shell
╭─root@kamiw ~
╰─# echo "${home_dir}/baka"
/home/baka
╭─root@kamiw ~
╰─# echo '${home_dir}/baka'
${home_dir}/baka
```

某些情况需要获得命令的执行结果作为变量，可以使用 \` 或 `$()` 来获取命令的执行结果，如
```shell
╭─root@kamiw ~
╰─# echo `whoami`
root
╭─root@kamiw ~
╰─# echo $(whoami)
root
```

### 常用特殊变量

- $1、$2、$3 ...：传递给该脚本的第几个参数
- $#：传递给脚本或函数的参数个数
- $*：以单个字符串显示所有向脚本传递的参数。
- $@：以独立的字符串显示所有向脚本传递的参数。
- $_：上一个命令的最后一个参数。

另外常用特殊变量可见 [常用环境变量](/就算是萝莉控也能看懂的shell基础.md#常用环境变量)

## 基本运算
shell中并不像其他语言直接支持数字的运算，所以在shell中运算符种类较多（注意运算符和变量之间需要有空格）

### 字符串运算符

|运算符|说明|用法示例|
|:---:|:---:|:---:|
|`=`|	检测两个字符串是否相等，相等返回 true。|`[ $a = $b ]`
|`!=`|	检测两个字符串是否不相等，不相等返回 true。|	`[ $a != $b ]`
|`-z`|	检测字符串长度是否为0，为0返回 true。|	`[ -z $a ]`
|`$`|	检测字符串是否不为空，不为空返回 true。|	`[ $a ]`

### 布尔运算符

|运算符|说明|用法示例|
|:---:|:---:|:---:|
|`!`|	非运算，表达式为 true 则返回 false，否则返回 true。|`[ ! false ]`
|`-o`|	或运算，有一个表达式为 true 则返回 true。类似`or`|`[ $a -lt 20 -o $b -gt 100 ]`
|`-a`|	与运算，两个表达式都为 true 才返回 true。类似`and`|`[ $a -lt 20 -a $b -gt 100 ]`

[`&&`、`||`](/就算是萝莉控也能看懂的shell基础.md#逻辑符) 在原理上与 `-o`、`-a` 有所不同，但功能上也可以使用其替代 `-a`、`-o`

### 数字关系运算符

|运算符|说明|用法示例|
|:---:|:---:|:---:|
|`-eq`|	检测两个数是否相等，相等返回 true。类似`==`|`[ $a -eq $b ]`
|`-ne`|	检测两个数是否不相等，不相等返回 true。类似`!=`|`[ $a -ne $b ]`
|`-gt`|	检测左边的数是否大于右边的，如果是，则返回 true。类似`>`|`[ $a -gt $b ]`
|`-lt`|	检测左边的数是否小于右边的，如果是，则返回 true。类似`<`|`[ $a -lt $b ]`
|`-ge`|	检测左边的数是否大于等于右边的，如果是，则返回 true。类似`=>`|`[ $a -ge $b ]`
|`-le`|	检测左边的数是否小于等于右边的，如果是，则返回 true。类似`<=`|`[ $a -le $b ]`

### 算术运算符
shell中并不像其他语言一样直接支持数字的运算，通常需要借助 `expr` 命令配合 [获取命令执行结果](/就算是萝莉控也能看懂的shell脚本编写.md#使用变量) 来进行数字运算,如

```shell
#!/bin/bash
a=1
b=2
c=`expr $a + $b`
echo $c
```
将其保存为 `test.sh` 运行可以得到结果为

```bash
╭─root@kamiw ~
╰─# ./test.sh
3
```

`expr` 命令支持的常用运算符有以下

|运算符|说明|用法示例|
|:---:|:---:|:---:|
|`+`|	加法|	`expr $a + $b` 
|`-`|	减法|	`expr $a - $b` 
|`*`|	乘法|	`expr $a \* $b` 
|`/`|	除法|	`expr $b / $a` 
|`%`|	取余|	`expr $b % $a` 
|`==`|	相等|	`[ $a == $b ]` 
|`!=`|	不相等|`[ $a != $b ]` 

也可使用 `$[]` 来进行数字运算，支持的常用运算符同上（`*`不需要转义），如
```bash
╭─root@kamiw ~
╰─# echo $[23*34]
782
```

## 判断语句
注意格式，需要在 **关键字**、**符号**、**变量**、**常量** 间留出空格
### `if`
语法
```shell
if condition
then
    command1 
    command2
    ...
    commandN 
fi
```
示例
```shell
#!/bin/bash
ping 192.168.1.1 -c 1 > /dev/null 2>&1
if [ $? -eq 0 ];
then
    echo "true";
fi
```
### `if-else`
语法
```shell
if condition
then
    command1 
    command2
    ...
    commandN
else
    command
fi
```
示例
```shell
#!/bin/bash
ping 192.168.1.1 -c 1 > /dev/null 2>&1
if [ $? -eq 0 ];
then
    echo "true";
else
    echo "false";
fi
```
### `if-elif-else`
语法
```shell
if condition1
then
    command1
elif condition2 
then 
    command2
else
    commandN
fi
```
示例
```shell
#!/bin/bash
a=`ps -ef | grep sh -c`;
echo $a;
if [ $a -eq 0 ];
then
    echo "none";
elif [ $a -gt 0 -a $a -le 5 ];
then
    echo "normal";
else
    echo "more";
fi
```

## 循环语句
注意格式，需要在 **关键字**、**符号**、**变量**、**常量** 间留出空格
### `for`
shell中最常用的循环方法，接近于`python`的`for`循环

语法
```shell
for i in array
do
    command1
    command2
    ...
    commandN
done
```
通常配合`seq`命令使用，该命令类似于`python`中的`range`函数

- `seq` 用于生成数字序列的命令行工具
  ```shell
  seq [选项] 起始值 [步长] 结束值
  ```

示例
```shell
#!/bin/bash
for i in `seq 1 10`;
do
    echo $i;
done
```

### `while`
条件为真时循环

语法
```shell
while condition
do
    command
done
```
示例
```shell
#!/bin/bash
i=10;
while [ $i -gt 0 ];
do
        echo $i;
        i=$[$i-1];
done
```

### `until`
条件为假时循环

语法
```shell
until condition
do
    command
done
```
示例
```shell
#!/bin/bash
i=10;
until [ $i -lt 0 ];
do
        echo $i;
        i=$[$i-1];
done
```

## shell函数
语法
```shell
[ function ] funcname [()]

{

    action;

    [return int;]

}
```
示例
```shell
host_ip="xxx.xxx.xxx.xxx"
function on() {
    export http_proxy="http://$host_ip:7890"
    export https_proxy="http://$host_ip:7890"
    echo -e "终端代理已开启"
}
```


<script src="/js/menu.js"></script>