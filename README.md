# 项目介绍

项目名称：test项目
<br>
项目描述：主要基于作者现有的知识，研发一款前后端分离的基础项目

## 项目目录
--flowchart 主要业务流程图<br>
--prisma  编写数据库内容<br/>
----schema.prisma 创建数据库表<br>
--src<br>
----app.ts 主文件入口<br>
--tsconfig.json<br>
## 前期准备
* prisma init --datasource-provider mysql
> npm i prisma -g 安装prisma <br>
> .env配置mysql路径<br>
> prisma/schema.prisma中编写数据库表结构
* npm install typescript -g
> tsc --init生成ts配置文件<br>
> npm install ts-node -g 启动ts文件使用<br>
> npm install --save-dev @types/express
## 技术栈



## 项目注意事项
1. version 版本号 1.0.0 变更规则
主版本号： 重大的更新/变动
次版本号号： 功能的更新
修订号： fix  bug的修改
