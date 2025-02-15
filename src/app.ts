// 装饰器的基础
import 'reflect-metadata';
// Description: The entry point of the application.
import { InversifyExpressServer } from 'inversify-express-utils';
// 
import { Container } from 'inversify';

import { UserController } from './user/controller';
import { UserService } from './user/service';

const container = new Container();
// 注入user模块
container.bind(UserController).to(UserController);
container.bind(UserService).to(UserService);

const server = new InversifyExpressServer(container);
const app = server.build();


// import express from 'express';
// import UserRouter from './user/user.dto';
// const app = express();
// app.use('user', UserRouter);
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});