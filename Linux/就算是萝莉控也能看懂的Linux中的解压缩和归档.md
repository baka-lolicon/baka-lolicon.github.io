# 就算是萝莉控也能看懂的Linux中的解压缩和归档
在Linux中解压缩与归档通常被视作两个不同的部分。  
对于将多个文件压缩成一个压缩包，部分压缩格式需要解压缩工具与归档工具同时使用，部分压缩格式仅需要一个工具即可完成
## 解压缩
- **压缩** 是将一个或多个文件的内容编码以*减少其体积的过程*
- **解压** 是将压缩文件恢复为原始文件或数据的过程
### 单文件压缩
该部分的压缩格式若单独使用解压缩工具，仅能够对单文件进行压缩，通常会配合[`tar`](/就算是萝莉控也能看懂的Linux中的解压缩和归档.md#tar)进行多文件压缩
#### `.gz`
`gzip`

使用方法：
```shell
gzip [选项] $filename
```
常用选项

|选项|作用|示例|
|:---:|:---:|:---:|
|`-d` 或 `--decompress`|解压文件(与`gunzip2`作用相同)|`gzip2 -d file.gz`|
|`-k` 或 `--keep`|压缩后保留原始文件|`gzip -k file`|
|`-r` 或 `--recursive`|递归压缩目录中的所有文件|`gzip -r dir/`|
|`-1` 至 `-9`|设置压缩级别，`-1` 为最快速但压缩比最低，`-9` 为最慢速但压缩比最高。|`gzip -9 file`|

- 压缩
  ```shell
  gzip file #创建一个压缩文件 file.gz 并删除原始文件 file
  ```
- 解压
  ```shell
  gzip -d file.gz #解压缩 file.gz 文件恢复为原始的 file 并删除压缩文件 file.gz
  ```
  或使用`gunzip`
  ```shell
  gunzip file.gz
  ```

#### `.bz2`
`bzip2`

使用方法：
```shell
bzip2 [选项] $filename
```
常用选项

|选项|作用|示例|
|:---:|:---:|:---:|
|`-z`|压缩文件(默认选项)|`bzip2 file`|
|`-d` 或 `--decompress`|解压文件(与`bunzip2`作用相同)|`bzip2 -d file.bz2`|
|`-k` 或 `--keep`|压缩后保留原始文件|`bzip2 -k file`|
|`-v` 或 `--verbose`|显示详细的压缩或解压缩信息|`bzip2 -v file`|
|`-f` 或 `--force`|强制覆盖已有文件而不提示|`bzip2 -f file`|

- 压缩
  ```shell
  bzip2 file #创建一个压缩文件 file.bz2 并删除原始文件 file
  ```
- 解压
  ```shell
  bzip2 -d file.bz2 #解压缩 file.bz2 文件恢复为原始的 file 并删除压缩文件 file.bz2
  ```
  或使用`bunzip2`
  ```shell
  bunzip2 file.bz2
  ```


#### `.xz`
`xz`

使用方法：
```shell
xz [选项] $filename
```
常用选项

|选项|作用|示例|
|:---:|:---:|:---:|
|`-d` 或 `--decompress`|解压文件(与`unxz`作用相同)|`xz -d file.xz`|
|`-k` 或 `--keep`|压缩后保留原始文件|`xz -k file`|
|`-T` 或 `--threads`|指定用于压缩或解压缩的线程数。默认为单线程|`xz -T4 filename` 使用4个线程进行压缩|
|`-v` 或 `--verbose`|显示详细的压缩或解压缩信息|`xz -v file`|
|`-f` 或 `--force`|强制覆盖已有文件而不提示|`xz -f file`|

- 压缩
  ```shell
  xz file #创建一个压缩文件 file.xz 并删除原始文件 file
  ```

- 解压
  ```shell
  xz -d file.xz #解压缩 file.xz 文件恢复为原始的 file 并删除压缩文件 file.xz
  ```
  或使用`unxz`
  ```shell
  unxz file.xz
  ```

#### `.zst`
`zstd`

使用方法：
```shell
zstd [选项] $filename
```
常用选项

|选项|作用|示例|
|:---:|:---:|:---:|
|`-d` 或 `--decompress`|解压文件(与`unzstd`作用相同)|`zstd -d file.xz`|
|`-q` 或 `--quiet`|静默模式，减少输出信息|`zstd -k file`|
|`-T` 或 `--threads`|指定用于压缩或解压缩的线程数。默认为单线程|`zstd -T4 filename` 使用4个线程进行压缩|
|`-v` 或 `--verbose`|显示详细的压缩或解压缩信息|`zstd -v file`|
|`-f` 或 `--force`|强制覆盖已有文件而不提示|`zstd -f file`|


- 压缩
  ```shell
  zstd file #新创建一个压缩文件 file.zst ，同时保留 file 
  ```

- 解压
  ```shell
  zstd -d file.zst #解压缩 file.zst 文件恢复为原始的 file 同时保留压缩文件 file.zst
  ```
  或使用`unxz`
  ```shell
  unzstd file.zst
  ```

### 多文件压缩
该部分的压缩格式仅需使用这部分工具，即可完成对多文件的压缩
#### `.zip`
- 压缩
  
  `zip`

  使用方法
  ```shell
  zip [选项] 压缩文件名 源文件或目录 #创建一个 压缩文件名.zip 对源文件及目录无操作，可添加复数个源文件
  ```
  常用选项

  |选项|	功能|	示例|
  |:---:|:---:|:---:|
  |`-r`	|递归地包含目录中的文件|	`zip -r archive.zip dir/`
	|`-u`	|更新压缩文件中已有的文件|	`zip -u archive.zip newfile.txt`
	|`-d`	|从压缩文件中删除指定文件|	`zip -d archive.zip file.txt`
	|`-m`	|将文件移入压缩文件后删除原始文件	|`zip -m archive.zip file.txt`
	|`-v`|	显示详细的压缩信息	|`zip -v archive.zip file.txt`
	|`-q`	|静默模式，减少输出信息|`	zip -q archive.zip file.txt`
	|`-j`|	仅存储文件，不包含目录结构|	`zip -j archive.zip dir/file.txt`
  |`-P`|为压缩包设置密码，选项后跟密码|`zip -P password archive.zip file.txt`



- 解压
  
  `unzip`

  使用方法
  ```shell
  unzip 压缩文件名 #将 压缩文件名.zip 的压缩文件解压到当前目录，同时保留 压缩文件名.zip 
  ```
  常用选项

  |选项|	功能|	示例|
  |:---:|:---:|:---:|
  |`-l`	|列出压缩文件中的内容列表,不解压|	`unzip -l archive.zip`
	|`-d`	|将文件解压到指定目录|	`unzip archive.zip -d des_dir/`
	|`-u`	|仅更新不存在或较旧的文件|`	unzip -u archive.zip`
	|`-v`	|显示详细的解压信息|	`unzip -v archive.zip`
	|`-q`	|静默模式，减少输出信息|`	unzip -q archive.zip`
	|`-P`|	提供密码以解密压缩文件|`	unzip -P password archive.zip`

#### `.rar`
- 压缩
  
  `rar`

  使用方法
  ```shell
  rar [命令标识符] [选项] 压缩文件名 源文件或目录 #无指定内容则添加当前目录所有内容
  ```

  常见命令标识符

  |标识符|	作用|	示例|
  |:---:|:---:|:---:|
  |`a`|	添加文件到压缩文件中,不存在则创建压缩文件|`	rar a archive.rar file.txt`
  |`d`|	从压缩文件中删除文件|	`rar d archive.rar file.txt`
  |`t`|	测试压缩文件的完整性|	`rar t archive.rar`
  |`u`|	更新已存在的压缩文件|	`rar u archive.rar newfile.txt`

  常用选项（以下选项与命令标识符`a`配合）


  |选项|	作用|	示例|
  |:---:|:---:|:---:|
  |`-p`	|设置压缩文件的密码	|`rar a -pYourPassword archive.rar file.txt`
  |`-m5	`|使用最大压缩率（较慢）|	`rar a -m5 archive.rar file.txt`
  |`-hp`	|设置加密头部密码|`	rar a -hpYourHeaderPassword archive.rar file.txt`

  - 解压
  
  `unrar`

  使用方法
  ```shell
  unrar [命令标识符] [选项] 压缩文件名 [解压目标目录]
  ```
  常用命令标识符

  |标识符	|作用|	示例|
  |:---:|:---:|:---:|
  |`x`|	解压缩文件(保留压缩文件中的目录结构)|	`unrar x archive.rar`
  |`e`|	解压缩文件到当前目录(不保留压缩文件中的目录结构)|	`unrar e archive.rar`
  |`l`|	列出压缩文件内容|	`unrar l archive.rar`
  |`t`|	测试压缩文件的完整性|	`unrar t archive.rar`

  常用选项

  |选项	|作用	|示例|
  |:---:|:---:|:---:|
  |`-p`|	提供压缩文件的密码	|`unrar x -pYourPassword archive.rar`|
  |`-o+`	|覆盖已有文件	|`unrar x -o+ archive.rar`|

#### `.7z`
`7z`
- 压缩
  
  使用方法
  ```shell
  7z a [选项] 压缩文件名 源文件或目录 #a表示压缩
  ```
  常用选项


  |选项|	作用|	示例|
  |:---:|:---:|:---:|
  |`-p`|	设置压缩文件的密码|`	7z a -pYourPassword archive.7z file.txt`
  |`-mx`|	设置压缩级别（1-9，9最高）	|`7z a -mx=9 archive.7z dir/`
  |`-r`|	递归地处理子目录及其文件	|`7z a -r archive.7z dir/`
  |`-t`	|指定归档类型,`7z、xz、zip、gzip、bzip2、tar`可选|`7z a -tzip archive.zip file.txt`

- 解压
  ```shell
  7z x [选项] 压缩文件名 #x表示解压
  ```
  常用选项


  |选项|	作用|	示例|
  |:---:|:---:|:---:|
  |`-p	`|指定压缩文件的密码	|`7z x -pYourPassword archive.7z`
  |`-o`|	指定解压缩的目标目录|`	7z x archive.7z -o/path/to/test`
  |`-r	`|递归地处理子目录及其文件|	`7z x -r archive.7z`
  |`-aos`|	覆盖所有现有文件	|`7z x archive.7z -aos`
  |`-y`|	自动同意所有提示|`	7z x archive.7z -y`

## 归档
**归档**：将多个文件或目录*合并为一个单一文件*
### `tar`

Linux中最常用的归档工具

使用方法
```shell
tar [选项] [源文件]
```
常用选项

|选项|	作用|	示例|
|:---:|:---:|:---:|
|`-c`	|创建归档文件|	`tar -cvf archive.tar file1 file2 dir/`
|`-x`	|解压缩归档文件|	`tar -xvf archive.tar`
|`-f` |指定归档文件名，可在名前加**路径**|	`tar -cvf archive.tar file1 file2`
|`-v`	|显示详细信息|	`tar -xvf archive.tar`
|`-t`	|显示归档文件中的内容|	`tar -tvf archive.tar`
|`-C`|切换到指定目录后再执行操作（解压到指定文件夹 或 将指定文件夹内容归档）|`tar -xvf archive.tar -C /path/to/dir`|
|`-z`	|使用gzip进行压缩或解压缩	|`tar -czvf archive.tar.gz dir/`
|`-j` |	使用bzip2进行压缩或解压缩|	`tar -cjvf archive.tar.bz2 dir/`



#### `.tar.gz`
- 压缩
  ```shell
  tar -czvf archive.tar.gz dir/ 
  ```
- 解压
  ```shell
  tar -xzvf archive.tar.gz
  ```
#### `.tar.bz2`
- 压缩
  ```shell
  tar -cjvf archive.tar.gz dir/ 
  ```
- 解压
  ```shell
  tar -xjvf archive.tar.gz
  ```
#### `.tar.xz`
`tar`本身不直接支持`xz`压缩格式的选项，需要先使用`tar`进行归档后使用`xz`进行压缩
- 压缩
  ```shell
  tar -cf - dir/ | xz > archive.tar.xz
  ```
- 解压
  ```shell
  zstd -d -c archive.tar.zst | tar -xf -
  ```

#### `.tar.zst`
`tar`本身不直接支持`zst`压缩格式的选项，需要先使用`tar`进行归档后使用`zst`进行压缩
- 压缩
  ```shell
  tar -cf - dir/ | zstd > archive.tar.zst
  ```
- 解压
  ```shell
  zstd -d -c archive.tar.zst | tar -xf -
  ```


  <script src="/js/menu.js"></script>