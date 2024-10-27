# 项目介绍

项目名称：nodejs学习记录
<br>
飞书链接：https://jwaapmat3m5.feishu.cn/wiki/Fmv0wDm7SifqhGk1KQJc479onHE?fromScene=spaceOverview
<br>
项目描述：主要描述作者在学习nodejs过程中的记录与思考...

## 项目目录
--global  全局变量的相关内容
<br/>
--modular  两种类型模块化的区别
<br/>
--.npmrc  自定义npm配置项
<br/>
--operate  nodejs环境下操作dom
<br/>
--prev.js  --index.js  --post.js package.json脚本执行文件

## 技术栈
vite + vue3 + nodejs + jsdom


## 项目注意事项
1. version 版本号 1.0.0 变更规则
主版本号： 重大的更新/变动
次版本号号： 功能的更新
修订号： fix  bug的修改

2. devDependencies  开发的依赖
···sh
npm i 包名  --save-dev
npm i 包名 -D
···
比如：webpack、vite、rollup只在开发时应用，不需要在生产环境中安装

3. dependencies  生产环境需要的依赖
vue vuex vue-rpouter md5

4. peerDependencies  编写插件/npm包的开发人员使用对等依赖
比如：vite plugin 自定义的npm包，需要将所依赖的vite的包也安装

5. .gitignore在git上传文件时忽略文件中描述的内容

6. files 中自定义可以发布的文件

7. 模块化内容讲解  --modular文件夹中
type 默认指定commonJS
type 指定为module  // es6 moudule模块化