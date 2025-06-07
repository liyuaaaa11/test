// 装饰器的基础
import 'reflect-metadata';
// Description: The entry point of the application.
import { InversifyExpressServer } from 'inversify-express-utils';
// 
import { Container } from 'inversify';
// 引入express
import express from 'express';
// 配置跨域 引入cors
const cors = require('cors')
// 引入prisma/client  封装数据操作
import { PrismaClient } from '@prisma/client';
// 引入封装好的数据库模块
import { PrismaDB } from './db/index.js';
import { JWT } from './jwt/index.js';

// 引入user模块
import { UserController } from './user/controller.js';
import { UserService } from './user/service.js';

// 引入teachShare模块
import { TeachShareController } from './teachShare/controller.js';
import { TeachShareService } from './teachShare/service.js';
import exp from 'constants';

const container = new Container();
// 注入user模块
container.bind(UserController).to(UserController);
container.bind(UserService).to(UserService);
// 注入teachShare模块
container.bind(TeachShareController).to(TeachShareController)
container.bind(TeachShareService).to(TeachShareService)
/*
* 注入自定义工厂
* 封装数据库模块并注入
*/
container.bind<PrismaClient>('PrismaClient').toFactory(() => {
  return () => {
    return new PrismaClient();
  }
});
container.bind(PrismaDB).to(PrismaDB);
container.bind(JWT).to(JWT)

// 配置全局cors
const corsOptions = {
  origin: 'http://localhost:3000', // 允许的来源
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的HTTP方法
  allowedHeaders: ['Content-Type', 'Authorization'], // 允许的请求头
  exposedHeaders: ['Content-Length', 'X-Requested-With', 'Authorization'], // 允许暴露的响应头
  credentials: true, // 允许携带凭证
  maxAge: 86400 // 预检请求的缓存时间，单位为秒
};

const server = new InversifyExpressServer(container);
// 编写中间键
server.setConfig((app) => {
  // 支持接收json数据格式
  app.use(express.json());
  // 使用cors中间件
  app.use(cors(corsOptions));
  // 读取jwt内部init方法并与express关联
  app.use(container.get(JWT).init());
});
const app = server.build();


// import express from 'express';
// import UserRouter from './user/user.dto';
// const app = express();
// app.use('user', UserRouter);
app.listen(706, () => {
  console.log('Server is running on http://localhost:706');
});
