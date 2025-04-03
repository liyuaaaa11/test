// 装饰器的基础
import 'reflect-metadata';
// Description: The entry point of the application.
import { InversifyExpressServer } from 'inversify-express-utils';
// 
import { Container } from 'inversify';
// 引入express
import express from 'express';
// 引入prisma/client  封装数据操作
import { PrismaClient } from '@prisma/client';
// 引入封装好的数据库模块
import { PrismaDB } from './db';
import { JWT } from './jwt';

// 引入user模块
import { UserController } from './user/controller';
import { UserService } from './user/service';

// 引入teachShare模块
import { TeachShareController } from './teachShare/controller';
import { TeachShareService } from './teachShare/service';

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

const server = new InversifyExpressServer(container);
// 编写中间键
server.setConfig((app) => {
  // 支持接收json数据格式
  app.use(express.json());
  // 读取jwt内部init方法并与express关联
  app.use(container.get(JWT).init())
});
const app = server.build();


// import express from 'express';
// import UserRouter from './user/user.dto';
// const app = express();
// app.use('user', UserRouter);
app.listen(706, () => {
  console.log('Server is running on http://localhost:706');
});