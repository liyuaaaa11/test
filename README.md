# 项目介绍

项目名称: test项目
<br>
项目描述：~~

## 项目目录
--flowchart 主要业务流程图<br>
--prisma  编写数据库内容<br/>
----schema.prisma 创建数据库表<br>
--src<br>
----db 数据库<br>
------index.ts 自定义数据库工厂<br>
----jwt 身份校验并生成token<br>
------index.ts <br>
----user user模块<br>
------controller.ts 路由控制器处理<br>
------service.ts 业务层编写<br>
------user.dto.ts 接口参数校验<br>
----app.ts 主文件入口<br>
--tsconfig.json<br>
## 前期准备
* npm i @types/node -D
* prisma init --datasource-provider mysql
> npm i prisma -g 安装prisma <br>
> .env配置mysql路径<br>
> prisma/schema.prisma中编写数据库表结构
* npm install typescript -g
> tsc --init生成ts配置文件<br>
> npm install ts-node -g 启动ts文件使用<br>
> npm install --save-dev @types/express
* npm i inversify reflect-metadata
> 实现IoC控制反转和DI依赖注入
> npm i inversify-express-utils
* 封装数据库操作 引入prisma/client
> src/db文件中编码
* class-validator、class-transformer 校验接口字段格式
> 用于dto层对接口参数的格式化处理及校验
* JWT身份校验生成jwt
> npm passport 身份验证与授权的nodejs库<br>
> passport-jwt passport的插件，支持使用json web token进行身份验证与授权<br>
> jsonwebtoken 生成token的库<br>
## 启动项目
创建数据库表 prisma migrate dev <br>
启动服务器 nodemon run ./src/app.ts
* node无法直接运行ts文件，需要借助typescript将其转换为js文件或直接使用ts-node
## 技术栈


## 项目注意事项
1. version 版本号 1.0.0 变更规则
主版本号： 重大的更新/变动
次版本号号： 功能的更新
修订号： fix  bug的修改

