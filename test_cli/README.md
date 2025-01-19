### 自定义脚手架
**前置准备**<br>
* 初始化项目
> npm init -y 
a. 安装
> npm i commander inquirer ora download-git-repo 下载git里面的模版
> commander 支持命令行操作
> inquirer 命令行的交互
> ora 命令行下载的工具

1. 自定义的命令
**非node执行脚本操作**
> #!/user/bin/env node  告诉操作系统我执行自定义时，使用node执行当前文件
**修改配置文件支持自定义命令**
```json
"bin": {
  "test_cli_xsanjin": "src/index.js"
}
```
```sh
npm link // 使用npm link将本地npm包链接到项目中进行调试(当前目录中的npm包注册到全局npm模块目录)
npm link 包名 // 将全局npm模块中的本地npm包链接到项目中
npm unlink // 取消项目与npm包之间的链接
npm ls -g --depth=0 查看全局npm模块目录中已通过npm link链接的包 --depth=0用于只显示顶级包而不显示依赖关系
npm ls --depth=0 查看当前项目中通过npm link链接的包
```
* npm包注册到全局npm模块目录时出现用户权限问题
> permission denied;
> ermissions of the file and its containing directories, or try running. the command again as root/Administrator
**解决方式**<br>
a. 修改默认安装路径
```sh
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
vim ~/.bash_profile
export PATH=~/.npm-global/bin:$PATH
// 执行保存后的环境变量配置文件
source ~/.bash_profile
```
* 修改～/.bash_profile文件
> vim ~/.bash_profile 在终端进入文件
> 输入"E"编辑文件
> 插入 export PATH=~/.npm-global/bin:$PATH
> esc键退出编辑，键入":wq"保存编辑后的文件
b. sudo npm link
2. 用户基本操作
* commander库里面的program帮助解析命令行里面的参数
3. 下载模版

